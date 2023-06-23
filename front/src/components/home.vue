<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import FriendList from "./friendList.vue"; // Importing the FriendList component
import SelectChamp from "./selectedChamp.vue"; // Importing the SelectChamp component

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
  <div className="flex justify-center items-center">
    <div className="mainBox">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 firstGrid">
        <!-- Welcome Text Box -->
        <div className="col-span-1 h-full">
          <div className="p-4 bg-box h-full rounded">
            <h2 className="text-xl font-bold mb-2">Welcome</h2>
            <p>Discover new champions tailored to your playstyle.
              Expand your skills, make friends, and collaborate on game-winning strategies in lively chat rooms.
              Unleash your full potential and forge unforgettable gaming experiences.
              All with YouMeChampion.</p>
          </div>
        </div>

        <!-- News Block Box -->
        <div className="col-span-2 h-full">
          <div className="p-4 bg-box h-full rounded">
            <h2 className="text-xl font-bold mb-4">Game News</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae odio ut nulla cursus aliquet.</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 secondGrid mt-4">
        <!-- Friends List Box -->
        <div className="col-span-1 h-full">
          <FriendList/> <!-- Rendering the FriendList component -->
        </div>

        <div className="col-span-3 h-full">
          <!-- Selected Champions Box Not loggedIn -->
          <div className="h-[22.8rem]" v-if="!loggedIn">
            <div className="p-4 bg-box h-full rounded">
              <h2 className="text-xl font-bold mb-4">Please log in to select and see your champions</h2>
              <!-- Selected champions content goes here -->
            </div>
          </div>
          <!-- Selected Champions Box -->
          <div className="h-[22.8rem]" v-else>
            <SelectChamp/> <!-- Rendering the SelectChamp component -->
          </div>

          <!-- News Block Box -->
          <div className="md:col-start-2 h-[14.4rem] mt-4">
            <div className="p-4 bg-box h-full rounded">
              <h2 className="text-xl font-bold mb-4">News Block</h2>
              <!-- News block content goes here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
}
</script>

<style scoped>
</style>
