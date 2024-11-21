<script setup>
import { ref } from 'vue'

const stack = ref([])

const push = () => {
  const value = String.fromCharCode(65 + stack.value.length)
  stack.value.push(value)
}

const pop = () => {
  if (stack.value.length > 0) {
    stack.value.pop()
  }
}

const stackDetails = {
  title: 'Stack',
  description: 'A Last-In-First-Out (LIFO) data structure',
  fullDescription: 'A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack.',
  timeComplexity: {
    push: 'O(1)',
    pop: 'O(1)',
    peek: 'O(1)',
    search: 'O(n)'
  },
  spaceComplexity: 'O(n)',
  advantages: [
    'Simple implementation',
    'Efficient operations',
    'Memory efficient',
    'Easy to track state'
  ],
  disadvantages: [
    'Limited access to elements',
    'Fixed size in array implementation',
    'No random access',
    'Potential stack overflow'
  ]
}

const explanations = {
  push: {
    title: 'Push Operation',
    steps: [
      'Create space for the new element at the top of the stack',
      'Add the element to the newly created space',
      'Move the top pointer up'
    ],
    example: 'Like adding a plate to the top of a stack of plates'
  },
  pop: {
    title: 'Pop Operation',
    steps: [
      'Check if stack is not empty',
      'Remove the element at the top',
      'Move the top pointer down',
      'Return the removed element'
    ],
    example: 'Like removing the top plate from a stack of plates'
  },
  peek: {
    title: 'Peek Operation',
    steps: [
      'Check if stack is not empty',
      'Return the element at the top without removing it'
    ],
    example: 'Like looking at the top plate without removing it'
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Visualization Section -->
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

    <!-- Operations Explanation -->
    <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-semibold mb-4 text-purple-400">Stack Operations</h3>
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
              <div class="text-sm text-gray-400">Push</div>
              <div class="text-lg font-semibold text-purple-400">{{ stackDetails.timeComplexity.push }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Pop</div>
              <div class="text-lg font-semibold text-purple-400">{{ stackDetails.timeComplexity.pop }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Peek</div>
              <div class="text-lg font-semibold text-purple-400">{{ stackDetails.timeComplexity.peek }}</div>
            </div>
            <div class="bg-gray-900/50 p-3 rounded-lg">
              <div class="text-sm text-gray-400">Search</div>
              <div class="text-lg font-semibold text-purple-400">{{ stackDetails.timeComplexity.search }}</div>
            </div>
          </div>
          <div class="bg-gray-900/50 p-3 rounded-lg">
            <div class="text-sm text-gray-400">Space Complexity</div>
            <div class="text-lg font-semibold text-purple-400">{{ stackDetails.spaceComplexity }}</div>
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
                v-for="advantage in stackDetails.advantages" 
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
                v-for="disadvantage in stackDetails.disadvantages" 
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