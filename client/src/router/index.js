/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import Register from "../components/Register";
import Login from "../components/Login";
import Players from "../components/Players";
import PlayersM from "../components/PlayersM.vue";
import PlayersTest from "../components/Players";
import CreatePlayer from "../components/CreatePlayer.vue";
import HelloWorld from "../components/HelloWorld";
import About from '../components/About.vue';
import Teams from '../components/Teams.vue';
import TeamsM from '../components/TeamsM.vue';
import Stats from '../components/Stats.vue';
import TeamPie from '../components/TeamPie.vue';
import TeamPieDenver from '../components/TeamPieDenver.vue';
import TeamPieLAL from '../components/TeamPieLAL.vue';
import TeamPieMB from '../components/TeamPieMB.vue';
import TeamPieNOP from '../components/TeamPieNOP.vue';
import TeamPieTR from '../components/TeamPieTR.vue';
import DivConf from '../components/DivConf.vue';
import Divisions from '../components/Divisions.vue';
import DivisionsM from '../components/DivisionsM.vue';
import Seasons from '../components/Seasons.vue';
import SeasonsM from '../components/SeasonsM.vue';
import Games from '../components/Games.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "root",
      component: HelloWorld
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/div-conf",
      name: "divconf",
      component: DivConf
    },
    {
      path: "/api/div",
      name: "divisions-m",
      component: DivisionsM
    },
    {
      path: "/div",
      name: "divisions",
      component: Divisions
    },
    {
      path: "/games",
      name: "games",
      component: Games
    },
    {
      path: "/seasons",
      name: "seasons",
      component: Seasons
    },
    {
      path: "/api/seasons",
      name: "seasons-m",
      component: SeasonsM
    },
    {
      path: "/stats",
      name: "stats",
      component: Stats
    },
    {
      path: "/team-pie",
      name: "teampie",
      component: TeamPie
    },
    {
      path: "/team-pie-denver",
      name: "teampie-denver",
      component: TeamPieDenver
    },
    {
      path: "/team-pie-lal",
      name: "teampie-lal",
      component: TeamPieLAL
    },
    {
      path: "/team-pie-mb",
      name: "teampie-mb",
      component: TeamPieMB
    },
    {
      path: "/team-pie-nop",
      name: "teampie-nop",
      component: TeamPieNOP
    },
    {
      path: "/team-pie-tr",
      name: "teampie-tr",
      component: TeamPieTR
    },
    {
      path: "/api/teams",
      name: "teams-m",
      component: TeamsM
    },
    {
      path: "/teams",
      name: "teams",
      component: Teams
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
      path: "/players",
      name: "players",
      component: Players
    },
    {
      path: "/api/players",
      name: "players-m",
      component: PlayersM
    },
    {
      path: "/api/player",
      name: "player-create",
      component: CreatePlayer
    }
  ]
});
