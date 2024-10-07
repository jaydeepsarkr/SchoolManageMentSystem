import { createRouter, createWebHistory } from "vue-router";
import Update from "../views/Update.vue";
import AddUser from "../views/AddUser.vue";
import Signup from "../views/signup.vue";
import Login from "../views/Login.vue";
import UserManagement from "../components/UserManagement.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/", redirect: "/login" },
  { path: "/update/:id", name: "Update", component: Update },
  { path: "/create", name: "AddUser", component: AddUser },
  { path: "/signup", name: "signup", component: Signup },
  {
    path: "/user-management",
    name: "UserManagement",
    component: UserManagement,
  },

  // other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
