<template>
    <v-app-bar dense fluid fixed color="#01579B" dark>
      <v-toolbar-title class="mr-4">
        <router-link to="/">
        <v-btn text dark>
          NBA-App
        </v-btn>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <router-link to="/api/players">
        <v-btn text dark>Players</v-btn>
        </router-link>
        <router-link to="/test">
        <v-btn text dark>PlayersTEST</v-btn>
        </router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items >
      <router-link to="/api/login">
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark >
        Log In
        </v-btn>
        </router-link>
      <router-link to="/api/register">
      <v-btn v-if="!$store.state.isUserLoggedIn" text dark >
        Sign Up
        </v-btn>
        </router-link>
        <!-- </router-link> -->
      <router-link to="/">
      <v-btn v-if="$store.state.isUserLoggedIn" text dark @click="logout">
        Log Out
        </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style scoped>
</style>
