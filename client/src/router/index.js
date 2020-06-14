/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Register from "../components/Register";
import Login from "../components/Login";
import Players from "../components/Players";
import PlayersTest from "../components/Players";
import CreatePlayer from "../components/CreatePlayer.vue";
import HelloWorld from "../components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "root",
      component: HelloWorld
    },
    {
      path: "/api/register",
      name: "register",
      component: Register
    },
    {
      path: "/api/login",
      name: "login",
      component: Login
    },
    {
      path: "/test",
      name: "players-test",
      component: PlayersTest
    },
    {
      path: "/api/players",
      name: "players",
      component: Players
    },
    {
      path: "/api/player",
      name: "player-create",
      component: CreatePlayer
    }
  ]
});
