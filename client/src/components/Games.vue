<template>
<div>
  <span  class="bg"></span>
    <v-layout align="start" justify-start>
    <v-flex xs10 offset-xs1>
      <panel title="Data about Games">

        <br>
      <v-data-table
      :headers="headers"
      :items="games"
      sort-by="nba_debut"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar fluid color="cyan">
          <v-toolbar-title>Games</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on" fab
              >
              <v-icon>
              add
              </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedGame.G_Date" label="Game date"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedGame.Team_name" label="Home team"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedGame.Guest" label="Guest team"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedGame.Loc_name" label="Location"></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
        edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

          <panel title="Games STATS">
             <br>
      <v-data-table
      :headers="headers_p"
      :items="points"
      sort-by="Total"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar fluid color="cyan">
          <v-toolbar-title>Points</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_p" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on" fab
              >
              <v-icon>
              add
              </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle_p }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-row>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Total_pts" label="Total pts"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Nr_3PT" label="3PT"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Nr_FTT" label="FTT"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Nr_FGT" label="FGT"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Id_game" label="Game"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPoint.Id_player" label="Player"></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close_p">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save_p">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem_p(item)"
        >
        edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem_p(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize_p">Reset</v-btn>
      </template>
    </v-data-table>
          </panel>
        </panel>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>

import Api from '../services/Api'
import Panel from './Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      dialog: false,
      dialog_p: false,

      headers: [
        {
          text: 'Game Date',
          align: 'start',
          sortable: false,
          value: 'G_Date'
        },
        { text: 'Home Team', value: 'Team_name' },
        { text: 'Guest Team', value: 'Guest' },
        { text: 'Location', value: 'Loc_name' }
        // { text: 'College', value: 'College' },
        // { text: 'NBA debut', value: 'Nba_debut' },
        // { text: 'Height', value: 'Height' },
        // { text: 'Position', value: 'Position' }
        // { text: 'Player Image', value: 'PlayerImage' },
        // { text: 'Actions', value: 'actions', sortable: false }
      ],
      headers_p: [
        {
          text: 'Game Index',
          align: 'start',
          sortable: false,
          value: 'Game'
        },
        { text: 'Player name', value: 'Player' },
        { text: 'Team Name', value: 'Team' },
        { text: 'Total', value: 'TotalPoints' },
        { text: '3PT', value: '3PT' },
        { text: 'FGT', value: 'FGT' },
        { text: 'FTT', value: 'FTT' }
        // { text: 'Actions', value: 'actions', sortable: false }
      ],
      games: [],
      points: [],
      editedIndex: -1,
      editedIndex_p: -1,

      editedGame: {
        Id_game: 0,
        G_Date: null,
        Home_Team: null,
        Guest_Team: null,
        Id_location: 0
      },
      editedPoint: {
        Id_points: 0
        // G_Date: null,
        // Home_Team: null,
        // Guest_Team: null,
        // Id_location: 0
      },
      defaultGame: {
        Id_game: 0
        // G_Date: null,
        // Home_Team: null,
        // Guest_Team: null,
        // Id_location: 0
      },
      defaultPoint: {
        Id_points: 0
        // G_Date: null,
        // Home_Team: null,
        // Guest_Team: null,
        // Id_location: 0
      }

    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Game' : 'Edit Game'
    },
    formTitle_p () {
      return this.editedIndex === -1 ? 'New Entry' : 'Edit Entry'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialog_p (val) {
      val || this.close_p()
    }
  },
  async mounted () {
    await Api().get('/api/games').then((result) => {
      this.games = result.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    })
    await Api().get('/api/points').then((result) => {
      this.points = result.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    })
  },
  created () {
    this.initialize()
    this.initialize_p()
  },
  methods: {
    initialize () {
      try {
        console.log(this.games)
        for (this.game of this.games) {
          this.game = [{
            Id_game: this.game.Id_game,
            GameDate: this.game.G_Date
            // Home_team: this.game.Home_team,
            // Guest_team: this.game.Guest_team,
            // Id_location: this.game.Id_location
          }]
          console.log(this.game.Id_game)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    initialize_p () {
      try {
        console.log(this.points)
        // this.players = PlayersServices.index().data
        for (this.point of this.points) {
          this.point = [{
            Id_points: this.point.Id_points
            // GameDate: this.game.G_Date
            // Home_team: this.game.Home_team,
            // Guest_team: this.game.Guest_team,
            // Id_location: this.game.Id_location
          }]
          console.log(this.point)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    //
    //
    //
    //
    //
    editItem (item) {
      this.editedIndex = this.games.indexOf(item)
      this.editedGame = Object.assign({}, item)
      this.dialog = true
    },
    editItem_p (item) {
      this.editedIndex = this.points.indexOf(item)
      this.editedPoint = Object.assign({}, item)
      this.dialog = true
    },
    //
    //
    //
    //
    //
    async deleteItem (item) {
      const index = this.games.indexOf(item)
      var gid = this.games.map(function (game) {
        return game.Id_game
      })
      confirm('Are you sure you want to delete this game?') &&
      this.games.splice(index, 1) && await Api().delete(`api/game/${gid[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('err deleting game' + err)
      })
    },
    async deleteItem_p (item) {
      const index = this.points.indexOf(item)
      var pid = this.points.map(function (point) {
        return point.Id_points
      })
      confirm('Are you sure you want to delete this points?') &&
      this.points.splice(index, 1) && await Api().delete(`api/point/${pid[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('err deleting game' + err)
      })
    },

    //
    //
    //
    //
    //
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedGame = Object.assign({}, this.defaultGame)
        this.editedIndex = -1
      })
    },
    close_p () {
      this.dialog_p = false
      this.$nextTick(() => {
        this.editedPoint = Object.assign({}, this.defaultPoint)
        this.editedIndex = -1
      })
    },
    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.games[this.editedIndex], this.editedGame)

        await Api().put(`/api/game/${this.editedGame.Id_game}`, {
          G_Date: this.editedGame.G_Date
          // HomeTeam: this.editedGame.HomeTeam,
          // GuestTeam: this.editedGame.GuestTeam,
          // Location: this.editedGame.Location
        })
      } else {
        this.games.push(this.editedGame)
        try {
          await Api().post('/api/game', this.editedGame)
        } catch (e) {
          console.log(e)
        }
      }
      this.close()
    },
    async save_p () {
      if (this.editedIndex > -1) {
        Object.assign(this.points[this.editedIndex], this.editedPoint)

        await Api().put(`/api/point/${this.editedPoint.Id_points}`, {
          Game: this.editedPoint.Id_game
          // HomeTeam: this.editedGame.HomeTeam,
          // GuestTeam: this.editedGame.GuestTeam,
          // Location: this.editedGame.Location
        })
      } else {
        this.points.push(this.editedPoint)
        try {
          await Api().post('/api/point', this.editedPoint)
        } catch (e) {
          console.log(e)
        }
      }
      this.close_p()
    }
  }
}
</script>

<style scoped>
.player-image {
  width: 100%;
}
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://besthqwallpapers.com/Uploads/27-12-2017/35364/thumb2-washington-wizards-4k-logo-material-design-american-basketball-club.jpg') no-repeat center center;
    background-size: cover;
    /* background-color:;https://50-best.com/wp-content/uploads/2018/12/nba_paint-1024x576.jpg */
    transform: scale(1.1);
  }

</style>
