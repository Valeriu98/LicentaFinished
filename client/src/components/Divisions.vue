<template>
 <div class="all">
      <span class="bg"></span>
        <v-layout align="start" justify-start>
              <v-flex xs6 offset-xs3>
                <panel title="Data About Divisions">
                      <!-- <br> <br> <br> -->
                      <br>
                      <v-data-table
      :headers="headers"
      :items="divis"
      sort-by="City"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-app-bar dense fluid color="cyan">
          <v-toolbar-title>Divisions Management</v-toolbar-title>
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
                    <v-col cols="2" sm="6" md="4">
                      <v-text-field readonly v-model="editedDiv.Div_name" label="Team name"></v-text-field>
                    </v-col>
                    <v-col  cols="2" sm="6" md="4">
                      <v-text-field readonly v-model="editedDiv.Id_conf" label="Conference (1-E | 2-W)"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                    </v-col>
                      <v-text-field v-model="editedTeam.Couch" label="Couch"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedTeam.City" label="City"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedTeam.Arena" label="Arena"></v-text-field>
                    </v-col> -->

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
          visibility
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
        },
        // { text: 'Couch', value: 'Couch' },
        // { text: 'City', value: 'City' },
        // { text: 'Arena', value: 'Arena' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      divis: [],
      editedIndex: -1,
      editedDiv: {
        Id_div: 0,
        Div_name: null,
        Id_conf: 0
        // Couch: null,
        // City: null,
        // Arena: null

      },
      defaultDiv: {
        Id_div: 0,
        Div_name: null,
        Id_conf: 0

        // Couch: null,
        // City: null,
        // Arena: null
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Division' : 'View Division'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async mounted () {
    await (Api().get(`/api/divisions`).then((response) => {
      this.divis = response.data
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
        // console.log(this.p)
        for (this.div of this.divis) {
          this.div = [{
            Id_div: this.div.Id_div,
            Div_name: this.div.Div_name,
            Id_conf: this.div.Id_conf
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
      this.editedIndex = this.divis.indexOf(item)
      this.editedDiv = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.divis.indexOf(item)
      var did = this.divis.map(function (div) {
        return div.Id_div
      })
      confirm('Are you sure you want to delete this player?') &&
      this.divis.splice(index, 1) && await Api().delete(`api/division/${did[index]}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('err deleting team' + err)
      })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedDiv = Object.assign({}, this.defaultDiv)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        Object.assign(this.divis[this.editedIndex], this.editedDiv)

        await Api().put(`/api/division/${this.editedDiv.Id_div}`, {
          Div_name: this.editedDiv.Div_name
          // Couch: this.editedTeam.Couch,
          // City: this.editedTeam.City,
          // Arena: this.editedTeam.Arena
        })
      } else {
        this.divis.push(this.editedDiv)
        try {
          await Api().post('/api/division', this.editedDiv)
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
