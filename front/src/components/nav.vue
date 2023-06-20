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

function logout() {
  console.log("Logout happened")

  axios.get('http://localhost:3000/logout', {
    withCredentials: true,
  })
      .then((response) => {
        // Handle the successful login response
        console.log(response.data);
        window.location.href="/";
      })
      .catch((error) => {
        // Handle any errors that occurred during login
        console.error(error); // Replace with your desired error handling logic
      });
}
</script>
<template>
  <div class="navbar">
    <div class="flex-1">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">Home</router-link>
      <a class="btn btn-ghost normal-case text-xl">News</a>
      <router-link class="btn btn-ghost normal-case text-xl" to="/champions">Champions</router-link>
      <a class="btn btn-ghost normal-case text-xl">MostPLayed</a>
      <a v-if="loggedIn" class="btn btn-ghost normal-case text-xl">Suggestions</a>
      <router-link class="btn btn-ghost normal-case text-xl" to="/chats">Chats</router-link>
    </div>
    <div class="flex-none gap-2 dropdown dropdown-end ">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="../images/profile.png" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li v-if="loggedIn">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
        <li v-if="loggedIn">
          <a v-on:click="logout">Logout</a>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
};
</script>


<style scoped>
.navbar{
  background-color: #0A323C;
}
</style>
