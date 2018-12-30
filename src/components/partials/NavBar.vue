<template>
	

  <div>
    <nav class="navbar navbar-expand-lg navbar-green bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">All galleries</router-link>
        <router-link class="navbar-brand" to="/my-galleries" v-if="user">My Galleries</router-link>
        <router-link class="navbar-brand" to="/create" v-if="user">Create New Gallery</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            
            <li class="nav-item">
              <router-link class="nav-link" to="/login" v-if="!user">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register" v-if="!user">Register</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logoutOnClick" v-if="user">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(["logout"]),
    logoutOnClick() {
     this.logout();
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
};
</script>

<style scoped>
.nav-item {
  color: #b6c1c3;
  
}
</style>