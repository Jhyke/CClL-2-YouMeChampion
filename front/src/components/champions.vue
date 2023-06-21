<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import SelectChamp from "./selectedChamp.vue";

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
  <div class="flex justify-center items-center">
    <div class="mainBox">
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
      champions: [],
      championIcons: {}
    };
  },
  mounted() {
    this.getChampions();
  },
  methods: {
    async getChampions() {
      try {
        const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json');
        this.champions = Object.values(response.data.data);
        this.championIcons = response.data.data;
      } catch (error) {
        console.error('Error retrieving champions:', error);
      }
    },
    getChampionIcon(championID) {
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
