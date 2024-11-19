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

// Add explanations object for queue operations
const explanations = {
  enqueue: {
    title: 'Enqueue Operation',
    steps: [
      'Create space for the new element at the rear',
      'Add the element to the queue',
      'Move the rear pointer forward'
    ],
    example: 'Like joining a line at the back of a queue'
  },
  dequeue: {
    title: 'Dequeue Operation',
    steps: [
      'Check if queue is not empty',
      'Remove the element from the front',
      'Move the front pointer forward',
      'Return the removed element'
    ],
    example: 'Like serving the first person in a queue'
  },
  peek: {
    title: 'Peek Operation',
    steps: [
      'Check if queue is not empty',
      'Return the element at the front without removing it'
    ],
    example: 'Like looking at who is first in line without serving them'
  }
}

// Add queueDetails object before the closing script tag
const queueDetails = {
  timeComplexity: {
    enqueue: 'O(1)',
    dequeue: 'O(1)',
    peek: 'O(1)',
    search: 'O(n)'
  },
  spaceComplexity: 'O(n)',
  advantages: [
    'Fast insertion and deletion',
    'Predictable order',
    'Useful for scheduling'
  ],
  disadvantages: [
    'Fixed size in array implementation',
    'No random access',
    'Limited flexibility'
  ]
}
</script>

<template>
  <div class="space-y-8">
    <!-- Visualization Section -->
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

    <!-- Operations Explanation -->
    <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-semibold mb-4 text-purple-400">Queue Operations</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="(explanation, op) in explanations" 
          :key="op"
          class="bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900/70 transition-colors"
        >
          <h4 class="text-lg font-medium text-purple-400 mb-3">{{ explanation.title }}</h4>
          <ol class="list-decimal list-inside mb-3 space-y-2">
            <li 
              v-for="(step, index) in explanation.steps" 
              :key="index" 
              class="text-sm text-gray-300"
            >
              {{ step }}
            </li>
          </ol>
          <p class="text-sm text-gray-400 italic border-t border-gray-700 pt-2">
            {{ explanation.example }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Details Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Time & Space Complexity -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 class="text-xl font-semibold mb-4 text-purple-400">Time & Space Complexity</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Enqueue</div>
              <div class="text-lg font-semibold text-purple-400">{{ queueDetails.timeComplexity.enqueue }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Dequeue</div>
              <div class="text-lg font-semibold text-purple-400">{{ queueDetails.timeComplexity.dequeue }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Peek</div>
              <div class="text-lg font-semibold text-purple-400">{{ queueDetails.timeComplexity.peek }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Search</div>
              <div class="text-lg font-semibold text-purple-400">{{ queueDetails.timeComplexity.search }}</div>
            </div>
          </div>
          <div class="bg-gray-900/50 p-3 rounded-lg">
            <div class="text-sm text-gray-400">Space Complexity</div>
            <div class="text-lg font-semibold text-purple-400">{{ queueDetails.spaceComplexity }}</div>
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
                v-for="advantage in queueDetails.advantages" 
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
                v-for="disadvantage in queueDetails.disadvantages" 
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