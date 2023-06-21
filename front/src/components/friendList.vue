<script setup>
import {ref, onMounted, defineEmits} from 'vue'
import axios from 'axios'

const loggedIn = ref(null);
const chatUrl = "http://localhost:5173/chats";
const currUrl = window.location.href;

const emit = defineEmits({
  chatID: ({friendID}) => {
    return friendID
  }
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    loggedIn.value = response.data;
    getFriends(loggedIn.value.id);
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});
const friends = ref(null);
async function getFriends(id) {
  try {
    const response = await axios.get(`http://localhost:3000/users/${id}/friendList`);
    friends.value = response.data;
    console.log(friends.value)
  } catch (error) {
    console.error('Error retrieving friends:', error);
  }
}

function sendChatID(ID) {
  console.log("ID from sendChatID " + ID)
  emit('chatID', {ID});
}

</script>
<template>
  <div class="p-4 bg-box h-full rounded">
    <h2 class="text-xl font-bold mb-2 sticky">FriendList</h2>
    <div class="flex h-full overflow-y-auto no-scrollbar" v-if="loggedIn">
      <ul class="h-full w-full" v-if="currUrl === chatUrl">
        <li v-for="friend in friends" class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors" :key="friend.userID">
          <div class="flex items-center">
            <p>{{ friend.userName }}</p>
            <p class="text-bg-tertiary text-sm">#{{ friend.userID }}</p>
            <button @click="sendChatID(friend.userFriendID + 10)" class="bg-btn hover:bg-blue-800 font-bold py-1 px-2 rounded ml-auto"> Chat</button>
          </div>
        </li>
      </ul>
      <ul class="h-full w-full" v-else>
        <li v-for="friend in friends" class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors" :key="friend.userID">
          <div class="flex items-center">
            <p>{{ friend.userName }}</p>
            <p class="text-bg-tertiary text-sm">#{{ friend.userID }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Pleas log in to see your friends</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendListComponent',
  methods: {
  }
};
</script>

<style scoped>

</style>