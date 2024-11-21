<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
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

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="text-gray-300 hover:text-white"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                v-if="!isMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Desktop menu -->
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
            <router-link 
              to="/sorting-algorithms" 
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sorting Algorithms
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
            v-for="ds in ['linked-list', 'stack', 'queue', 'tree', 'graph']" 
            :key="ds"
            :to="`/data-structure/${ds}`"
            class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            @click="isMenuOpen = false"
          >
            {{ ds.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
          </router-link>
          <router-link 
            to="/sorting-algorithms" 
            class="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            @click="isMenuOpen = false"
          >
            Sorting Algorithms
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>