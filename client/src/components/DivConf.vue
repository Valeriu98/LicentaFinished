<template>
  <div class="all">
      <span class="bg"></span>
      <v-layout>
        <v-flex xs5 offset-xs1 full-width  >
          <panel title ="Eastern Conference">
          <v-row
          align=""
          justify="center"
          >

            <v-img justify-start
            justify="center"
            height="200px"
            width="100px"
            contain
            src="https://vignette.wikia.nocookie.net/logopedia/images/8/89/Eastern_Conference_%28NBA%29_1993.svg/revision/latest/scale-to-width-down/340?cb=20181220191748"></v-img>

            <br> <br> <br>
            <v-data-table
            :headers="headers"
            :items="divisions"
            sort-by="City"
            class="elevation-2"
            >
            <template v-slot:top>
        <v-app-bar dense fluid color="cyan">
          <v-toolbar-title>Eastern Divisons</v-toolbar-title>
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
                      <v-text-field v-model="editedDiv.Div_name" label="Div name"></v-text-field>
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

          </v-row>
          </panel>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs5>
          <panel title ="Western Conference">
          <v-row
          align=""
          justify="center"
          >

            <v-img justify-start
            justify="center"
            height="200px"
            width="100px"
            contain
            src="https://seeklogo.com/images/N/nba-western-conference-logo-CD123BABD3-seeklogo.com.png"></v-img>
<!--  -->
            <br> <br> <br>
            <v-data-table
            :headers="headers"
            :items="divisions2"
            sort-by="City"
            class="elevation-2"
            >
            <template v-slot:top>
        <v-app-bar dense fluid color="cyan">
          <v-toolbar-title>Western Divisons</v-toolbar-title>
          <v-divider
            class="mx-10"
            inset
            vertical
          ></v-divider>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- <template v-slot:activator="{ on, attrs }"> -->
              <!-- <v-btn
                color="green"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on" fab
              >
              <v-icon>
              add
              </v-icon>
              </v-btn> -->
            <!-- </template> -->

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedDiv.Div_name" label="Div name"></v-text-field>
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

          </v-row>
          </panel>
        </v-flex>

      </v-layout>
  </div>
</template>

<script>
import Panel from './Panel'
import Api from '../services/Api'

export default {
  components: {
    Panel
  },
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: 'Division Name',
          align: 'start',
          sortable: false,
          value: 'Div_name'
        }
        // { text: 'Div', value: 'Couch' },
        // { text: 'City', value: 'City' },
        // { text: 'Arena', value: 'Arena' },
        // { text: 'Actions', value: 'actions', sortable: false }
      ],
      divisions: [],
      divisions2: [],
      editedIndex: -1,
      editedDiv: {
        // Id_team: 0,
        Div_name: null
        // Couch: null,
        // City: null,
        // Arena: null

      },
      defaultDiv: {
        // Id_team: 0,
        Div_name: null
        // Couch: null,
        // City: null,
        // Arena: null
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Team' : 'Edit Team'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    let id = 1
    await (Api().get(`/api/divisions/${id}`).then((response) => {
      this.divisions = response.data
    }).catch((err) => {
      console.log('err in axios is ' + err)
    }))
    let id2 = 2
    await (Api().get(`/api/divisions/${id2}`).then((response) => {
      this.divisions2 = response.data
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
        // console.log(this.players)
        for (this.div of this.divisions) {
          this.div = [{
            // Id_team: this.team.Id_team,
            Div_name: this.div.Div_name
            // Couch: this.team.Couch,
            // City: this.team.City,
            // Arena: this.team.Arena
          }]
          console.log(this.div)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    editItem (item) {
      this.editedIndex = this.divisions.indexOf(item)
      this.editedDiv = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      // const index = this.teams.indexOf(item)
      // var tid = this.teams.map(function (team) {
      //   return team.Id_team
      // })
      // confirm('Are you sure you want to delete this player?') &&
      // this.teams.splice(index, 1) && await Api().delete(`api/team/${tid[index]}`).then((result) => {
      //   console.log(result)
      // }).catch((err) => {
      //   console.log('err deleting team' + err)
      // })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedDiv = Object.assign({}, this.defaultDiv)
        this.editedIndex = -1
      })
    },

    async save () {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.teams[this.editedIndex], this.editedTeam)

      //   await Api().put(`/api/team/${this.editedTeam.Id_team}`, {
      //     Team_name: this.editedTeam.Team_name,
      //     Couch: this.editedTeam.Couch,
      //     City: this.editedTeam.City,
      //     Arena: this.editedTeam.Arena
      //   })
      // } else {
      //   this.teams.push(this.editedTeam)
      //   try {
      //     TeamsServices.post(this.editedTeam)
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }
      // this.close()
    }
  }
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://i.pinimg.com/originals/58/e8/7e/58e87e06f682144907c822cc14a7882e.jpg') no-repeat center center;
    background-size: cover;
    transform: scale(1.1);
  }
</style>
