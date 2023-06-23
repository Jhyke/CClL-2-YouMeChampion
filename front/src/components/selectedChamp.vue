<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import axios from 'axios'

const loggedIn = ref(null); // Stores the logged-in user data
const champUrl = "http://localhost:5173/champions"; // URL for champion data
const currUrl = window.location.href; // Current URL of the page

// const emit = defineEmits({
//   chatID: ({friendID}) => {
//     return friendID
//   }
// })

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', { withCredentials: true });
    loggedIn.value = response.data; // Assigns the logged-in user data to loggedIn variable
    console.log(loggedIn.value);
    await getSelChampion(); // Calls the function to get selected champion data
  } catch (error) {
    console.log(error);
  }
});

const selChamps = ref(null); // Stores the selected champion data
const champDet = ref(null); // Stores the details of a champion

async function getSelChampion() {
  try {
    const response = await axios.get('http://localhost:3000/champions/selChampion', { withCredentials: true });
    selChamps.value = response.data; // Assigns the selected champion data to selChamps variable
    console.log(selChamps.value);
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="p-4 bg-box h-full rounded overflow-y-auto no-scrollbar">
    <h2 class="text-xl font-bold mb-4 sticky bg-title top-0 z-20">Selected Champions</h2>
    <div class="flex h-full overflow-y-auto no-scrollbar" v-if="loggedIn">
      <div class="h-full w-full" v-if="currUrl === champUrl">
        <div class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <template v-if="selChamps" v-for="selChamp in selChamps">
            <div class="px-3 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors mr-2 mb-2">
              <div class="flex items-center">
                <img :src="`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${selChamp.championID}.png`" class="h-20 w-20" alt="Champion Icon">
                <div class="flex flex-col ml-3">
                  <span class="font-bold">{{ selChamp.championID }}</span>
                  <span class="font-bold">{{ selChamp.userChampionPos }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="h-full w-full" v-else>
        <div class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <template v-if="selChamps" v-for="selChamp in selChamps">
            <div class="px-3 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors mr-2 mb-2">
              <div class="flex items-center">
                <img :src="`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${selChamp.championID}.png`" class="h-20 w-20" alt="Champion Icon">
                <div class="flex flex-col ml-3">
                  <span class="font-bold">{{ selChamp.championID }}</span>
                  <span class="font-bold">{{ selChamp.userChampionPos }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Please log in to see your friends</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectChampComponent',
};
</script>

<style scoped>

</style>
