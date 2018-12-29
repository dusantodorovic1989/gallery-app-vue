<template>
  <div>
    <form @submit.prevent="submitRegisterForm">
      <div class="form-group">
        <label>First Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter First Name"
          autocomplete
          v-model="user.first_name"
        >
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter Last Name"
          autocomplete
          v-model="user.last_name"
        >
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          autocomplete
          v-model="user.email"
        >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="user.password">
        
      </div>
      <div class="form-group">
        <label>Password Confirm</label>
        <input
          type="password"
          class="form-control"
          placeholder="Confirm Password"
          v-model="user.password_confirmation"
        >
      </div>
      <div class="form-group">
        <input type="checkbox" class="form-check-input" v-model="user.terms_and_conditions">
        <label class="form-check-label" for="exampleCheck1">Accepted terms and conditions</label>
      </div>
      <button type="submit" class="btn btn-dark">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      user: {
        terms_and_conditions: false
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    submitRegisterForm() {
      this.register(this.user);
    }
  },
  computed: {
    ...mapGetters({
      errors: "getErrors"
    })
  }
};
</script>

<style scoped>
form {
  margin: 0 auto;
  width: 45%;
}
input {
  border-radius: 15px;
}
</style>