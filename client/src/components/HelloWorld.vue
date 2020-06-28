<template>
<div class="fundal">
  <span class="bg"></span>
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="12">

  <h1>Welcome to NBA-App</h1>
    </v-col>
  </v-row>
  <v-layout>
  <v-flex xs10  >
  <panel title="Quotes">
  <v-row
        align="start"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1></h1>
          <!-- <h4 class="subheading">Build your application today!</h4> -->

    <v-card max-height="700"
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://dlg7f659mb7jz.cloudfront.net/files/frontend/cropped/outdooractivities.jpg"
      >
        <v-card-title class="citat">THE QUOTES OF TODAY</v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <div>"You have to expect things of yourself before you can do them."-     Michael Jordan</div>
        <br>
        <div>"I've always believed that if you put in the work, the results will come."  - Michael Jordan</div>
        <br>
        <div>"Great players are willing to give up their own personal achievement for the achievement of the group. It enhances everybody." - Kareem Abdul-Jabbar</div>
        <br>
        <div>
          "Push yourself again and again. Don't give an inch until the final buzzer sounds."- Larry Bird</div>

      </v-card-text>
    </v-card>

        </v-col>
      </v-row>
      </panel>
          </v-flex>

      <v-flex  xs10 offset-xs1>

      <panel title="Calendar of Month">
    <v-layout>
          <v-flex>
        <v-sheet height="500">
          <v-calendar
            :now="today"
            :value="today"
            color="green"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.title"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    text
                  >
                    <v-toolbar
                      color="#BF360C"
                      dark
                    >

                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.details">
                        <br>
                      </span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn
                        color="red lighten-3"
                        white
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
          </v-flex>
    </v-layout>
      </panel>
      </v-flex>
  </v-layout>
</div>
</template>

<script>
import Panel from './Panel'
import Api from '../services/Api'

export default {

  name: 'HelloWorld',
  components: {
    Panel
  },
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    games: [],
    // events: []

    events: [
      {
        title: 'Game',
        details: 'HomeTeam',
        date: '2020-06-03',
        open: false
      },
      {
        title: 'Game',
        details: 'Charlotte Hornets -Boston Celtics',
        date: '2020-06-11',
        open: false
      },
      {
        title: 'Game',
        details: 'Houston Rockets-Toronto Raptors',
        date: '2020-06-22',
        open: false
      },
      {
        title: 'Game',
        details: 'Chicago Bulls-Charlotte Hornets',
        date: '2020-07-03',
        open: false
      },
      {
        title: 'Game',
        details: 'Atlanta Hawks-Miami Heat',
        date: '2020-07-04',
        open: false
      },
      {
        title: 'Game',
        details: 'Golden State Warriors-Los Angeles Lakers',
        date: '2020-07-01',
        open: false
      }

    ]
  }),
  async mounted () {
    // this.players = (await PlayersServices.index()).data
    await Api().get('/api/games').then((result) => {
      this.games = result.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    })
  },
  computed: {
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  // created () {
  //   this.initialize()
  // },
  methods: {
    open (event) {
      alert(event.title)
    }
    // initialize () {
    //   try {
    //     for (this.event of this.events) {
    //       this.event = [{
    //         title: 'Game',
    //         details: this.event.HomeTeam + this.event.GuestTeam,
    //         date: this.game.GameDate,
    //         open: false
    //         // Guest_team: this.game.GuestTeam,
    //         // Id_location: this.game.Location
    //       }]
    //       console.log(this.game)
    //     }
    //   } catch (err) {
    //     console.log('error is' + err)
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .fundal{
  background-image: url("https://www.wallpaperback.net/wp-content/uploads/2018/06/Wallpaper%20NBA,%20basketball,%20the%20ball%20in%20the%20basket,%20Sport%205130517140.jpg");
  height: 1080px; https://50-best.com/wp-content/uploads/2018/12/nba_paint-1024x576.jpg
  background-color: black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
} */
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://www.wallpaperback.net/wp-content/uploads/2018/06/Wallpaper%20NBA,%20basketball,%20the%20ball%20in%20the%20basket,%20Sport%205130517140.jpg') no-repeat center center;
    background-size: cover;
    /* background-color:; */
    transform: scale(1.1);
  }
h1{
  font-size: 5rem;
}

.citat{
  font-size: 40px;
}

.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #BF360C;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
