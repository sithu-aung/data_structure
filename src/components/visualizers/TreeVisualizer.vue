<script setup lang="ts">
import { ref } from 'vue'

const tree = ref({
  value: 'A',
  children: [
    { 
      value: 'B',
      children: [
        { value: 'D', children: [] },
        { value: 'E', children: [] }
      ]
    },
    { 
      value: 'C',
      children: [
        { value: 'F', children: [] }
      ]
    }
  ]
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col items-center">
      <div class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {{ tree.value }}
      </div>
      <div class="flex space-x-16">
        <div v-for="(child, index) in tree.children" :key="index" class="flex flex-col items-center">
          <div class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            {{ child.value }}
          </div>
          <div class="flex space-x-8">
            <div v-for="(grandChild, idx) in child.children" :key="idx" class="flex flex-col items-center">
              <div class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center">
                {{ grandChild.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>