<template>
<v-app>
  <v-layout align="start" justify-start>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-10" >
        <v-app-bar fluid dense class="" color="#01579B" dark>
        <v-toolbar-title>Register</v-toolbar-title>
        </v-app-bar>
          <br>
        <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
            label="Email"
            outlined
            v-model="Email"
            ></v-text-field>
            <v-text-field
            label="Password"
            outlined
            v-model="Password"
            ></v-text-field>
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
            <v-btn class="ma-2" dark color="#BF360C" @click="register">
              Register
            </v-btn>
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
        await AuthenticationServices.register({
          Email: this.Email,
          Password: this.Password
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
