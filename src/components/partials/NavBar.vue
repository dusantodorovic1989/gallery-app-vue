<template>
	

  <div>
    <nav class="navbar navbar-expand-lg navbar-green bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">ALL GALLERIES</router-link>
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
            <li class="nav-item active">
              <router-link class="nav-link" to="/">
                HOME
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login" v-if="!user">LOGIN</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register" v-if="!user">REGISTER</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" role="button"  @click="logoutOnClick" v-if="user">LOGOUT</a>
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

<style>
</style>