let express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../BackEnd/mongoDB/users");
const {
  LoginSignup,
  validateLoginSignup,
} = require("../BackEnd/mongoDB/users");

require("../BackEnd/mongoDB/connect");

let app = express();

app.use(express.json());
app.use(cors());

const jwtSecretKey = "Acer Aspire 7";

// Authorization middleware using headers
const auth = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from headers
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

app.post("/signup", async (req, res) => {
  // Validate user data with Joi for signup
  const { error } = validateLoginSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if the user already exists
    let userExists = await LoginSignup.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("User already registered");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save the user with hashed password
    let newUser = new LoginSignup({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });
    let result = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: result._id, email: result.email },
      jwtSecretKey,
      { expiresIn: "1h" }
    );

    // Send the token in the response body
    res.send({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).send("Error signing up the user");
    console.log(err);
  }
});

// POST API for user login
app.post("/login", async (req, res) => {
  // Validate user data with Joi for login
  const { error } = validateLoginSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Find the user by email
    let user = await LoginSignup.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Compare the password with the hashed password in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecretKey, {
      expiresIn: "1h",
    });

    // Send the token in the response body
    res.send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Error logging in the user");
    console.log(err);
  }
});

// Other routes (POST /create, GET /users, etc.) as implemented previously
app.post("/create", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let data = new User(req.body);
    let result = await data.save();
    res.send(result);
  } catch (err) {
    res.status(500).send("Error saving user to the database");
    console.log(err);
  }
});

// GET API to fetch all users (protected)
app.get("/users", auth, async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Error fetching users from the database");
    console.log(err);
  }
});

// DELETE API to remove a user (protected)
// DELETE API to remove a user (protected)
app.delete("/users/:id", auth, async (req, res) => {
  try {
    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(req.params.id); // Use findByIdAndDelete

    if (!user)
      return res.status(404).send("User with the given ID was not found.");

    res.send({ message: "User deleted successfully", user });
  } catch (err) {
    res.status(500).send("Error deleting user from the database");
    console.log(err);
  }
});

// PUT API to update a user (protected)
app.put("/edit/:id", auth, async (req, res) => {
  const { error } = validateUser(req.body); // Validate user data
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Find the user by ID and update it
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run validators on the update
    });

    if (!user)
      return res.status(404).send("User with the given ID was not found.");

    res.send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send("Error updating user in the database");
    console.log(err);
  }
});

// Start the server
app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 8080");
  }
});
