<template>
<div>
         <!-- <v-toolbar-title>
         <v-switch
          v-model="drawer"
          class="ma-2"
          label="v-model"
        ></v-switch>
         </v-toolbar-title>
<v-container>
        <v-card
        height="500"
        class="overflow-hidden"
      > -->
        <!-- <v-btn  v-model="drawer">
          <v-icon>menu</v-icon>
        </v-btn> -->
        <!-- <v-navigation-drawer
          v-model="drawer"

          absolute
          dark
        >
          <v-list
            dense
            nav
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Application</v-list-item-title>
                <v-list-item-subtitle>Subtext</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      </v-container> -->
        <!-- <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-app-bar-nav-icon> -->

        <!-- <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-app-bar-nav-icon v-model="drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon> -->
    <v-app-bar dense fluid fixed color="#01579B" dark>
      <v-toolbar-title class="mr-4">
        <router-link to="/">
        <v-btn text dark>
        <v-icon>menu</v-icon>
          NBA-App
        </v-btn>
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <router-link v-if="!$store.state.isUserLoggedIn"  to="/players">
        <v-btn text dark>Players</v-btn>
        </router-link>
        <router-link v-if="$store.state.isUserLoggedIn" to="/api/players">
        <v-btn text dark>Players</v-btn>
        </router-link>
        <router-link to="/api/teams">
        <v-btn v-if="$store.state.isUserLoggedIn" text dark>Teams</v-btn>
        </router-link>
        <router-link to="/teams">
        <v-btn v-if="!$store.state.isUserLoggedIn" text dark>Teams</v-btn>
        </router-link>
        <router-link to="/stats">
        <v-btn v-if="$store.state.isUserLoggedIn" text dark>Stats</v-btn>
        </router-link>
        <router-link v-if="$store.state.isUserLoggedIn" to="/api/div">
        <v-btn text dark>Divisions</v-btn>
        </router-link>
        <router-link v-if="!$store.state.isUserLoggedIn" to="/div">
        <v-btn text dark>Divisions</v-btn>
        </router-link>
        <router-link to="/div-conf">
        <v-btn text dark>Conferences</v-btn>
        </router-link>
        <router-link v-if="!$store.state.isUserLoggedIn" to="/seasons">
        <v-btn text dark>Seasons</v-btn>
        </router-link>
        <router-link v-if="$store.state.isUserLoggedIn" to="/api/seasons">
        <v-btn text dark>Seasons</v-btn>
        </router-link>
        <router-link to="/games">
        <v-btn v-if="$store.state.isUserLoggedIn" text dark>Games</v-btn>
        </router-link>
      </v-toolbar-items>
      <v-spacer></v-spacer>

   <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="create">
          <span class="mr-2">Create Post</span>
        </v-btn>
        <v-btn text to="/">
          <span class="mr-2">All Posts</span>
        </v-btn>
      </v-toolbar-items> -->

      <v-toolbar-items >
        <router-link to="/about">
        <v-btn text dark>About
          <v-icon>article</v-icon>
        </v-btn>
        </router-link>
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
      <!-- <v-menu class="hidden-md-and-up" v-if="$vuetify.breakpoint.xsOnly">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="create">
            <v-btn>Create Post</v-btn>
          </v-list-item>
          <v-list-item to="/">
            <v-list-item-title>All Posts</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ]
    }
  },
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
