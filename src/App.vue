<template>
  <div id="app">
  <nav-bar></nav-bar>
        <div class="container">
     <router-view></router-view>
   </div>
  </div>
</template>

<script>
import NavBar from './components/partials/NavBar'
import Singlegallery from './components/SingleGalleries'

export default {
  name: 'app',
  components: {
    NavBar,
    Singlegallery
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
