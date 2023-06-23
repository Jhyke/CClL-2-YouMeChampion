<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import SelectChamp from "./selectedChamp.vue";

// Create a reactive variable to track the login status
const loggedIn = ref(null);

// Perform an action when the component is mounted
onMounted(async () => {
  try {
    // Make a GET request to the server to check if the user is logged in
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    loggedIn.value = response.data; // Update the login status based on the response
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="mainBox">
      <!-- Content for logged-in users -->
      <div v-if="loggedIn">
        <div class="firstGrid">
          <div class="col-span-5 h-full">
            <SelectChamp/>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
          <!-- Champions List Box -->
          <div class="col-span-5 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">All champions</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <template v-for="(champ, key) in champions" :key="key">
                  <button @click="viewChampionDetails(champ.id)">
                    <div class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors rounded">
                      <div class="flex items-center">
                        <img :src="getChampionIcon(champ.id)" class="mr-3 w-20 h-20" alt="Champion Icon">
                        <div>
                          <p class="text-xl font-bold">{{ champ.name }}</p>
                          <p class="text-base">{{ champ.title }}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Content for non-logged-in users -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
          <!-- Champions List Box -->
          <div class="col-span-5 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">All champions</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <template v-for="(champ, key) in champions" :key="key">
                  <button @click="viewChampionDetails(champ.id)">
                    <div class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors rounded">
                      <div class="flex items-center">
                        <img :src="getChampionIcon(champ.id)" class="mr-3 w-20 h-20" alt="Champion Icon">
                        <div>
                          <p class="text-xl font-bold">{{ champ.name }}</p>
                          <p class="text-base">{{ champ.title }}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ChampionsComponent',
  data() {
    return {
      champions: [], // Array to store the champion data
      championIcons: {} // Object to store the champion icons
    };
  },
  mounted() {
    this.getChampions(); // Fetch the champion data when the component is mounted
  },
  methods: {
    async getChampions() {
      try {
        // Make a GET request to retrieve the champion data from the server
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json');
        this.champions = Object.values(response.data.data); // Update the array with the champion data
        this.championIcons = response.data.data; // Update the object with the champion icons
      } catch (error) {
        console.error('Error retrieving champions:', error);
      }
    },
    getChampionIcon(championID) {
      // Get the URL of the champion icon based on the champion ID
      return `https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${this.championIcons[championID].image.full}`;
    },
    viewChampionDetails(championID) {
      // Navigate to the champion details page using the router or any other navigation method
      this.$router.push({ name: 'ChampionsDetail', params: { championID } })
    },
  },
};
</script>

<style scoped>
.firstGrid {
  height: 22.8rem;
}
</style>
