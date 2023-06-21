<script setup>
import {ref, onMounted, defineEmits} from 'vue'
import axios from 'axios'

const loggedIn = ref(null);
const champUrl = "http://localhost:5173/champions";
const currUrl = window.location.href;

// const emit = defineEmits({
//   chatID: ({friendID}) => {
//     return friendID
//   }
// })

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    loggedIn.value = response.data;
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});

const champs = ref(null);

function sendChampID(ID) {
  console.log("ID from sendChatID " + ID)
  emit('champID', {ID});
}

</script>
<template>
  <div class="p-4 bg-box h-full rounded">
    <h2 class="text-xl font-bold mb-4">Selected Champions</h2>
    <div class="flex h-full overflow-y-auto no-scrollbar" v-if="loggedIn">
      <div class="h-full w-full" v-if="currUrl === champUrl">
        <p>Ello on champUrl</p>
      </div>
      <div class="h-full w-full" v-else>
        <p>Ello</p>
      </div>
    </div>
    <div v-else>
      <p>Pleas log in to see your friends</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectChampComponent',
  methods: {
  }
};
</script>

<style scoped>

</style>