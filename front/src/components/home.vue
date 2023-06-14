<template>
  <div class="flex justify-center items-center">
    <div class="homeBox">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 firstGrid">
        <!-- Welcome Text Box -->
        <div class="col-span-1 h-full">
          <div class="p-4 bg-gray-200 h-full rounded">
            <h2 class="text-xl font-bold mb-4">Welcome</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae odio ut nulla cursus aliquet.</p>
          </div>
        </div>

        <!-- News Block Box -->
        <div class="col-span-2 h-full">
          <div class="p-4 bg-gray-200 h-full rounded">
            <h2 class="text-xl font-bold mb-4">Game News</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae odio ut nulla cursus aliquet.</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 secondGrid mt-4">
        <!-- Friends List Box -->
        <div class="col-span-1 h-full">
          <div class="p-4 bg-gray-200 h-full rounded">
            <h2 class="text-xl font-bold mb-4">Friends List</h2>
            <!-- Friends list content goes here -->
          </div>
        </div>

        <div class="col-span-3 h-full">
          <!-- Selected Champions Box -->
          <div class="h-[22.8rem]">
            <div class="p-4 bg-gray-200 h-full rounded">
              <h2 class="text-xl font-bold mb-4">Selected Champions</h2>
              <!-- Selected champions content goes here -->
            </div>
          </div>

          <!-- News Block Box -->
          <div class="md:col-start-2 h-[14.4rem] mt-4">
            <div class="p-4 bg-gray-200 h-full rounded">
              <h2 class="text-xl font-bold mb-4">News Block</h2>
              <!-- News block content goes here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
}
</script>

<style scoped>
.firstGrid{
  height: 20vh;
}
.secondGrid{
  height: auto;
}
.homeBox{
  height: 88.2vh;
  width: 80vw;
}
</style>
