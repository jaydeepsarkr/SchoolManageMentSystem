<template>
  <aside
    v-if="shouldShowSidebar"
    :class="`${is_expanded ? 'is-expanded' : ''}`"
  >
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
      <router-link to="/home" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
      <router-link to="/about" class="button">
        <span class="material-icons">description</span>
        <span class="text">Leave Request</span>
      </router-link>
      <router-link to="/users" class="button">
        <span class="material-icons">group</span>
        <span class="text">Users</span>
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import logoURL from "../assets/logo.png";

const hasAuthToken = computed(() => {
  return localStorage.getItem("authToken") !== null;
});

const route = useRoute();

const shouldShowSidebar = computed(() => {
  const excludedRoutes = ["/login", "/signup"];
  return hasAuthToken.value && !excludedRoutes.includes(route.path);
});

const is_expanded = ref(
  hasAuthToken.value && localStorage.getItem("is_expanded") === "true"
);

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>
<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
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
    color: var(--grey);
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
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

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

    .footer {
      opacity: 0;
    }
  }

  /* Media Queries for Responsiveness */

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
    width: calc(3rem + 48px); /* Slightly wider for tablets */
  }

  @media (max-width: 768px) {
    width: calc(2rem + 32px); /* Adjust sidebar width for smaller screens */
    padding: 0.5rem; /* Reduce padding for smaller devices */

    .logo img {
      width: 1.5rem; /* Smaller logo size */
    }

    .menu-toggle-wrap {
      margin-bottom: 0.5rem;
    }

    .menu-toggle .material-icons {
      font-size: 1.5rem; /* Smaller icon size */
    }

    h3 {
      font-size: 0.75rem; /* Smaller text */
      margin-bottom: 0.3rem;
    }

    .button {
      padding: 0.5rem; /* Smaller padding for buttons */
      .material-icons {
        font-size: 1.5rem; /* Smaller button icons */
      }
    }

    .footer {
      p {
        font-size: 0.75rem; /* Smaller footer text */
      }
    }
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width on mobile */
    position: fixed;
    bottom: 0;
    top: auto;
    min-height: auto;
    flex-direction: row;
    padding: 0.5rem;

    .menu-toggle-wrap {
      position: absolute;
      top: -2rem;
      right: 0;
    }

    .menu {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0;

      .button {
        flex: 1; /* Make buttons stretch */
        justify-content: center;

        .material-icons {
          font-size: 1.5rem;
        }

        .text {
          display: none; /* Hide text on mobile for space */
        }
      }
    }

    .footer {
      display: none; /* Hide footer on mobile for cleaner look */
    }
  }
}
</style>
