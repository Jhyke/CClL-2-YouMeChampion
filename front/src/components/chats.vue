<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import FriendList from "./friendList.vue";

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
</script>
<template>
  <div class="flex justify-center items-center">
    <div class="mainBox">
      <div v-if="loggedIn">
        <div class="flex gap-4">
          <div class="flex flex-col gap-4 w-1/4">
            <!-- Friends Text Box -->
            <div class="col-span-1 h-[25rem]">
              <div class="h-full">
                <FriendList />
              </div>
            </div>
            <!-- Public List Box -->
            <div class="col-span-1 h-[24rem]">
              <div class="bg-box h-full py-3">
                <div class="p-4 h-full overflow-y-auto rounded no-scrollbar">
                  <h2 class="text-xl font-bold mb-4 sticky -top-4 bg-box">Public List</h2>
                  <div @click="roomChange('all')" class="flex bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">All lanes</a>
                  </div>
                  <div @click="roomChange('top')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">Top lane</a>
                  </div>
                  <div @click="roomChange('jungle')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">Jungle lane</a>
                  </div>
                  <div @click="roomChange('mid')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">Mid lane</a>
                  </div>
                  <div @click="roomChange('bot')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">Bot lane</a>
                  </div>
                  <div @click="roomChange('support')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <a class="ml-2 text-xl">Support lane</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 w-3/4">
            <!-- msgs Box -->
            <div class="col-span-3 h-full">
              <div class="p-4 bg-box h-full rounded">
                <h2 class="text-xl font-bold mb-4">Chat</h2>
                <div id="chat-window" class="bg-gray-300 max-h-[30rem] min-h-[30rem] overflow-y-auto no-scrollbar mb-3 rounded">
                  <div id="chat-messages" class="p-4 h-full">

                  </div>
                </div>
                <div id="chat-user-input" class="padding transparent flex">
                  <textarea id="message" class="w-full px-4 py-3 mr-3 rounded-md" rows="1" placeholder="Type your message"></textarea>
                  <button @click="sendMyMessage" class="bg-btn hover:bg-blue-800 font-bold py-3 px-6 rounded">SEND</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3 firstGrid">
          <!-- public List Box -->
          <div class="col-span-1 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">Public List</h2>
              <div class="flex bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">All lanes</a>
              </div>
              <div class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">Top lane</a>
              </div>
              <div class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">Jungle lane</a>
              </div>
              <div class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">Mid lane</a>
              </div>
              <div class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">Bot lane</a>
              </div>
              <div class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                <a class="ml-2 text-xl">Support lane</a>
              </div>
            </div>
          </div>
          <!-- msgs Box -->
          <div class="col-span-3 h-full">
            <div class="p-4 bg-box h-full rounded">
              <h2 class="text-xl font-bold mb-4">Chat</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  data() {
    return {
      curUser: "",
      curRoom: "",
    };
  },
  methods: {
    sendMyMessage() {
      console.log("sendMyMessage triggered");
      console.log("curRoom number: " + this.curRoom);
      const text = document.getElementById("message").value;
      let message = {
        room: this.curRoom,
        name: this.loggedIn.name,
        message: text,
      };
      document.getElementById("message").value = "";
      if (text) {
        console.log(message);
        this.connection.send(JSON.stringify(message));
      }
    },
    addTextMessage(message) {
      let element = document.createElement("div");
      element.classList = "flex";
      let h4 = document.createElement("h4");
      h4.innerHTML = message.name;
      let text = document.createTextNode(": " + message.message);
      console.log(message.message);
      element.appendChild(h4);
      element.appendChild(text);
      document.getElementById("chat-messages").appendChild(element);
    },
    roomChange(roomName){
      switch (roomName){
        case "all":
          this.curRoom = "1";
          this.connectRoom();
          break;
        case "top":
          this.curRoom = "2";
          this.connectRoom();
          break;
        case "jungle":
          this.curRoom = "3";
          this.connectRoom();
          break;
        case "mid":
          this.curRoom = "4";
          this.connectRoom();
          break;
        case "bot":
          this.curRoom = "5";
          this.connectRoom();
          break;
        case "support":
          this.curRoom = "6";
          this.connectRoom();
          break;
      }
    },
    connectRoom(){
      this.connection.send(JSON.stringify({joinRoom: this.curRoom}));
      document.getElementById("chat-messages").innerHTML = "";
      let message = {
        room: this.curRoom,
        name: "Server",
        message: "Your a connected to room: " + this.curRoom,
      };
      this.addTextMessage(message)
    },
  },created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8080");

    this.connection.onmessage = (event) => {
      this.addTextMessage(JSON.parse(event.data));
    };

    this.connection.onopen = (event) => {
      console.log('websocket is connected ...')
      this.connection.send(JSON.stringify({
        name: "Server",
        room: this.curRoom,
        message: 'connected to: ' + this.curRoom,
      }))
    };
  }
};
</script>

<style scoped>
.firstGrid{
  height: 88vh;
}
</style>
