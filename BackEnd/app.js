let express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { User, validateUser } = require("../BackEnd/mongoDB/users");
const {
  LoginSignup,
  validateLoginSignup,
} = require("../BackEnd/mongoDB/users");

require("../BackEnd/mongoDB/connect");

let app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const jwtSecretKey = "Acer Aspire 7";

const auth = (req, res, next) => {
  const token = req.cookies["x-auth-token"]; // Get token from cookies
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
    console.log(salt);

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

    // Save the token in a cookie
    res
      .cookie("x-auth-token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      })
      .send({ message: "Signup successful", result });
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

    // Save the token in a cookie
    res
      .cookie("x-auth-token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      }) // Secure token cookie
      .send({ message: "Login successful", token });
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
    console.log(data);
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

// Start the server
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running on port 3000");
  }
});
