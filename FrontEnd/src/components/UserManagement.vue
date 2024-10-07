<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img :src="logoURL" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/about" class="button">
        <span class="material-icons">description</span>
        <span class="text">About</span>
      </router-link>
      <router-link to="/team" class="button">
        <span class="material-icons">group</span>
        <span class="text">Team</span>
      </router-link>
      <router-link to="/contact" class="button">
        <span class="material-icons">email</span>
        <span class="text">Contact</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
// import logoURL from "../assets/logo.png";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    #2b5876,
    #4e4376
  ); /* Attractive gradient */
  color: var(--light);
  width: calc(3rem + 32px); /* Increased width */
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  border-radius: 15px; /* Modern rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  transition: 0.3s ease-in-out; /* Smooth transition for sidebar expand/collapse */

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2.5rem; /* Slightly larger logo */
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.3s ease-in-out;

    .menu-toggle {
      background-color: transparent;
      border: none;
      cursor: pointer;

      .material-icons {
        font-size: 2.5rem;
        color: #f0f0f0; /* Light icon color */
        transition: 0.3s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem) rotate(360deg); /* Added rotation for hover effect */
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: #ddd;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.7rem 1.2rem;
      margin: 0.5rem 0;
      border-radius: 10px;
      background-color: rgba(
        255,
        255,
        255,
        0.1
      ); /* Slight transparency for button background */
      transition: 0.3s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: #f0f0f0;
        transition: 0.3s ease-in-out;
      }

      .text {
        color: #f0f0f0;
        transition: 0.3s ease-in-out;
      }

      &:hover {
        background-color: rgba(
          255,
          255,
          255,
          0.2
        ); /* More visible hover effect */
        transform: scale(1.05); /* Slightly scales up on hover */

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: rgba(255, 255, 255, 0.3);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);
    border-radius: 0 15px 15px 0; /* Rounded corners only on the right side when expanded */

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
