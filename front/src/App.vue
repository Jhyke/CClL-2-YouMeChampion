<script setup>
import Nav from "./components/nav.vue";

</script>

<template>
  <div class="title">
    <h1 class="text-4xl">YouMeChampion</h1>
  </div>
  <div class="sticky top-0 z-20">
    <Nav/>
  </div>
  <RouterView/>
</template>

<style scoped>

</style>
