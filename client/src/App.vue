<template>
  <div id="app">
<v-app>
    <!-- <v-app-bar> -->
    <div class="top-bar">
      <div id="navigation-icon" v-if="mobileView">
        <i class="fas fa-bars"></i>
      </div>
    <page-header v-if="!mobileView" />
    </div>
    <!-- </v-app-bar> -->
    <v-content>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
    <!-- <img src="./assets/NBA-logo_REG.png"> -->
      <router-view></router-view>
    </v-container>
  </v-content>
  </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  },
  data: () => {
    return {
      mobileView: true,
      showNav: false
    }
  },
  methods: {
    handleView () {
      this.mobileView = window.innerWidth <= 990
    }
  },
  created () {
    this.handleView()
  }
}
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

/* #navigation-icon {
  padding: 10px 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  i {
    font-size: 2rem;
  }
} */
</style>
