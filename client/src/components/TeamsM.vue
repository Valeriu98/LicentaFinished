<template>
  <div class="wrapper">
    <span class="bg"></span>
    <v-layout align="start" justify-start>
      <v-flex xs6 offset-xs3>
        <panel title="Data About Teams">
              <br>
                <v-data-table
      :headers="headers"
      :items="teams"
      sort-by="City"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar dense fluid color="cyan">
          <v-toolbar-title>Teams Management</v-toolbar-title>
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
                      <v-text-field v-model="editedTeam.Team_name" label="Team name"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedTeam.Couch" label="Couch"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedTeam.City" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedTeam.Arena" label="Arena"></v-text-field>
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
        </panel>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Panel from './Panel'
import TeamsServices from '../services/TeamsServices'
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
          text: 'Team Name',
          align: 'start',
          sortable: false,
          value: 'Team_name'
        },
        { text: 'Couch', value: 'Couch' },
        { text: 'City', value: 'City' },
        { text: 'Arena', value: 'Arena' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      teams: [],
      editedIndex: -1,
      editedTeam: {
        Id_team: 0,
        Team_name: null,
        Couch: null,
        City: null,
        Arena: null

      },
      defaultTeam: {
        Id_team: 0,
        Team_name: null,
        Couch: null,
        City: null,
        Arena: null
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
    await (TeamsServices.getTeams().then((response) => {
      this.teams = response.data
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
        for (this.team of this.teams) {
          this.team = [{
            Id_team: this.team.Id_team,
            Team_name: this.team.Team_name,
            Couch: this.team.Couch,
            City: this.team.City,
            Arena: this.team.Arena
          }]
          console.log(this.team)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    editItem (item) {
      this.editedIndex = this.teams.indexOf(item)
      this.editedTeam = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.teams.indexOf(item)
      var tid = this.teams.map(function (team) {
        return team.Id_team
      })
      confirm('Are you sure you want to delete this player?') &&
      this.teams.splice(index, 1) && await Api().delete(`api/team/${tid[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('err deleting team' + err)
      })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editeTeam = Object.assign({}, this.defaultTeam)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.teams[this.editedIndex], this.editedTeam)

        await Api().put(`/api/team/${this.editedTeam.Id_team}`, {
          Team_name: this.editedTeam.Team_name,
          Couch: this.editedTeam.Couch,
          City: this.editedTeam.City,
          Arena: this.editedTeam.Arena
        })
      } else {
        this.teams.push(this.editedTeam)
        try {
          TeamsServices.post(this.editedTeam)
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
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://wallpaperaccess.com/full/1112642.jpg') no-repeat center center;
    background-size: cover;
    transform: scale(1.1);
  }
</style>
