<script setup>
import Nav from "./components/nav.vue";
import {ref, onMounted} from 'vue'
import axios from 'axios'

const loggedIn = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    loggedIn.value = response.data;
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="title">
    <h1 class="text-4xl">YouMeChampion</h1>
  </div>
  <Nav :loggedIn="loggedIn"/>
  <RouterView :loggedIn="loggedIn"/>
</template>

<style scoped>

</style>
