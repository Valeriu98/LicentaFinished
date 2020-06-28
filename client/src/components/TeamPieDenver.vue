<template>
<div>
  <span  class="bg"></span>
  <v-app>
    <v-layout align="start" justify-start>
    <v-flex xs10 offset-xs1>
      <panel title="Data about players">
        <br>
      <v-data-table
      :headers="headers"
      :items="players"
      sort-by="nba_debut"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar fluid color="cyan">
          <v-toolbar-title>Denver Nugetts</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }">
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
            </template> -->

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.F_name" label="Player name"></v-text-field>
                      <!-- <div v-for="player in players" :key="player.id">
                        {{player.F_name}}
                      </div> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.L_name" label="Player L_name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.Born" label="Born"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.College" label="College"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.Nba_debut" label="NBA Debut"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.Height" label="Height"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.Position" label="Position"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.PlayerImage" label="Player Image"></v-text-field>
                      <img class="player-image" :src="editedPlayer.PlayerImage" alt="">
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

    <panel title="PIE STATS">
        <v-card
      class="mx-auto text-center"
      color="green"
      dark
      width="70%"
    >
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :items="pie"
            :value="pie"
            :header="headers"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"

          >
            <template  v-slot:label="item">
              {{ item.value}}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">PIE   Denver Nugetts</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
          <router-link to="/stats">
        <v-btn block text>Go to Stats</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
    </panel>

        </panel>
    </v-flex>
    </v-layout>
  </v-app>
  </div>
</template>

<script>

import PlayersServices from '../services/PlayersServices'
import Api from '../services/Api'
import Panel from './Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      dialog: false,
      pie: [10.9, 8.8, -22, 5.2, 5.6, 5.6],

      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: false,
          value: 'F_name'
        },
        // this.players = (await PlayersServices.index()).data
        { text: 'Last Name', value: 'L_name' },
        { text: 'Born', value: 'Born' },
        { text: 'College', value: 'College' },
        { text: 'NBA debut', value: 'Nba_debut' },
        { text: 'Height', value: 'Height' },
        { text: 'Position', value: 'Position' }
        // { text: 'PIE', value: 'pie' }
        // { text: 'Player Image', value: 'PlayerImage' },
        // { text: 'Actions', value: 'actions', sortable: false }
      ],
      players: [],
      editedIndex: -1,
      editedPlayer: {
        F_name: null,
        L_name: null,
        Born: null,
        College: null,
        Nba_debut: null,
        Height: null,
        Position: null,
        PlayerImage: null
      },
      defaultPlayer: {
        name: null,
        l_name: null,
        born: null,
        college: null,
        nba_debut: null,
        height: null,
        position: null,
        playerimage: null
      }

    // {
    //   text: 'Players',
    //   align: 'start',
    //   sortable: false,
    //   value: 'name'
    // },

    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Player' : 'Edit player'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    // this.players = (await PlayersServices.index()).data
    await (Api().get(`/api/players/${8}`).then((response) => {
      this.players = response.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    }))
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      try {
        console.log(this.players)
        // this.players = PlayersServices.index().data
        for (this.player of this.players) {
          this.player = [{
            F_name: this.player.F_name,
            L_name: this.player.L_name,
            Born: this.player.Born,
            College: this.player.College,
            Nba_debut: this.player.Nba_debut,
            Height: this.player.Height,
            Position: this.player.Position,
            PlayerImage: this.player.PlayerImage,
            pie: this.pie
          }
          ]
          console.log(this.player)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    editItem (item) {
      this.editedIndex = this.players.indexOf(item)
      this.editedPlayer = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.players.indexOf(item)
      confirm('Are you sure you want to delete this player?') &&
      this.players.splice(index, 1)
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedPlayer = Object.assign({}, this.defaultPlayer)
        this.editedIndex = -1
      })
    },
    // am incercat sa salvez un player nou prin form, folosind o cerere POST
    save () {
      if (this.editedIndex > -1) {
        try {
          PlayersServices.post(this.players[this.editedIndex])
        } catch (err) {
          console.log('error in post is: ' + err)
        }
        Object.assign(this.players[this.editedIndex], this.editedPlayer)
      } else {
        this.players.push(this.editedPlayer)
        try {
          PlayersServices.post(this.players)
          // this.$router.push({
          // name: 'players'
          // })
        } catch (e) {
          console.log(e)
        }
      }
      this.close()
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
