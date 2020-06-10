<template>
  <div>
    <hr />
    <h1>Register</h1>
    <hr />
    <br />
    <input type="email" name="email" placeholder="email here" v-model="email" />
    <br />
    <br />
    <input type="password" name="password" placeholder="pw here" v-model="password" />
    <br />
    <br />
    <button  class="btn btn-primary" @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationServices from '../services/AuthenticationServices'

export default {
  // name: "Register",
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationServices.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style>
</style>
