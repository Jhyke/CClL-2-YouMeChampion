<template>
  <div class="flex justify-center items-center">
    <div class="loginBox flex justify-center items-center">
      <div class="max-w-lg p-8 bg-card rounded-lg shadow-lg transform -translate-x-96 translate-y-40">
        <h2 class="text-3xl font-bold mb-6">Login</h2>
        <form>
          <div class="mb-6">
            <label for="uname" class="block font-bold mb-2">Username</label>
            <input id="uname" type="text" class="w-full px-4 py-3  rounded-md" placeholder="Enter your username">
          </div>
          <div class="mb-6">
            <label for="password" class="block font-bold mb-2">Password</label>
            <input id="password" type="password" class="w-full px-4 py-3 rounded-md" placeholder="Enter your password">
          </div>
          <div class="flex justify-end">
            <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" type="submit">Login</button>
          </div>
        </form>
        <div class="mt-4 text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:text-blue-600">Register here</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
}
</script>

<style scoped>
@media (max-width: 1440px) {
  .transform {
    transform: none;
  }
}
</style>
