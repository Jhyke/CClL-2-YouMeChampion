<script setup>

</script>

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
        <li>
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>
