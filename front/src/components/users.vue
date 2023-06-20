<script setup>
import FriendList from "./friendList.vue";
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from "vue-router";

const loggedIn = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/', {withCredentials: true});
    loggedIn.value = response.data;
    getUsers();
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});
const users = ref(null);
async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users/');
    users.value = response.data;
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
}
async function addFriend(friendID){
  try {
    console.log(`${friendID}` + ` ${loggedIn.value.id}`)
    const response = await axios.post(`http://localhost:3000/users/${loggedIn.value.id}/addFriend`, {friendID:`${friendID}`}).then(res => {});
    router.go();
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="mainBox">
      <div v-if="loggedIn">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 firstGrid">
          <div class="col-span-1 h-full">
            <FriendList />
          </div>
          <!-- UsersList Box -->
          <div class="col-span-3 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">All users</h2>
              <div class="md:grid-cols-4 w-1/2">
                <ul class="col-span-2 h-full">
                  <li v-for="user in users" class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors" :key="user.userID">
                    <div class="flex items-center">
                      <p>{{ user.userName }}</p>
                      <p class="text-bg-tertiary text-sm">#{{ user.userID }}</p>
                      <button @click="addFriend(user.userID)" class="bg-btn hover:bg-blue-800 font-bold py-1 px-2 rounded ml-auto">Add Friend</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 firstGrid">
          <!-- UsersList Box -->
          <div class="col-span-4 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">All users</h2>
              <div class="md:grid-cols-4 w-1/2">
                <ul class="col-span-2 h-full">
                  <li v-for="user in users" class="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition-colors" :key="user.userID">
                    <div class="flex items-center">
                      <p>{{ user.userName }}</p>
                      <p class="text-bg-tertiary text-sm">#{{ user.userID }}</p>
                    </div>
                  </li>
                </ul>
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
  name: 'UsersComponent',
};
</script>

<style scoped>
.firstGrid{
  height: 50vh;
}

</style>
