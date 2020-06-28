<template>
<div >
<span class="bg"></span>
    <v-app >
        <v-layout align="start" justify-start>
            <v-flex xs6 offset-xs3>
                <panel title="About">
                  <!-- <h1>Motivația </h1> -->
                  <br>
                  <p>
                    NBA-App este o aplicație web, care are scopul de a monitoriza sportivii de performanță -respectiv jucătorii profesioniști de baschet. Datorită faptului ca este o aplicatie web, poate fi accesată de către orice utilizator, indiferent de sistemul de operare sau dispozitiv, atâta timp cât acestea îndeplinesc conditii minime – conexiune la internet si suport pentru browser.
                    </p>
                    <p>
                      Aplicația web aleasă poate fi un instrument util atât pentru specialiștii domeniului și pentru pasionații de baschet, cât si pentru practicanții amatori ai acestui sport ori de iubitorii de sport care vor să descopere informații captivante și detalii despre jucători, merciuri, echipe si statistici ale acestui sport.
                    </p>
                    <p>
                      Am ales aceast proiect, deoarece și eu sunt unul dintre pasionații de baschet, sport care din păcate, nu este foarte popular în țara noastră. Am utilizat tehnologiile web pentru a oferi posibilitatea tuturor celor interesați, să vizualizeze date, informații și statistici legate de baschet, într-o maniera simplă, cu o interfață  grafică intuitivă, care oferă o accesibilitate ușoară.
                    </p>
                </panel>
            </v-flex>
        </v-layout>
    </v-app>
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
/* .fundal{
  background-color: aquamarine;
} */
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://50-best.com/wp-content/uploads/2018/12/nba_paint-1024x576.jpg') no-repeat center center;
    background-size: cover;
    /* background-color:; */
    transform: scale(1.1);
  }
  p {
  font-family: "Playfair Display";
  font-size: 22px;
}
</style>
