<template>
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
</template>

<script>
export default {
  name: 'ProfileComponent',
}
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
