<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Node {
  id: number
  value: string
}

const nodes = ref<Node[]>([
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'C' }
])

const containerRef = ref<HTMLDivElement | null>(null)

const addNode = () => {
  const newValue = String.fromCharCode(65 + (nodes.value.length % 26))
  nodes.value.push({
    id: nodes.value.length + 1,
    value: newValue + (nodes.value.length >= 26 ? Math.floor(nodes.value.length / 26) : '')
  })
  
  // Scroll to the end after adding a node
  setTimeout(() => {
    if (containerRef.value) {
      containerRef.value.scrollLeft = containerRef.value.scrollWidth
    }
  }, 0)
}

const removeNode = () => {
  if (nodes.value.length > 0) {
    nodes.value.pop()
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-center space-x-4">
      <button 
        @click="addNode"
        class="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
      >
        Add Node
      </button>
      <button 
        @click="removeNode"
        class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600"
      >
        Remove Node
      </button>
    </div>
    
    <!-- Scrollable container with custom scrollbar -->
    <div 
      ref="containerRef"
      class="overflow-x-auto pb-4 max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
    >
      <div class="flex items-center min-w-min px-4">
        <template v-for="(node, index) in nodes" :key="node.id">
          <div 
            class="flex-shrink-0 bg-gray-700 w-12 h-12 rounded-lg flex items-center justify-center border border-gray-600 transition-all hover:bg-gray-600"
          >
            {{ node.value }}
          </div>
          <div 
            v-if="index < nodes.length - 1" 
            class="flex-shrink-0 px-2"
          >
            <svg 
              class="w-6 h-6 text-gray-400" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </template>
      </div>
    </div>
    
    <div class="text-center text-sm text-gray-400">
      {{ nodes.length }} node{{ nodes.length !== 1 ? 's' : '' }}
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>