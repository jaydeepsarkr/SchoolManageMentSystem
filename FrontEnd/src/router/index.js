import { createRouter, createWebHistory } from "vue-router";

import Update from "../views/Update/update.vue";
import AddUser from "../views/ADDuser/create.vue";
import Signup from "../views/SignUP/signup.vue";
import Login from "../views/Login/login.vue";
import users from "../views/Users/users.vue";
import Home from "../views/Home.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/", redirect: "/login" },
  { path: "/update/:id", name: "Update", component: Update },
  { path: "/create", name: "AddUser", component: AddUser },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/home", name: "Home", component: Home },
  {
    path: "/users",
    name: "users",
    component: users,
  },

  // other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
