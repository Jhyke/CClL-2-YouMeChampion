<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import FriendList from "./friendList.vue";

const loggedIn = ref(null);
const connection = ref(null);
const curRoom = ref(null);

onMounted(async () => {
  try {
    // Make a GET request to retrieve user login status
    const response = await axios.get('http://localhost:3000/', { withCredentials: true });
    loggedIn.value = response.data;
    console.log(loggedIn.value);

    console.log("Starting connection to WebSocket Server");
    // Create a WebSocket connection to the server
    connection.value = new WebSocket("ws://localhost:8080");

    // Event listener for incoming messages from the WebSocket server
    connection.value.onmessage = (event) => {
      addTextMessage(JSON.parse(event.data));
    };

    // Event listener for successful WebSocket connection
    connection.value.onopen = (event) => {
      console.log('websocket is connected ...')
      // Send a message to the server indicating the current room
      connection.value.send(JSON.stringify({
        name: "Server",
        room: curRoom.value,
        message: 'connected to: ' + curRoom.value,
      }))
    };
  } catch (error) {
    console.error(error);
  }
});

function sendMyMessage() {
  console.log("sendMyMessage triggered");
  console.log("curRoom number: " + curRoom.value);
  const text = document.getElementById("message").value;
  let message = {
    room: curRoom.value,
    name: loggedIn.value.name,
    message: text,
  };
  document.getElementById("message").value = "";
  if (text) {
    console.log(message);
    // Send the message via WebSocket connection
    connection.value.send(JSON.stringify(message));
  }
}

function addTextMessage(message) {
  let element = document.createElement("div");
  element.classList = "flex";
  let h4 = document.createElement("h4");
  h4.innerHTML = message.name;
  let text = document.createTextNode(": " + message.message);
  console.log(message.message);
  element.appendChild(h4);
  element.appendChild(text);
  document.getElementById("chat-messages").appendChild(element);
}

function roomChange(roomName){
  switch (roomName){
    case "all":
      curRoom.value = "1";
      connectRoom(curRoom.value);
      break;
    case "top":
      curRoom.value = "2";
      connectRoom(curRoom.value);
      break;
    case "jungle":
      curRoom.value = "3";
      connectRoom(curRoom.value);
      break;
    case "mid":
      curRoom.value = "4";
      connectRoom(curRoom.value);
      break;
    case "bot":
      curRoom.value = "5";
      connectRoom(curRoom.value);
      break;
    case "support":
      curRoom.value = "6";
      connectRoom(curRoom.value);
      break;
  }
}
function connectRoom(roomID){
  connection.value.send(JSON.stringify({joinRoom: roomID}));
  document.getElementById("chat-messages").innerHTML = "";
  let message = {
    room: roomID,
    name: "Server",
    message: "You are connected to room: " + roomID,
  };
  addTextMessage(message)
}

function handleChatID (chatID) {
  curRoom.value = chatID.ID.toString();
  connectRoom(curRoom.value)
}
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
                <FriendList @chatID="handleChatID"/>
              </div>
            </div>
            <!-- Public List Box -->
            <div class="col-span-1 h-[24rem]">
              <div class="bg-box h-full py-3">
                <div class="p-4 h-full overflow-y-auto rounded no-scrollbar">
                  <h2 class="text-xl font-bold mb-4 sticky -top-4 bg-box">Public List</h2>
                  <!-- Room selection buttons -->
                  <div @click="roomChange('all')" class="flex bg-gray-300 rounded btn-ghost h-[4rem] w-full place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">All lanes</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#1</span>
                    </div>
                  </div>
                  <!-- More room selection buttons -->
                  <div @click="roomChange('top')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">Top</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#2</span>
                    </div>
                  </div>
                  <div @click="roomChange('jungle')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">Jungle</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#3</span>
                    </div>
                  </div>
                  <div @click="roomChange('mid')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">Mid</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#4</span>
                    </div>
                  </div>
                  <div @click="roomChange('bot')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">Bottom</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#5</span>
                    </div>
                  </div>
                  <div @click="roomChange('support')" class="flex mt-3 bg-gray-300 rounded btn-ghost h-[4rem] place-items-center">
                    <div class="w-full">
                      <a class="ml-2 text-xl">Supports</a>
                    </div>
                    <div class="flex justify-end w-full mr-3">
                      <span>#6</span>
                    </div>
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
                <!-- Chat window -->
                <div id="chat-window" class="bg-gray-300 max-h-[30rem] min-h-[30rem] overflow-y-auto no-scrollbar mb-3 rounded">
                  <!-- Chat messages -->
                  <div id="chat-messages" class="p-4 h-full"></div>
                </div>
                <!-- Chat user input -->
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
              <!-- Room selection buttons -->
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
  name: 'ChatComponent'
}
</script>

<style scoped>
.firstGrid {
  height: 88vh;
}
</style>
