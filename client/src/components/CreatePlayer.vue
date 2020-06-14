<template>
<div :style="{ backgroundColor: backgroundcolor }" id="wrapper">
<v-app>
  <v-layout align="start" justify-start>
  <v-flex xs6 offset-xs3>
      <v-card>
    <v-img justify-start src="https://www.sportsflagsandpennants.com/images_templ/nba-flags-2.jpg" height =125 alt=""></v-img>
    </v-card>
  <panel title="Player Metadata">
    <v-text-field
            label="F_name"
            outlined
            :rules="[required]"
            v-model="player.F_name"
            ></v-text-field>
    <v-text-field
            label="L_name"
            outlined
            v-model="player.L_name"
            ></v-text-field>
    <v-text-field
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
            label="Nba_debut"
            outlined
            v-model="player.Nba_debut"
            ></v-text-field>
    <v-text-field
            label="Height"
            outlined
            v-model="player.Height"
            ></v-text-field>
    <v-text-field
            label="Position"
            outlined
            v-model="player.Position"
            ></v-text-field>
    <v-text-field
            label="PlayerImage"
            outlined
            v-model="player.PlayerImage"
            ></v-text-field>
  </panel>
          <v-alert type="error" v-if="error">
          Please fill in the required fields
          </v-alert>
  <v-btn class="ma-2" dark color="#66BB6A" @click="create">
              Add Player
            </v-btn>
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
          name: 'players'
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
