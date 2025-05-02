<template>
  <div>
    <h1>{{ a }}</h1>
    <input type="text" v-model="a">
  </div>
</template>

<script lang="ts">
import { ref,defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const a = ref('123');
    
    return {
      a
    }
  }
})
</script>

<style scoped>
</style>