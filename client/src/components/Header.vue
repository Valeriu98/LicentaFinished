<template>
    <v-app-bar dense fluid fixed color="#01579B" dark>
      <v-toolbar-title class="mr-4">
        NBA-App
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text dark>Players</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <router-link to="/api/register">
      <v-btn text dark>
        Sign Up
        </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style scoped>
</style>
