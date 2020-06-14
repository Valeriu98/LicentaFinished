<template>
<v-app>
  <v-layout align="start" justify-start>
    <v-flex xs6 offset-xs3>
      <img src="../assets/NBA-logo_REG.png">
      <br>
      <br>
      <div class="white elevation-10" >
        <v-app-bar fluid dense class="" color="#01579B" dark>
        <v-toolbar-title>Log In</v-toolbar-title>
        </v-app-bar>
          <br>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form name="nba-app-form" autocomplete="on">
            <v-text-field
            label="Email"
            outlined
            v-model="Email"
            ></v-text-field>
            <v-text-field
            label="Password"
            outlined
            type="password"
            v-model="Password"
            autocomplete="new-password"
            ></v-text-field>
            </v-form>
            <br />
            <!-- <br /> -->
            <div class="error" v-html="error" />
            <v-btn class="ma-2" dark color="#BF360C" @click="login">
              Log In
            </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
import AuthenticationServices from '../services/AuthenticationServices'
// import store from '../store/store'

export default {
  // name: "Register",
  data () {
    return {
      Email: '',
      Password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationServices.login({
          Email: this.Email,
          Password: this.Password
        })
        console.log('############################### ' + response.user + '############################### ')
        try {
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        } catch (e) {
          console.log('error in store dispatch' + e)
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
