<template>
  <div>
    <h2>Create New User</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>

      <div>
        <label for="gender">Gender:</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="formData.address" required />
      </div>

      <div>
        <label for="mobile">Mobile:</label>
        <input type="tel" id="mobile" v-model="formData.mobile" required />
      </div>

      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUser",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        gender: "",
        address: "",
        mobile: "",
      },
    };
  },
  methods: {
    submitForm() {
      const dataToSubmit = { ...this.formData };

      axios
        .post(`http://localhost:3000/create`, dataToSubmit)
        .then(() => {
          alert("User added successfully.");
          this.$router.push("/");
        })
        .catch((error) => {
          alert("Error adding user: " + error.message);
        });
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: auto;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
