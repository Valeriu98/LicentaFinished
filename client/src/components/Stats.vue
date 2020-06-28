<template>
  <div class="wrapper">
    <span class="bg"></span>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <panel title="Choose a Team">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card max-width="800" class="mx-auto">
                  <v-img
                    class="justify-center"
                    width="68%"
                    src="https://www.nba.com/wizards/sites/wizards/files/wiz-1080x1080.png?w=180&amp;h=105"
                  ></v-img>
                  <v-card-title class="text-center">
                    Washington
                    <br />Wizards
                  </v-card-title>
                  <v-card-actions>
                    <router-link to="/team-pie">
                      <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card class="mx-auto" max-width="900">
                  <v-img justify="center"
                    class="justify-center"
                    width="100%"
                    src="https://www.nba.com/lakers/sites/lakers/files/lakers_logo_500.png?w=180&amp;h=105"
                  ></v-img>
                  <v-card-title class="text-center">
                    <br>
                    LA Lakers

                    <br>
                  </v-card-title>
                  <v-card-actions>
                    <router-link to="/team-pie-lal">
                    <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card class="mx-auto" max-width="200">
                  <v-img
                    class="justify-center"
                    width="77%"
                    src="//www.nba.com/assets/logos/teams/secondary/web/MIL.svg"
                  ></v-img>
                  <v-card-title class="text-center">
                  <br> Milwaukee Bucks  <br></v-card-title>

                  <v-card-actions>
                    <router-link to="/team-pie-mb">
                    <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card class="mx-auto" max-width="300">
                  <v-img
                    class="justify-center"
                    width="93%"
                    src="https://www.nba.com/pelicans/sites/pelicans/files/1415_nop_hdrlogo2.png "
                  ></v-img>
                  <v-card-title class="text-center">
                    New
                    Orleans <br>
                    Pelicans
                  </v-card-title>
                  <v-card-actions>
                    <router-link to="/team-pie-nop">
                    <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card class="mx-auto" max-width="200">
                  <v-img
                    class="justify-center"
                    width="90%"
                    src="//www.nba.com/assets/logos/teams/secondary/web/TOR.svg"
                  ></v-img>
                  <v-card-title class="text-center">
                    Toronto Raptors
                    <br />
                  </v-card-title>
                  <v-card-actions>
                    <router-link to="/team-pie-tr">
                    <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-flex>
                <v-card class="mx-auto" max-width="200">
                  <v-img
                    class="justify-center"
                    width="90%"
                    src="//www.nba.com/assets/logos/teams/secondary/web/DEN.svg"
                  ></v-img>
                  <v-card-title class="text-center">
                    Denver Nuggets
                    <br />
                  </v-card-title>
                  <v-card-actions>
                    <router-link to="/team-pie-denver">
                    <v-btn dark color="purple">View Stats</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-col>
          </v-row>
        </panel>
      </v-flex>
      <!-- <v-flex>
          <panel>

          </panel>

        </v-flex>
          <panel>

          </panel>

        <v-flex>
          <panel>

          </panel>
      </v-flex>-->
    </v-layout>
  </div>
</template>

<script>
import Panel from './Panel'

export default {
  components: {
    Panel
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
  background: url("https://wallpaperaccess.com/full/1112642.jpg") no-repeat
    center center;
  background-size: cover;
  /* background-color:;https://50-best.com/wp-content/uploads/2018/12/nba_paint-1024x576.jpg */
  transform: scale(1.1);
}
</style>
