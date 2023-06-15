<template>
  <div v-if="loggedIn">
    <div class="flex justify-center items-center">
      <div class="profileBox">
        <div class="flex gap-4">
          <div class="flex flex-col gap-4 w-1/4">
            <!-- Avatar Text Box -->
            <div class="col-span-1 h-[25rem]">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Avatar</h2>
              </div>
            </div>
            <!-- Friends List Box -->
            <div class="col-span-1 h-full">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Friends List</h2>
                <!-- Friends list content goes here -->
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 w-3/4">
            <!-- News Block Box -->
            <div class="col-span-3 h-[26.8rem]">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Profile information</h2>
                <div class="flex justify-end">
                  <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" @click="toggleForm">{{ formVisible ? 'Close Form' : 'Edit Profile' }}</button>
                </div>
                <form v-if="!formVisible">
                  <div class="flex col-span-3">
                    <div class="mb-3 mr-3 w-1/4">
                      <label for="uname" class="block font-bold mb-2">Username</label>
                      <span>{{loggedIn.name}}</span>
                    </div>
                    <div class="mb-3 w-1/2">
                      <label for="email" class="block font-bold mb-2">Email</label>
                      <span>{{loggedIn.email}}</span>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label for="desc" class="block font-bold mb-2">Description</label>
                    <span>{{loggedIn.desc}}</span>
                  </div>
                </form>

                <!--              edit form-->
                <form @submit="updateProfile" v-if="formVisible">
                  <div class="flex col-span-3">
                    <div class="mb-3 mr-3 w-1/4">
                      <label for="uname" class="block font-bold mb-2">Username</label>
                      <input v-model="uname" id="uname" type="text" class="w-full px-4 py-3 rounded-md"  :placeholder="loggedIn.name">
                    </div>
                    <div class="mb-3 mr-3 w-1/4">
                      <label for="pw" class="block font-bold mb-2">Password</label>
                      <input v-model="pw" id="pw" type="password" class="w-full px-4 py-3 rounded-md" placeholder="Enter your new password">
                    </div>
                    <div class="mb-3 w-1/2">
                      <label for="email" class="block font-bold mb-2">Email</label>
                      <input v-model="email" id="email" type="email" class="w-full px-4 py-3 rounded-md" :placeholder="loggedIn.email">
                    </div>
                  </div>
                  <div class="mb-2">
                    <label for="desc" class="block font-bold mb-2">Description</label>
                    <textarea v-model="desc" id="desc" class="w-full px-4 py-3 rounded-md" rows="4" :placeholder="loggedIn.desc"></textarea>
                  </div>
                  <div class="flex justify-end">
                    <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
            <!-- Selected Champions Box -->
            <div class="col-span-3 h-[22.8rem]">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Selected Champions</h2>
                <!-- Selected champions content goes here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex ml-3">
      <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" @click="backHome">{{ formVisible ? 'Close Form' : 'Edit Profile' }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ProfileComponent',
  props: ["loggedIn"],
  data() {
    return {
      formVisible: false,
      user: {},
    };
  },
  methods: {
    toggleForm() {
      this.formVisible = !this.formVisible;
    },
    backHome(){
      window.location.href="/"
    }
  }
};
</script>

<style scoped>
@media (max-width: 1440px) {
  .transform {
    transform: none;
  }
}
.profileBox{
  max-height: 88.2vh;
  width: 80vw;
}
</style>
