<template>
  <div class="navbar relative">
    <div class="flex-1">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">Home</router-link>
      <a class="btn btn-ghost normal-case text-xl">News</a>
      <a class="btn btn-ghost normal-case text-xl">Champions</a>
      <a class="btn btn-ghost normal-case text-xl">MostPLayed</a>
      <a class="btn btn-ghost normal-case text-xl">Suggestions</a>
      <a class="btn btn-ghost normal-case text-xl">Chats</a>
    </div>
    <div class="flex-none gap-2 dropdown dropdown-end ">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="../images/profile.png" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="!logedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-else>
          <a v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginComponent',
  props: ["logedIn"],
  data() {
    return {
      user: {},
    };
  },
  methods: {
    logout() {
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
    },
  },
};
</script>


<style scoped>

</style>
