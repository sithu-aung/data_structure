<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
</script>

<template>
  <nav class="bg-gray-800 border-b border-gray-700">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <span 
            @click="router.push('/')" 
            class="text-xl font-bold cursor-pointer bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            DataStruct
          </span>
        </div>

        <div class="hidden md:block">
          <div class="flex items-center space-x-4">
            <router-link 
              v-for="ds in ['linked-list', 'stack', 'queue', 'tree', 'graph']" 
              :key="ds"
              :to="`/data-structure/${ds}`"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {{ ds.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>