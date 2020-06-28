<template>
<v-app>
  <div class="white elevation-5">
      <v-app-bar fluid dense class="" color="#01579B" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="action" />
      </v-app-bar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</v-app>
</template>

<script>
import { mdiPlusThick } from '@mdi/js'
export default {
  data: () => ({
    svgPath: mdiPlusThick
  }),
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
