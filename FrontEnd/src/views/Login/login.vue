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
      loading: false,
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = "Username and password are required.";
        return;
      }

      this.loading = true;
      try {
        const response = await axios.post("http://localhost:8080/login", {
          email: this.username,
          password: this.password,
        });

        if (response.data.token) {
          alert("Login successful!");
          localStorage.setItem("authToken", response.data.token);
          this.$router.push("/home");
        }
      } catch (error) {
        console.log(error);
        this.errorMessage =
          error.response && error.response.data
            ? error.response.data
            : "Login failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    signUp() {
      alert("Redirecting to sign-up page");
    },
  },
};
</script>
<style scoped lang="scss">
/* SASS Variables */
$primary-color: #4a90e2;
$hover-primary-color: darken($primary-color, 10%);
$background-color: #f5f5f5; // Simple light gray background
$subtitle-color: #777;
$error-color: #ff4d4f; // A more vibrant error color
$input-focus-border-color: lighten($primary-color, 10%);
$button-hover-glow: rgba(74, 144, 226, 0.7);

/* Responsive Container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #6e8efb,
    #a777e3
  ); /* Gradient background */
  padding: 20px;
  width: 100%;
}

/* Login Box Styling */
.login-box {
  background: white;
  padding: 40px 30px;
  border-radius: 16px; /* Slightly more rounded corners */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); /* Larger shadow for depth */
  text-align: center;
  max-width: 480px;
  width: 100%;
  animation: fadeIn 0.5s ease;
  border-top: 5px solid $primary-color; /* Top border accent */

  h2 {
    font-size: 30px; /* Slightly larger title */
    color: $primary-color;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .subtitle {
    color: $subtitle-color;
    font-size: 15px;
    margin-bottom: 30px;
  }

  .input-group {
    margin-bottom: 20px;
    text-align: left;

    label {
      font-size: 14px;
      color: #555;
    }

    input {
      width: 100%;
      padding: 14px 18px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-top: 8px;
      font-size: 16px;
      background: #f7f7f7;
      transition: all 0.3s ease-in-out;
      &:focus {
        border-color: $input-focus-border-color;
        box-shadow: 0 0 12px rgba(74, 144, 226, 0.5);
        background: white;
      }
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
      width: 48%;
      padding: 14px;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none; /* Remove default borders */
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Add shadow to buttons */

      &.login-button {
        background-color: $primary-color;
        color: white;
        &:hover {
          background-color: $hover-primary-color;
          box-shadow: 0 5px 20px $button-hover-glow;
        }
      }

      &.signup-button {
        background-color: #e0e0e0;
        color: #555;
        &:hover {
          background-color: darken(#e0e0e0, 5%);
          box-shadow: 0 5px 20px rgba(224, 224, 224, 0.7);
        }
      }
    }
  }

  .forgot-password {
    margin-top: 20px;
    color: $primary-color;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: $hover-primary-color;
    }
  }

  .error {
    color: $error-color;
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
  }
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .login-box {
    padding: 30px 20px;
    max-width: 90%;
  }

  .input-group input {
    font-size: 14px;
  }

  .button-group button {
    padding: 12px;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .login-box {
    padding: 20px;
    max-width: 100%;
  }

  .input-group input {
    font-size: 13px;
  }

  .button-group button {
    padding: 10px;
    font-size: 12px;
  }

  h2 {
    font-size: 20px;
  }
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
