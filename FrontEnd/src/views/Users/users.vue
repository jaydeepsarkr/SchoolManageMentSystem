<template>
  <div id="app">
    <div class="app-container">
      <button class="new-user-btn">
        <router-link to="/create">Add User</router-link>
      </button>

      <div v-if="loading" class="loading-spinner"></div>
      <div v-else class="user-card-container">
        <div class="user-card" v-for="user in paginatedUsers" :key="user.id">
          <div class="user-card-content">
            <p><strong>ID:</strong> {{ user._id }}</p>
            <hr />
            <p><strong>Name:</strong> {{ user.name }}</p>
            <hr />
            <p><strong>Email:</strong> {{ user.email }}</p>
            <hr />
            <p><strong>Gender:</strong> {{ user.gender }}</p>
            <hr />
            <p><strong>Address:</strong> {{ user.address }}</p>
            <hr />
            <p><strong>Mobile:</strong> {{ user.mobile }}</p>
            <div class="action-buttons">
              <button class="edit">
                <RouterLink :to="{ name: 'Update', params: { id: user._id } }">
                  ✏️ Edit
                </RouterLink>
              </button>

              <button
                class="delete"
                @click="deleteUser(user._id)"
                aria-label="Delete user"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManagement",
  components: {},
  data() {
    return {
      users: [],
      loading: true,
      currentPage: 1,
      usersPerPage: 20,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.usersPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.usersPerPage;
      const end = start + this.usersPerPage;
      return this.users.slice(start, end);
    },
  },
  methods: {
    deleteUser(id) {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (confirm("Are you sure you want to delete this user?")) {
        axios
          .delete(`http://localhost:8080/users/${id}`, {
            headers: {
              Authorization: ` ${token}`, // Set token in headers
            },
          })
          .then((response) => {
            this.users = this.users.filter((user) => user._id !== id);
            alert(`User with ID ${id} deleted successfully`);
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("An error occurred while trying to delete the user.");
          });
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: ` ${token}`, // Set token in headers
        },
      })
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
/* General Styles */
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
  width: 100%;
}

/* Button Styles */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.new-user-btn {
  display: inline-block;
  margin-bottom: 20px;
}

.new-user-btn a {
  color: white;
  text-decoration: none;
}

.new-user-btn:hover a {
  color: #fff;
}

/* User Card Styles */
.user-card-container {
  display: grid;
  gap: 20px;
}

/* For larger screens (PC) */
@media (min-width: 768px) {
  .user-card-container {
    grid-template-columns: repeat(2, 1fr); /* Two cards per row */
  }
}

@media (min-width: 1024px) {
  .user-card-container {
    grid-template-columns: repeat(3, 1fr); /* Three cards per row */
  }
}

/* For small screens (Mobile) */
@media (max-width: 767px) {
  .user-card-container {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}

.user-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
}

.user-card-content p {
  margin: 10px 0;
}

.user-card-content hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: space-between;
}

.action-buttons button.edit {
  background-color: #28a745;
}

.action-buttons button.delete {
  background-color: #dc3545;
}

.action-buttons button.edit:hover {
  background-color: #218838;
}

.action-buttons button.delete:hover {
  background-color: #c82333;
}

/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  font-size: 16px;
}

.pagination span {
  font-size: 18px;
  color: #666;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

/* Loading Spinner */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
