<script setup>
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
  <div class="flex justify-center items-center">
    <div v-if="champDet.image" class="p-4 mainBox">
      <div class="flex firstGrid bg-box">
        <div class="flex flex-col w-1/5">
          <div class="p-4">
            <h2 class="text-2xl font-bold mb-4">{{ champDet.name }}</h2>
            <img :src="`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champDet.image.full}`" class="w-[80%] rounded-md mb-4" alt="Champion Icon">
            <div>
              <h3 class="text-lg font-bold mb-2">Some of the most important details:</h3>
              <ul class="list-disc pl-6">
                <li><span class="font-bold">Attack:</span> {{ champDet.info.attack }}</li>
                <li><span class="font-bold">Defense:</span> {{ champDet.info.defense }}</li>
                <li><span class="font-bold">Magic:</span> {{ champDet.info.magic }}</li>
                <li><span class="font-bold">Difficulty:</span> {{ champDet.info.difficulty }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="p-4 flex flex-col w-4/5">
          <p class="text-xl font-bold mb-2">{{ champDet.title }}</p>
          <p class="text-base">{{ champDet.lore }}</p>
          <div class="mt-4">
            <h3 class="text-lg font-bold mb-2">Playstyle tags:</h3>
            <ul class="list-disc pl-6">
              <li><span class="font-bold">Main:</span> {{ champDet.tags[0] }}</li>
              <li><span class="font-bold">Secondary:</span> {{ champDet.tags[1] }}</li>
            </ul>
          </div>
          <div class="p-4 flex flex-col">
            <h3 class="text-lg font-bold mb-2 mt-4">Abilities:</h3>
            <div class="flex w-full">
              <div class="flex flex-col items-center w-1/5 mr-2">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/passive/${champDet.passive.image.full}`" class="mb-4" alt="Champion passive Icon">
                <span class="font-bold">Passive: {{ champDet.passive.name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5 mr-2">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${champDet.spells[0].image.full}`" class="mb-4" alt="Champion Q Icon">
                <span class="font-bold">Q: {{ champDet.spells[0].name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5 mr-2">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${champDet.spells[1].image.full}`" class="mb-4" alt="Champion W Icon">
                <span class="font-bold">W: {{ champDet.spells[1].name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5 mr-2">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${champDet.spells[2].image.full}`" class=" mb-4" alt="Champion E Icon">
                <span class="font-bold">E: {{ champDet.spells[2].name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${champDet.spells[3].image.full}`" class="mb-4" alt="Champion R Icon">
                <span class="font-bold">R: {{ champDet.spells[3].name }}</span>
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
  name: 'ChampionDetailsComponent',
  props: ["championID"],
  data() {
    return {
      champDet: [],
      championIcons: {} // Add this line to define the championIcons data property
    };
  },
  mounted() {
    this.getChampDet();
  },
  methods: {
    async getChampDet() {
      try {
        const championID = this.$route.params.championID;
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion/${championID}.json`);
        this.champDet = response.data.data[championID];
        console.log(this.champDet)
      } catch (error) {
        console.error('Error retrieving champion details:', error);
      }
    },
  }
};
</script>


<style scoped>
/* Styling for champion details page */
</style>
