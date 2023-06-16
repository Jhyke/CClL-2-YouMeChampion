<template>
  <div class="flex justify-center items-center">
    <div class="mainBox">
      <div v-if="loggedIn">
        <div class="flex gap-4">
          <div class="flex flex-col gap-4 w-1/4">
            <!-- Friends Text Box -->
            <div class="col-span-1 h-[25rem]">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Friends List</h2>
              </div>
            </div>
            <!-- Public List Box -->
            <div class="col-span-1 h-[24rem]">
              <div class="bg-gray-200 h-full py-3">
                <div class="p-4 h-full overflow-y-auto rounded no-scrollbar">
                  <h2 class="text-xl font-bold mb-4 sticky -top-4 bg-gray-200">Public List</h2>
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
            </div>
          </div>
          <div class="flex flex-col gap-4 w-3/4">
            <!-- msgs Box -->
            <div class="col-span-3 h-full">
              <div class="p-4 bg-gray-200 h-full rounded">
                <h2 class="text-xl font-bold mb-4">Chat</h2>
                <div id="chat-window" class="bg-gray-300 max-h-[30rem] min-h-[30rem] overflow-y-auto no-scrollbar">
                  <div id="chat-messages" class="p-4 h-full">

                  </div>
                </div>
                <div id="chat-user-input" class="padding transparent">
                  <textarea id="message"></textarea>
                  <button @click="sendMyMessage" class="button" style="font-size: 1.5rem">SEND</button>
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
            <div class="p-4 bg-gray-200 h-full rounded">
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
            <div class="p-4 bg-gray-200 h-full rounded">
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
  props: ["loggedIn"],
  data() {
    return {
      users: {},
      curRoom: "",
    };
  },
  methods: {
    sendMyMessage() {
      console.log("sendMyMessage triggered");
      const room = '1';
      const text = document.getElementById("message").value;
      let message = {
        room: room,
        name: "Guest",
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
      element.style = "display: flex; gap: 0.5rem; align-items: center";
      let h4 = document.createElement("h4");
      h4.innerHTML = message.name + ":";
      let text = document.createTextNode(message.message);
      console.log(message.message);
      element.appendChild(h4);
      element.appendChild(text);
      document.getElementById("chat-messages").appendChild(element);
    },
  },
  created: function() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8080/");

    this.connection.onmessage = (event) => {
      this.addTextMessage(JSON.parse(event.data));
    };

    this.connection.onopen = (event) => {
      console.log('websocket is connected ...')
      this.connection.send(JSON.stringify({
        room: '1',
        message: 'connected',
      }))
    };
  },
};
</script>

<style scoped>
.firstGrid{
  height: 88vh;
}
</style>
