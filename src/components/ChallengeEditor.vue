<script setup>
import { ref, watch } from 'vue'
import { useChallengesStore } from '../stores/challenges'

const props = defineProps<{
  challenge: {
    title,
    description,
    difficulty,
    starterCode,
    solution,
    testCases: { input, expected }
  }
};

const code = ref(props.challenge.starterCode)
const testResults = ref<{ passed, message }([])
const showSolution = ref(false)

const runTests = async () => {
  testResults.value = []
  
  try {
    // Create a function from the code string
    const fn = new Function('return ' + code.value)()
    
    for (const testCase of props.challenge.testCases) {
      try {
        const result = fn(testCase.input)
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected)
        testResults.value.push({
          passed,
          message: passed 
            ? 'Test passed!' 
            : `Expected ${JSON.stringify(testCase.expected)}, but got ${JSON.stringify(result)}`
        })
      } catch (error) {
        testResults.value.push({
          passed: false,
          message: `Error: ${error.message}`
        })
      }
    }
  } catch (error) {
    testResults.value.push({
      passed: false,
      message: `Compilation error: ${error.message}`
    })
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">{{ challenge.title }}</h3>
      <span 
        class="px-3 py-1 rounded text-sm"
        :class="{
          'bg-green-500/20 text-green-300': challenge.difficulty === 'Easy',
          'bg-yellow-500/20 text-yellow-300': challenge.difficulty === 'Medium',
          'bg-red-500/20 text-red-300': challenge.difficulty === 'Hard'
        }"
      >
        {{ challenge.difficulty }}
      </span>
    </div>

    <p class="text-gray-300">{{ challenge.description }}</p>

    <div class="relative">
      <textarea
        v-model="code"
        class="w-full h-64 bg-gray-900 text-gray-100 font-mono p-4 rounded-lg"
        :class="{ 'opacity-50': showSolution }"
        :disabled="showSolution"
      ></textarea>
      
      <div v-if="showSolution" class="absolute inset-0">
        <pre class="w-full h-full bg-gray-900 text-gray-100 font-mono p-4 rounded-lg overflow-auto">{{ challenge.solution }}</pre>
      </div>
    </div>

    <div class="flex space-x-4">
      <button
        @click="runTests"
        class="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600"
      >
        Run Tests
      </button>
      <button
        @click="showSolution = !showSolution"
        class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600"
      >
        {{ showSolution ? 'Hide' : 'Show' }} Solution
      </button>
    </div>

    <div v-if="testResults.length > 0" class="space-y-2">
      <div
        v-for="(result, index) in testResults"
        :key="index"
        class="p-3 rounded"
        :class="result.passed ? 'bg-green-500/20' : 'bg-red-500/20'"
      >
        <span :class="result.passed ? 'text-green-300' : 'text-red-300'">
          {{ result.message }}
        </span>
      </div>
    </div>
  </div>
</template>