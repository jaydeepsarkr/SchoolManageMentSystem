<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Welcome Back</h2>
      <p class="subtitle">Please login to your account</p>
      <form @submit.prevent="login">
        <!-- Username Field -->
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            id="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <!-- Password Field -->
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Buttons Section -->
        <div class="button-group">
          <button type="submit" class="login-button">Login</button>
          <button type="button" class="signup-button" @click="signUp">
            Sign Up
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <!-- Forgot Password Link -->
      <p class="forgot-password">Forgot your password?</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: this.username,
          password: this.password,
        });

        if (response.data.token) {
          alert("Login successful!");
          // Save the token in localStorage or cookies
          localStorage.setItem("authToken", response.data.token);

          this.$router.push("/user-management");
        }
      } catch (error) {
        this.errorMessage =
          error.response && error.response.data
            ? error.response.data
            : "Login failed. Please try again.";
      }
    },
    signUp() {
      alert("Redirecting to sign-up page");
      // Add redirection logic here if needed, e.g., using Vue Router.
    },
  },
};
</script>

<style scoped>
/* Background Styling */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  font-family: "Arial", sans-serif;
}

/* Login Box Styling */
.login-box {
  background-color: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s ease;
}

.login-box:hover {
  transform: translateY(-10px);
}

/* Heading and Subtitle */
h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.subtitle {
  color: #777;
  font-size: 14px;
  margin-bottom: 30px;
}

/* Input Fields */
.input-group {
  margin-bottom: 20px;
  text-align: left;
  width: 370px;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #6e45e2;
  outline: none;
  box-shadow: 0 0 5px rgba(110, 69, 226, 0.5);
}

/* Buttons Section */
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

button {
  width: 48%;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s;
}

/* Login Button */
.login-button {
  background-color: #6e45e2;
  color: white;
}

.login-button:hover {
  background-color: #5a3db7;
}

/* Sign Up Button */
.signup-button {
  background-color: #f0f0f0;
  color: #555;
  border: 1px solid #ccc;
}

.signup-button:hover {
  background-color: #e0e0e0;
}

/* Error Message */
.error {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}

/* Forgot Password */
.forgot-password {
  color: #555;
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #6e45e2;
}
</style>
