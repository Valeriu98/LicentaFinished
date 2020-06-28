<template>
  <div class="wrapper">
    <span class="bg"></span>
    <v-layout align="start" justify-start>
      <v-flex xs6 offset-xs3>
        <panel title="Data About Seasons">
              <br>
                <v-data-table
      :headers="headers"
      :items="seasons"
      sort-by=""
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar dense fluid color="cyan">
          <v-toolbar-title>Seasons</v-toolbar-title>
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
                      <v-text-field v-model="editedSeason.S_sd" label="Start Date"></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedSeason.F_sd" label="Finish date"></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

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
          small
          class="mr-2"
          @click="editItem(item)"
        >
        <!-- edit --> visibility
        </v-icon>
        <!-- <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon> -->
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
// import TeamsServices from '../services/TeamsServices'
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
          text: 'Start Date',
          align: 'start',
          sortable: false,
          value: 'S_sd'
        },
        { text: 'Finish Date', value: 'F_sd' },
        // { text: 'City', value: 'City' },
        // { text: 'Arena', value: 'Arena' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      seasons: [],
      editedIndex: -1,
      editedSeason: {
        Id_season: 0,
        S_sd: null,
        F_sd: null
        // City: null,
        // Arena: null

      },
      defaultSeason: {
        Id_season: 0,
        S_sd: null,
        F_sd: null
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Season' : 'View Season'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    await (Api().get('/api/seasons').then((response) => {
      this.seasons = response.data
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
        for (this.season of this.seasons) {
          this.seasons = [{
            Id_season: this.season.Id_season,
            S_sd: this.season.S_sd,
            F_sd: this.season.F_sd
            // City: this.team.City,
            // Arena: this.team.Arena
          }]
          console.log(this.season)
        }
      } catch (err) {
        console.log('error is' + err)
      }
    },
    editItem (item) {
      this.editedIndex = this.seasons.indexOf(item)
      this.editedSeason = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.seasons.indexOf(item)
      var sid = this.seasons.map(function (season) {
        return season.Id_season
      })
      confirm('Are you sure you want to delete this season?') &&
      this.seasons.splice(index, 1) && await Api().delete(`api/season/${sid[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('err deleting season' + err)
      })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedSeason = Object.assign({}, this.defaultSeason)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.seasons[this.editedIndex], this.editedSeason)

        await Api().put(`/api/season/${this.editedSeason.Id_season}`, {
          S_sd: this.editedSeason.S_sd,
          F_sd: this.editedSeason.F_sd
          // City: this.editedTeam.City,
          // Arena: this.editedTeam.Arena
        })
      } else {
        this.seasons.push(this.editedSeason)
        try {
          await Api().post('/api/season', this.editedSeason)
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
    background: url( 'https://wallpapercave.com/wp/wp1916152.jpg') no-repeat center center;
    background-size: cover;
    transform: scale(1.1);
  }
</style>
