<template>
<v-app>
  <v-layout align="start" justify-start>
    <v-flex xs6 offset-xs3>
            <img src="../assets/NBA-logo_REG.png">
            <br><br>
      <div class="white elevation-10" >
        <v-app-bar fluid dense class="" color="#01579B" dark>
        <v-toolbar-title>Register</v-toolbar-title>
        </v-app-bar>
          <br>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="nba-app-form" autocomplete="off">
            <v-text-field
            label="Email"
            outlined
            v-model="Email"
            ></v-text-field>
            <v-text-field
            label="Password"
            type="password"
            outlined
            v-model="Password"
            ></v-text-field>
          </form>
            <!-- <input
              type="email"
              name="email"
              placeholder="email here"
            /> -->
            <!-- <br />
            <br />
            <input
              type="password"
              name="password"
              placeholder="password here"
              v-model="Password"
            /> -->
            <br />
            <!-- <br /> -->
            <div class="error" v-html="error" />
            <!-- <router-link to="/"> -->
            <v-btn class="ma-2" dark color="#BF360C" @click="register">
              Register
            </v-btn>
            <!-- </router-link> -->
        </div>
      </div>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
import AuthenticationServices from '../services/AuthenticationServices'

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
    async register () {
      try {
        const response = await AuthenticationServices.register({
          Email: this.Email,
          Password: this.Password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'root'
        })
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
