<template>
  <div>
    <h2>School Management Form</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="id">ID:</label>
        <input type="text" id="id" v-model="formData._id" disabled />
      </div>

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

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Update",
  data() {
    return {
      formData: {
        _id: "",
        name: "",
        email: "",
        gender: "",
        address: "",
        mobile: "",
      },
    };
  },

  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      const userId = this.$route.params.id;

      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((response) => {
          this.formData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("An error occurred while fetching user data.");
        });
    },
    submitForm() {
      console.log("Submitting form with data: ", this.formData);
      const userId = this.$route.params.id;

      const { name, email, address, mobile, gender } = this.formData;
      const dataToSubmit = { name, email, address, mobile, gender };

      axios
        .put(`http://localhost:3000/update/${userId}`, dataToSubmit)
        .then(() => {
          alert("User data updated successfully.");
          this.$router.push("/users");
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              "Server responded with an error:",
              error.response.data
            );
            alert(`Error: ${error.response.data.message}`);
          } else if (error.request) {
            console.error(
              "No response received from the server:",
              error.request
            );
            alert("Server did not respond. Please try again.");
          } else {
            console.error(
              "Error occurred during request setup:",
              error.message
            );
            alert("An error occurred while updating user data.");
          }
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
  margin-bottom: 10px;
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
