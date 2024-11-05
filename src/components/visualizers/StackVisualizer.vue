<script setup lang="ts">
import { ref } from 'vue'

const stack = ref<string[]>([])

const push = () => {
  const value = String.fromCharCode(65 + stack.value.length)
  stack.value.push(value)
}

const pop = () => {
  if (stack.value.length > 0) {
    stack.value.pop()
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-center space-x-4">
      <button 
        @click="push"
        class="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
      >
        Push
      </button>
      <button 
        @click="pop"
        class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600"
      >
        Pop
      </button>
    </div>
    <div class="flex flex-col-reverse items-center space-y-2 space-y-reverse">
      <div 
        v-for="(item, index) in stack" 
        :key="index"
        class="w-32 h-12 bg-gray-700 flex items-center justify-center rounded border border-gray-600"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>