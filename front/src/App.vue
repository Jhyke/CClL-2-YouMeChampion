<script setup>
import Nav from "./components/nav.vue";
import {ref, onMounted} from 'vue'
import axios from 'axios'

const logedIn = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    logedIn.value = response.data;
    console.log(logedIn.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="title">
    <h1 class="text-4xl">YouMeChampion</h1>
  </div>
  <Nav :logedIn="logedIn"/>
  <RouterView :logedIn="logedIn"/>
</template>

<style scoped>

</style>
