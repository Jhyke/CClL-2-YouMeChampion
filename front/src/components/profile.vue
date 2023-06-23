<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import FriendList from "./friendList.vue";
import SelectChamp from "./selectedChamp.vue";

const loggedIn = ref(null);

onMounted(async () => {
  try {
    // Send a GET request to check if the user is logged in
    const response = await axios.get('http://localhost:3000/', { withCredentials: true });
    loggedIn.value = response.data;
    console.log(loggedIn.value);
  } catch (error) {
    console.error(error);
  }
});

function edit(event) {
  console.log("Edit happened")
  event.preventDefault(); // Prevent the default form submission

  let userId = loggedIn.value.id;

  let data = {
    // Get the values from the input fields
    uname: uname.value,
    posi: posi.value,
    secPosi: secPosi.value,
    ign: ign.value,
    email: email.value,
    pw: pw.value,
    desc: desc.value
  }
  console.log(data);
  // Send a POST request to update the user's profile
  axios.post(`http://localhost:3000/users/${userId}/edit`, data, {
    withCredentials: true,
  })
      .then((response) => {
        // Handle the successful profile update
        console.log("This is before going back to /profile");
        console.log(response.data);
        window.location.href="/profile";
      })
      .catch((error) => {
        // Handle any errors that occurred during the profile update
        console.log("This is inside the catch");
        console.error(error); // Replace with your desired error handling logic
      });
}

function deleteUser(event) {
  console.log("Delete happened")
  let userId = loggedIn.value.id;

  // Send a DELETE request to delete the user's account
  axios.delete(`http://localhost:3000/users/${userId}/delete`, {
    withCredentials: true,
  })
      .then((response) => {
        console.log("This is before going back to /");
        console.log(response.data);
        window.location.href="/";
      })
      .catch((error) => {
        // Handle any errors that occurred during the account deletion
        console.log("This is inside the catch");
        console.error(error);
      });
}

</script>

<template>
  <div v-if="loggedIn">
    <div class="flex justify-center items-center">
      <div class="mainBox">
        <div class="flex gap-4">
          <div class="flex flex-col gap-4 w-1/4">
            <!-- Avatar Text Box -->
            <div class="col-span-1 h-[15rem]">
              <div class="p-4 bg-box h-full rounded">
                <h2 class="text-xl font-bold mb-4">Avatar</h2>
              </div>
            </div>
            <!-- Friends List Box -->
            <div class="col-span-1 h-[34.6rem]">
              <FriendList />
            </div>
          </div>
          <div class="flex flex-col gap-4 w-3/4">
            <!-- News Block Box -->
            <div class="col-span-3 h-[26.8rem]">
              <div class="p-4 bg-box h-full rounded">
                <h2 class="text-xl font-bold mb-4">Profile information</h2>
                <div class="flex justify-end">
                  <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" @click="toggleForm">{{ formVisible ? 'Close Form' : 'Edit Profile' }}</button>
                </div>
                <form v-if="!formVisible">
                  <div class="flex col-span-3">
                    <div class="mb-2 mr-3 w-1/3">
                      <label for="uname" class="block font-bold">Username</label>
                      <span>{{loggedIn.name}}</span>
                    </div>
                    <div class="mb-2 mr-3 w-1/3">
                      <label for="posi" class="block font-bold">Position</label>
                      <span>{{loggedIn.posi}}</span>
                    </div>
                    <div class="mb-2 w-1/3">
                      <label for="secPosi" class="block font-bold">Second Position</label>
                      <span>{{loggedIn.secPosi}}</span>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="mb-2 mr-3 w-1/2">
                      <label for="ign" class="block font-bold">IGN</label>
                      <span>{{loggedIn.ign}}</span>
                    </div>
                    <div class="mb-2 w-1/2">
                      <label for="email" class="block font-bold">Email</label>
                      <span>{{loggedIn.email}}</span>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label for="desc" class="block font-bold">Description</label>
                    <span>{{loggedIn.desc}}</span>
                  </div>
                </form>

                <!--edit form-->
                <form @submit="edit" v-if="formVisible">
                  <div class="flex col-span-3">
                    <div class="mb-1 mr-3 w-1/4">
                      <label for="uname" class="block font-bold">Username</label>
                      <input v-model="uname" id="uname" type="text" class="w-full px-4 py-3 rounded-md"  :placeholder="loggedIn.name">
                    </div>
                    <div class="mb-1 mr-3 w-1/4">
                      <label for="pw" class="block font-bold">Password</label>
                      <input v-model="pw" id="pw" type="password" class="w-full px-4 py-3 rounded-md" placeholder="Enter your new password">
                    </div>
                    <div class="mb-1 mr-3 w-1/4">
                      <label for="posi" class="block font-bold">Position</label>
                      <input v-model="posi" id="posi" type="text" class="w-full px-4 py-3 rounded-md" :placeholder="loggedIn.posi">
                    </div>
                    <div class="mb-1 w-1/4">
                      <label for="secPosi" class="block font-bold">Second Position</label>
                      <input v-model="secPosi" id="secPosi" type="text" class="w-full px-4 py-3 rounded-md" :placeholder="loggedIn.secPosi">
                    </div>
                  </div>
                  <div class="flex">
                    <div class="mb-1 mr-3 w-1/2">
                      <label for="ign" class="block font-bold">IGN</label>
                      <input v-model="ign" id="ign" type="text" class="w-full px-4 py-3 rounded-md" :placeholder="loggedIn.ign">
                    </div>
                    <div class="mb-1 w-1/2">
                      <label for="email" class="block font-bold">Email</label>
                      <input v-model="email" id="email" type="email" class="w-full px-4 py-3 rounded-md" :placeholder="loggedIn.email">
                    </div>
                  </div>
                  <div class="mb-1">
                    <label for="desc" class="block font-bold">Description</label>
                    <textarea v-model="desc" id="desc" class="w-full px-4 py-3 rounded-md" rows="2" :placeholder="loggedIn.desc"></textarea>
                  </div>
                  <div class="flex justify-end">
                    <div class="flex mr-3">
                      <button @click="showAlert" class="bg-btn-del hover:bg-red-900 font-bold py-3 px-6 rounded" type="button">Delete</button>
                    </div>
                    <div class="flex">
                      <button class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded" type="submit">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- Selected Champions Box -->
            <div class="col-span-3 h-[22.8rem]">
              <SelectChamp/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <div class="flex justify-center items-center">
      <div class="max-w-lg p-8 bg-box rounded-lg shadow-lg transform -translate-x-96 translate-y-28">
        <div class="mt-4 text-gray-600">
          You can not go to this page please
          <router-link to="/login" class="text-blue-500 hover:text-blue-600">Login here</router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-if="alertShown" class="fixed inset-0 flex items-center justify-center z-30">
    <div class="bg-box rounded-lg p-8 max-w-sm mx-auto z-31">
      <h2 class="text-xl font-bold mb-4">Confirm Account Deletion</h2>
      <p>Are you sure you want to delete your account?</p>
      <div class="mt-8 flex justify-end">
        <button @click="cancelDeletion" class="bg-btn hover:bg-blue-800 font-bold px-4 py-2 rounded mr-3">
          Cancel
        </button>
        <button @click="deleteUser" class="bg-btn-del hover:bg-red-900 font-bold px-4 py-2 rounded">
          Delete Account
        </button>
      </div>
    </div>
  </div>
  <div v-if="alertShown" class="fixed blur-effect inset-0 z-11"></div>
</template>

<script>
export default {
  name: 'ProfileComponent',
  data() {
    return {
      formVisible: false,
      user: {},
      alertShown: false,
    };
  },
  methods: {
    toggleForm() {
      this.formVisible = !this.formVisible;
    },
    showAlert() {
      this.alertShown = true;
    },
    cancelDeletion() {
      this.alertShown = false;
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
.blur-effect {
  background-color: rgba(40, 40, 40, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>
