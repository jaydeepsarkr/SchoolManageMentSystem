<template>
  <div class="signup-wrapper">
    <div class="signup-container">
      <h2 class="signup-heading">Join Us Today</h2>
      <p class="signup-subheading">
        Create your account and explore amazing features!
      </p>
      <form @submit.prevent="submitForm" class="signup-form">
        <div class="form-group">
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder=" "
            required
          />
          <label for="name">Full Name</label>
        </div>
        <div class="form-group">
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder=" "
            required
          />
          <label for="email">Email Address</label>
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder=" "
            required
          />
          <label for="password">Password</label>
        </div>
        <button type="submit" class="signup-btn">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3000/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        alert("Sign up successful!");
        console.log("Response from server:", response.data);
        // Handle further logic after successful signup, e.g., redirecting the user
      } catch (error) {
        this.errorMessage =
          "There was an issue with the signup. Please try again.";
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Background Styling */
.signup-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  font-family: "Poppins", sans-serif;
}

.signup-container {
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeInUp 1s ease;
}

.signup-heading {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.signup-subheading {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.signup-form .form-group {
  position: relative;
  margin-bottom: 25px;
  text-align: left;
}

.signup-form input {
  width: 100%;
  padding: 15px 10px 10px;
  font-size: 16px;
  background: #f9f9f9;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.signup-form input:focus {
  background: #fff;
  box-shadow: 0 0 8px rgba(110, 69, 226, 0.2);
  outline: none;
}

.signup-form label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: 0.3s;
}

.signup-form input:focus + label,
.signup-form input:not(:placeholder-shown) + label {
  top: 10%;
  font-size: 12px;
  color: #6e45e2;
}

.signup-btn {
  width: 100%;
  padding: 15px;
  background-color: #6e45e2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.signup-btn:hover {
  background-color: #88d3ce;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
