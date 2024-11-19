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

const linkedListDetails = {
  title: 'Linked List',
  description: 'A sequential collection of elements where each element points to the next',
  fullDescription: 'A linked list is a linear data structure where elements are stored in nodes, and each node contains a value and a reference (or pointer) to the next node in the sequence. The last node points to null, indicating the end of the list.',
  timeComplexity: {
    access: 'O(n)',
    search: 'O(n)',
    insertion: 'O(1)',
    deletion: 'O(1)'
  },
  spaceComplexity: 'O(n)',
  advantages: [
    'Dynamic size',
    'Efficient insertion/deletion',
    'No memory wastage',
    'Implementation of other data structures'
  ],
  disadvantages: [
    'No random access',
    'Extra memory for pointers',
    'Not cache friendly',
    'Reverse traversing is difficult (in singly linked list)'
  ]
}
</script>

<template>
  <div class="space-y-8">
    <!-- Visualization Section -->
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
      
      <!-- Nodes Visualization -->
      <div 
        ref="containerRef"
        class="overflow-x-auto pb-4 max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div class="flex items-center min-w-min px-4 w-full justify-center">
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

    <!-- Explanation Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Time & Space Complexity -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 class="text-xl font-semibold mb-4 text-purple-400">Time & Space Complexity</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Access</div>
              <div class="text-lg font-semibold text-purple-400">{{ linkedListDetails.timeComplexity.access }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Search</div>
              <div class="text-lg font-semibold text-purple-400">{{ linkedListDetails.timeComplexity.search }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Insertion</div>
              <div class="text-lg font-semibold text-purple-400">{{ linkedListDetails.timeComplexity.insertion }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Deletion</div>
              <div class="text-lg font-semibold text-purple-400">{{ linkedListDetails.timeComplexity.deletion }}</div>
            </div>
          </div>
          <div class="bg-gray-900/50 p-3 rounded-lg">
            <div class="text-sm text-gray-400">Space Complexity</div>
            <div class="text-lg font-semibold text-purple-400">{{ linkedListDetails.spaceComplexity }}</div>
          </div>
        </div>
      </div>

      <!-- Pros & Cons -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 class="text-xl font-semibold mb-4 text-purple-400">Advantages & Disadvantages</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="text-sm font-semibold text-gray-300 mb-2">Advantages</h4>
            <ul class="space-y-2">
              <li 
                v-for="advantage in linkedListDetails.advantages" 
                :key="advantage"
                class="text-sm text-gray-400 flex items-center space-x-2"
              >
                <span class="text-green-400">✓</span>
                <span>{{ advantage }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-300 mb-2">Disadvantages</h4>
            <ul class="space-y-2">
              <li 
                v-for="disadvantage in linkedListDetails.disadvantages" 
                :key="disadvantage"
                class="text-sm text-gray-400 flex items-center space-x-2"
              >
                <span class="text-red-400">×</span>
                <span>{{ disadvantage }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
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