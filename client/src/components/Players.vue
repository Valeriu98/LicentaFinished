<template>
<div>
  <span  class="bg"></span>
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
          <v-toolbar-title>Players</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                      :rules="[required]" readonly
                      v-model="editedPlayer.F_name"
                      label="Player name"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                      :rules="[required]" readonly
                      v-model="editedPlayer.L_name"
                      label="Player L_name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                      :rules="[required]" readonly
                      v-model="editedPlayer.Born"
                      label="Born"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.College" readonly label="College"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field readonly
                      :rules="[required]"
                      v-model="editedPlayer.Nba_debut"
                      label="NBA Debut"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field readonly v-model="editedPlayer.Height" label="Height"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                      readonly
                      :rules="[required]"
                      v-model="editedPlayer.Position"
                      label="Position"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field readonly v-model="editedPlayer.PlayerImage" label="Player Image URL"></v-text-field>
                      <img class="player-image" :src="editedPlayer.PlayerImage" alt="">
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-alert type="error" v-if="error">
                Please fill in the required fields
              </v-alert>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <!-- <v-btn color="blue darken-1" text @click="save">Save</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          medium
          class="mr-2"
          @click="editItem(item)"
        >
        visibility
        </v-icon>
        <!-- <v-icon
          medium
          @click="deleteItem(item)"
        >
          delete
        </v-icon> -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
        <!-- ceva
        ceva
        ceva
        ceva
        ceva
        ceva
        ceva -->
    <!-- <v-data-table dense :headers="headers" :items="players" item-key="name" class="elevation-1"></v-data-table> -->
        </panel>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
// aici import rutele pt REST cu cererile de backend din fisierul respectiv iar in panel este un Component sablon
import PlayersServices from '../services/PlayersServices'
import Panel from './Panel'
import Api from '../services/Api'

export default {
  components: {
    Panel
  },
  data () {
    return {
      dialog: false,
      // (PlayersServices.index().then((response) => {
      //   this.players = response.data
      // }).catch((err) => {
      //   console.log('err in axios is ' + err)
      //   })),
      // players: PlayersServices.index().data,

      error: null,
      required: (value) => !!value || 'Required.',

      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: false,
          value: 'F_name'
        },
        // this.players = (await PlayersServices.index()).data
        { text: 'Last Name', value: 'L_name' },
        // { text: 'Id_player', value: 'Id_player' },
        { text: 'Born', value: 'Born' },
        { text: 'College', value: 'College' },
        { text: 'NBA debut', value: 'Nba_debut' },
        { text: 'Height', value: 'Height' },
        { text: 'Position', value: 'Position' },
        { text: 'Player Image', value: 'PlayerImage' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      players: [],
      editedIndex: -1,
      editedPlayer: {
        Id_player: 0,
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
        Id_player: 0,
        F_name: null,
        L_name: null,
        Born: null,
        College: null,
        Nba_debut: null,
        Height: null,
        Position: null,
        PlayerImage: null
      },
      deletePlayer: {
        Id_player: 0
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
      return this.editedIndex === -1 ? 'New Player' : 'View player'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    // this.players = (await PlayersServices.index()).data
    await (PlayersServices.index().then((response) => {
      this.players = response.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    }))
  },
  created () {
    this.initialize()
  },
  // NU sunt sigur ca este in regula parcurgerea si implicit afisarea in DataTable a datelor
  // din baza de date
  methods: {
    initialize () {
      try {
        console.log(this.players)
        // this.players = PlayersServices.index().data
        for (this.player of this.players) {
          this.player = [{
            Id_player: this.player.Id_player,
            F_name: this.player.F_name,
            L_name: this.player.L_name,
            Born: this.player.Born,
            College: this.player.College,
            Nba_debut: this.player.Nba_debut,
            Height: this.player.Height,
            Position: this.player.Position,
            PlayerImage: this.player.PlayerImage
          }]
          console.log(this.player)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    editItem (item) {
      this.editedIndex = this.players.indexOf(item)
      this.editedPlayer = Object.assign({}, item)
      this.Id_player = this.players.Id_player
      this.dialog = true
    },
    async deleteItem (item) {
      let index = this.players.indexOf(item)
      var pid = this.players.map(function (player) {
        return player.Id_player
      })
      // for (this.player of this.players) {
      // }
      console.log('########################## ID is ' + pid[index])
      confirm('Are you sure you want to delete this player?') &&
      this.players.splice(index, 1) &&
      await Api().delete(`api/player/${pid[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('error deleting player' + err)
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedPlayer = Object.assign({}, this.defaultPlayer)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.players[this.editedIndex], this.editedPlayer)
        try {
          // console.log(this.Id_player)
          await Api().put(`/api/player/${this.editedPlayer.Id_player}`, {
            F_name: this.editedPlayer.F_name,
            L_name: this.editedPlayer.L_name,
            Born: this.editedPlayer.Born,
            College: this.editedPlayer.College,
            Nba_debut: this.editedPlayer.Nba_debut,
            Height: this.editedPlayer.Height,
            Position: this.editedPlayer.Position,
            PlayerImage: this.editedPlayer.PlayerImage
          }).then((result) => {
            console.log(result)
          }).catch((err) => {
            console.log('err in axios is ' + err)
          })
        } catch (err) {
          console.log('error in put is: ' + err)
        }
      } else {
        this.players.push(this.editedPlayer)
        try {
          await PlayersServices.post(this.editedPlayer)
          // this.$router.push({
          // name: 'players'
          // })
        } catch (e) {
          console.log(e)
        }
      }
      this.close()
    },

    errorAlert () {
      this.error = null
      const areFilledIn = Object.keys(this.players).every(key => !!this.players[key])
      if (!areFilledIn) {
        this.error = 'Please fill in all the required fields'
      }
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
    background: url( 'https://pbs.twimg.com/media/EQaQhqJVAAUJBHP.jpg') no-repeat center center;
    background-size: cover;
    /* background-color:;https://50-best.com/wp-content/uploads/2018/12/nba_paint-1024x576.jpg */
    transform: scale(1.1);
  }

</style>
