<template>
  <div class="flex justify-center items-center">
    <div class="mainBox">
      <div v-if="loggedIn">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 firstGrid">
          <div class="col-span-1 h-full">
            <div class="p-4 bg-gray-200 h-full rounded">
              <h2 class="text-xl font-bold mb-4">FriendList</h2>
            </div>
          </div>
          <!-- UsersList Box -->
          <div class="col-span-3 h-full">
            <div class="p-4 bg-gray-200 h-full rounded">
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
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 firstGrid">
          <!-- UsersList Box -->
          <div class="col-span-4 h-full">
            <div class="p-4 bg-gray-200 h-full rounded">
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
  props: ["loggedIn"],
  data() {
    return {
      users: {},
    };
  },mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users/');
        this.users = response.data;
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    }
  }
};
</script>

<style scoped>
.firstGrid{
  height: 50vh;
}

</style>
