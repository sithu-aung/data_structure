<script setup lang="ts">
import { ref } from 'vue'

const queue = ref<string[]>([])

const enqueue = () => {
  const value = String.fromCharCode(65 + queue.value.length)
  queue.value.push(value)
}

const dequeue = () => {
  if (queue.value.length > 0) {
    queue.value.shift()
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-center space-x-4">
      <button 
        @click="enqueue"
        class="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
      >
        Enqueue
      </button>
      <button 
        @click="dequeue"
        class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600"
      >
        Dequeue
      </button>
    </div>
    <div class="flex items-center justify-center space-x-2">
      <div 
        v-for="(item, index) in queue" 
        :key="index"
        class="w-12 h-12 bg-gray-700 flex items-center justify-center rounded border border-gray-600"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>