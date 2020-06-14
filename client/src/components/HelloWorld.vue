<template>
<div class="fundal">
  <v-row
        align="start"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1>Welcome to NBA-App</h1>
          <!-- <h4 class="subheading">Build your application today!</h4> -->
        </v-col>
      </v-row>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fundal{
  background-image: url("https://www.wallpaperback.net/wp-content/uploads/2018/06/Wallpaper%20NBA,%20basketball,%20the%20ball%20in%20the%20basket,%20Sport%205130517140.jpg");
  height: 1080px;
  /* width: 1920px; */
  background-color: black;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
