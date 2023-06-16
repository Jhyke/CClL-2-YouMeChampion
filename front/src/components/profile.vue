<template>
  <div v-if="loggedIn">
    <div class="flex justify-center items-center">
      <div class="mainBox">
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

                <!--edit form-->
                <form @submit="edit" v-if="formVisible">
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
  <div v-else class="flex justify-center items-center">
    <div class="flex justify-center items-center">
      <div class="max-w-lg p-8 bg-gray-200 rounded-lg shadow-lg transform -translate-x-96 translate-y-28">
        <div class="mt-4 text-gray-600">
          You can not go to this page please
          <router-link to="/login" class="text-blue-500 hover:text-blue-600">Login here</router-link>
        </div>
      </div>
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
    },
    edit(event) {
      console.log("Edit happened")
      event.preventDefault(); // Prevent the default form submission

      let userId = this.loggedIn.id;

      let data = {
        uname: this.uname,
        email: this.email,
        pw: this.pw,
        desc: this.desc
      }
      // Send a POST request to your backend API with the edit credentials
      axios.post(`http://localhost:3000/users/${userId}/edit`, data, {
        withCredentials: true,
      })
          .then((response) => {
            // Handle the successful login response
            console.log("This is before going back to /profile");
            console.log(response.data);
            window.location.href="/profile";
          })
          .catch((error) => {
            // Handle any errors that occurred during login
            console.log("This is inside the catch");
            console.error(error); // Replace with your desired error handling logic
          });
    },
  }
};
</script>

<style scoped>
@media (max-width: 1440px) {
  .transform {
    transform: none;
  }
}
</style>
