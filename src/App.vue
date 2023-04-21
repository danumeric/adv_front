<template>
  <router-view />
</template>

<style lang="scss">
@import '@/scss/null.scss';
@import '@/scss/container.scss';
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  background: #e2e1e1;
  min-height: 100vh;
  overflow-y: hidden;
  font-size: 0.75rem;
  line-height: 125%;
  font-family: 'Inter', Arial, sans-serif;
}
</style>
<script setup lang="ts">
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
</script>
