<template>
  <v-app>
    <v-layout align="start" justify-start>
    <v-flex xs6 offset-xs3>
      <panel title="Players TEST">
        <!-- buton pt add players -->
        <router-link slot="action" :to="{name: 'player-create'}">
                <v-btn  fab color="green" absolute right middle>
        <v-icon>add</v-icon>
      </v-btn>
        </router-link>
        <!-- LET THE FUN BEGIN -->
        <!-- <div v-for="player in players" :key="player.id">
          {{player.F_name}} - {{player.L_name}}
        </div> -->
        <br>
        <br>
        <br>
        <br>
        <!-- HERE IS WORK GETTING DONE  -->
      <v-data-table
      :headers="headers"
      :items="players"
      sort-by="nba_debut"
      class="elevation-5"
    >
      <template v-slot:top>
        <v-app-bar fluid color="white">
          <v-toolbar-title>Players Management</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <!-- <tr>{{players}}</tr> -->
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >New Player</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.name" label="Player name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.l_name" label="Player L_name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.born" label="Born"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.college" label="College"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.nba_debut" label="NBA Debut"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.height" label="Height"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.position" label="Position"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedPlayer.playeriamge" label="Player Image"></v-text-field>
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
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
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
  </v-app>
</template>

<script>
import PlayersServices from '../services/PlayersServices'
import Panel from './Panel'

export default {
  components: {
    Panel
  },
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'L_name', value: 'l_name' },
        { text: 'Born', value: 'born' },
        { text: 'College', value: 'college' },
        { text: 'NBA debut', value: 'nba_debut' },
        { text: 'Height', value: 'height' },
        { text: 'Position', value: 'position' },
        { text: 'Player Image', value: 'playerimage' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      players: [],
      editedIndex: -1,
      editedPlayer: {
        name: null,
        l_name: null,
        born: null,
        college: null,
        nba_debut: null,
        height: null,
        position: null,
        playerimage: null
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
    this.players = (await PlayersServices.index()).data
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      try {
        console.log(this.players)
        // this.players = PlayersServices.index().data
        for (this.player in this.players) {
          this.player = [{
            name: this.player.F_name,
            l_name: this.player.L_name,
            born: this.player.Born,
            college: this.player.College,
            nba_debut: this.player.Nba_debut,
            height: this.player.Height,
            position: this.player.Position,
            playerimage: this.player.PlayerImage
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
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.players[this.editedIndex], this.editedPlayer)
      } else {
        this.players.push(this.editedPlayer)
        try {
          PlayersServices.post(this.players)
          this.$router.push({
            name: 'players'
          })
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

</style>
