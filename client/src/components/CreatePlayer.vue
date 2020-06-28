<template>
<div :style="{ backgroundColor: backgroundcolor }" id="wrapper">
<v-app>
  <v-layout align="start" justify-start>
  <v-flex xs6 offset-xs3>
      <v-card>
    <v-img justify-start src="https://www.sportsflagsandpennants.com/images_templ/nba-flags-2.jpg" height =125 alt=""></v-img>
    </v-card>
  <panel title="ADD NEW PLAYER">
    <v-text-field
            label="First name"
            outlined
            :rules="[required]"
            v-model="player.F_name"
            ></v-text-field>
    <v-text-field
            label="Last name"
            outlined
            :rules="[required]"
            v-model="player.L_name"
            ></v-text-field>
    <v-text-field
            :rules="[required]"
            label="Born"
            outlined
            v-model="player.Born"
            ></v-text-field>
    <v-text-field
            label="College"
            outlined
            v-model="player.College"
            ></v-text-field>
    <v-text-field
            label="NBA_debut"
            outlined
            :rules="[required]"
            v-model="player.Nba_debut"
            ></v-text-field>
    <v-text-field
            label="Height"
            outlined
            v-model="player.Height"
            ></v-text-field>
    <v-text-field
    :rules="[required]"
            label="Position"
            outlined
            v-model="player.Position"
            ></v-text-field>
    <v-text-field
            label="PlayerImage"
            outlined
            v-model="player.PlayerImage"
            ></v-text-field>
  <v-btn class="ma-2" dark color="#66BB6A" @click="create">
              Add Player
            </v-btn>
  </panel>
          <v-alert type="error" v-if="error">
          Please fill in the required fields
          </v-alert>
  </v-flex>
  </v-layout>
</v-app>
</div>
</template>

<script>
import Panel from './Panel'
// import PlayerServices from '../services/PlayersServices'
import PlayersServices from '../services/PlayersServices'

export default {
  components: {
    Panel
  },
  data () {
    return {
      backgroundcolor: '#16a085',
      player: {
        F_name: null,
        L_name: null,
        Born: null,
        College: null,
        Nba_debut: null,
        Height: null,
        Position: null,
        PlayerImage: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object.keys(this.player).every(key => !!this.player[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }
      try {
        await PlayersServices.post(this.player)
        this.$router.push({
          name: 'players-m'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.fundal {
  background-color: cadetblue;
}

#wrapper {
  margin: 0;
  padding: 0px 10px;
  background-color: blueviolet;

  width: 100%;
}
</style>
