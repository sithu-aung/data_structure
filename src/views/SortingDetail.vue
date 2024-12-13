<template>
  <div class="space-y-8">
    <header class="text-center px-4">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ algorithmDetails.title }}</h1>
      <p class="text-lg md:text-xl text-gray-300">{{ algorithmDetails.description }}</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
      <!-- Info Card -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 space-y-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
        <div v-for="(value, key) in infoItems" :key="key" class="group">
          <div class="flex items-center space-x-3 mb-2">
            <span class="text-lg font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
              {{ key }}:
            </span>
          </div>
          <p class="text-gray-300 pl-4 border-l-2 border-purple-500/30 group-hover:border-purple-500 transition-colors">
            {{ value }}
          </p>
        </div>
      </div>

      <!-- Implementation Card -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all relative overflow-hidden">
        <!-- Implementation Section -->
        <div 
          :class="{
            'translate-x-0 opacity-100': !showDemo,
            'translate-x-full opacity-0': showDemo
          }"
          class="absolute inset-0 p-8 transition-all duration-300 ease-in-out overflow-y-auto"
        >
          <h2 class="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Implementation
          </h2>
          <div class="relative">
            <pre class="bg-gray-900/80 p-6 pt-14 rounded-xl overflow-x-auto font-mono text-sm max-h-[500px] overflow-y-auto">
              <code class="language-typescript">{{ algorithmDetails.implementation }}</code>
            </pre>
            <div class="absolute top-4 right-4 space-x-2">
              <button 
                @click="copyCode"
                class="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors text-sm group"
              >
                <span class="group-hover:scale-95 transition-transform inline-block">
                  Copy
                </span>
              </button>
              <button 
                @click="runDemo"
                class="px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-colors text-sm group"
              >
                <span class="group-hover:scale-95 transition-transform inline-block">
                  Run Demo
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Demo Section -->
        <div 
          :class="{
            'translate-x-0 opacity-100': showDemo,
            '-translate-x-full opacity-0': !showDemo
          }"
          class="absolute inset-0 p-8 transition-all duration-300 ease-in-out overflow-y-auto max-h-full"
        >
          
          
          <!-- Demo Content -->
          <div 
            class="space-y-6 transition-all duration-300"
            :class="{ 'opacity-50': isSorting }"
          >
            <!-- Demo Controls Section -->
            <div class="space-y-4">
              <!-- Header and Reset -->
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  Demo
                </h2>
                <button 
                  @click="resetDemo"
                  class="px-3 py-1.5 text-sm rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors group flex items-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span class="text-gray-400 group-hover:text-gray-300">Reset</span>
                </button>
              </div>

              <!-- Input Controls -->
              <div class="flex gap-2">
                <div class="flex-1 relative">
                  <input 
                    v-model="inputArray"
                    type="text"
                    placeholder="Enter numbers (comma-separated)"
                    class="w-full bg-gray-900/50 rounded-lg px-3 py-2 text-sm border border-gray-700/50 focus:border-purple-500/50 outline-none transition-colors placeholder-gray-600"
                  />
                  
                </div>
                <button 
                  @click="generateRandomArray"
                  class="px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-sm text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isSorting"
                >
                  Random
                </button>
                <button 
                  @click="runSort"
                  :disabled="isSorting"
                  class="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50 text-sm font-medium text-white disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <span v-if="isSorting" class="inline-block animate-spin mr-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.75V6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M19.25 12L17.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 17.75V19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M6.25 12L4.75 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>{{ isSorting ? 'Sorting...' : 'Sort Array' }}</span>
                </button>
              </div>
            </div>

            <!-- Result View -->
            <div v-if="currentArray.length > 0 && !isGeneratingNew" class="mt-8 space-y-6">
              <!-- Stats -->
              <div class="flex justify-center space-x-8 text-sm">
                <span class="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300">
                  Time: {{ sortingStats.executionTime }}ms
                </span>
                <span class="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300">
                  Comparisons: {{ sortingStats.comparisons }}
                </span>
                <span class="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-300">
                  Swaps: {{ sortingStats.swaps }}
                </span>
              </div>

              <!-- Original Array -->
              <div class="space-y-2">
                <p class="text-sm text-gray-400 font-medium">Original Array:</p>
                <div class="flex justify-center space-x-2">
                  <div 
                    v-for="(num, index) in originalArray" 
                    :key="'original-' + index"
                    class="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-700/50 text-white font-medium shadow-lg border border-gray-600/30"
                  >
                    {{ num }}
                  </div>
                </div>
              </div>

              <!-- Sorted Array -->
              <div class="space-y-2">
                <p class="text-sm text-gray-400 font-medium">Sorted Array:</p>
                <div class="flex justify-center space-x-2">
                  <div 
                    v-for="(num, index) in sortedArray" 
                    :key="'sorted-' + index"
                    class="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-white font-medium shadow-lg border border-purple-500/30"
                  >
                    {{ num }}
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div class="border-t border-gray-700/50"></div>

              <!-- Visualize Steps Button -->
              <div v-if="!showVisualization" class="flex justify-center">
                <button 
                  @click="startVisualization"
                  class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-sm font-medium border border-purple-500/30 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/10"
                >
                  Visualize Steps
                </button>
              </div>

              <!-- Visualization Section -->
              <div v-if="showVisualization" class="space-y-6 bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <h3 class="text-lg font-medium text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  Visualization Steps
                </h3>
                
                <div class="flex justify-center space-x-2">
                  <div 
                    v-for="(num, index) in currentArray" 
                    :key="index"
                    :class="{
                      'bg-blue-500 shadow-blue-500/30': isComparing(index),
                      'bg-red-500 shadow-red-500/30': isSwapping(index),
                      'bg-gray-700/50': !isComparing(index) && !isSwapping(index)
                    }"
                    class="w-12 h-12 flex items-center justify-center rounded-lg text-white font-medium transition-all duration-300 shadow-lg border border-gray-600/30"
                  >
                    {{ num }}
                  </div>
                </div>
                
                <!-- Fixed height explanation box -->
                <div class="h-[3rem] flex items-center justify-center px-4">
                  <p class="text-center text-gray-300 text-sm">{{ currentExplanation }}</p>
                </div>
                
                <!-- Control Buttons -->
                <div class="flex justify-center space-x-4">
                  <button 
                    @click="prevStep"
                    :disabled="currentStep === 0"
                    class="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-sm font-medium text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/30"
                  >
                    Previous
                  </button>
                  <button 
                    @click="nextStep"
                    :disabled="currentStep >= steps.length"
                    class="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors text-sm font-medium text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/30"
                  >
                    Next
                  </button>
                </div>
                
                <!-- Progress -->
                <div class="text-center text-sm text-gray-400">
                  Step {{ currentStep }} of {{ steps.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const algorithmDetails = ref({
  title: '',
  description: '',
  fullDescription: '',
  timeComplexity: '',
  spaceComplexity: '',
  stability: '',
  useCase: '',
  advantage: '',
  implementation: ''
});

onMounted(() => {
  const algorithm = (route.params.algorithm || '');
  // Set the details based on the algorithm
  const details = getAlgorithmDetails(algorithm);
  algorithmDetails.value = details;
});

function getAlgorithmDetails(algorithm) {
  const details = {
    'bubble-sort': {
      title: 'Bubble Sort',
      description: 'Simple Comparison-based Sorting',
      fullDescription: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      timeComplexity: 'Best: O(n), Average: O(n²), Worst: O(n²)',
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      useCase: 'Educational purposes, small datasets',
      advantage: 'Can detect whether input list is sorted or not',
      implementation: `
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    'selection-sort': {
      title: 'Selection Sort',
      description: 'Divides input into sorted and unsorted parts',
      fullDescription: 'Divides the input list into two parts: a sorted and an unsorted part. It repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.',
      timeComplexity: 'Best: O(n²), Average: O(n²), Worst: O(n²)',
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      useCase: 'Small datasets, when memory space is limited',
      advantage: 'In-place sort (requires no additional storage space)',
      implementation: `
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`
    },
    'insertion-sort': {
      title: 'Insertion Sort',
      description: 'Builds sorted array one element at a time',
      fullDescription: 'Builds a sorted array one element at a time by repeatedly taking the next element from the input and inserting it into the correct position in the sorted part.',
      timeComplexity: 'Best: O(n), Average: O(n²), Worst: O(n²)',
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      useCase: 'Small datasets, partially sorted datasets',
      advantage: 'Simple implementation and efficient for small data sets',
      implementation: `
function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`
    },
    'merge-sort': {
      title: 'Merge Sort',
      description: 'Divide-and-conquer sorting algorithm',
      fullDescription: 'A divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges the sorted halves.',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
      spaceComplexity: 'O(n)',
      stability: 'Stable',
      useCase: 'Large datasets, linked lists',
      advantage: 'Consistent performance and stable sorting',
      implementation: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}`
    },
    'quick-sort': {
      title: 'Quick Sort',
      description: 'Efficient divide-and-conquer algorithm',
      fullDescription: 'A divide-and-conquer algorithm that selects a "pivot" element and partitions the array into elements less than and greater than the pivot, then recursively sorts the partitions.',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n²)',
      spaceComplexity: 'O(log n)',
      stability: 'Unstable',
      useCase: 'Large datasets, when average performance is critical',
      advantage: 'Efficient in-place sorting with good average case performance',
      implementation: `
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
    },
    'heap-sort': {
      title: 'Heap Sort',
      description: 'Comparison-based sorting using heap data structure',
      fullDescription: 'Converts the array into a heap structure, then repeatedly extracts the maximum element from the heap and rebuilds the heap.',
      timeComplexity: 'Best: O(n log n), Average: O(n log n), Worst: O(n log n)',
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      useCase: 'Large datasets, when memory usage is a concern',
      advantage: 'In-place sorting with guaranteed O(n log n) performance',
      implementation: `
function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
    }
  };

  return details[algorithm] || {};
}

const showDemo = ref(false);
const inputArray = ref('');
const sortedArray = ref([]);
const isSorting = ref(false);
const originalArray = ref([]);
const sortingStats = ref({
  executionTime: 0,
  comparisons: 0,
  swaps: 0
});

const infoItems = computed(() => ({
  'Description': algorithmDetails.value.fullDescription,
  'Time Complexity': algorithmDetails.value.timeComplexity,
  'Space Complexity': algorithmDetails.value.spaceComplexity,
  'Stability': algorithmDetails.value.stability,
  'Use Case': algorithmDetails.value.useCase,
  'Advantage': algorithmDetails.value.advantage,
}));

const copyCode = () => {
  navigator.clipboard.writeText(algorithmDetails.value.implementation);
};

const runDemo = () => {
  showDemo.value = true;
};

const getBarHeight = (num) => {
  const maxNum = Math.max(...originalArray.value, ...sortedArray.value);
  return Math.max((num / maxNum) * 95, 8); // Ensures minimum height of 8% and maximum of 95%
};

const currentStep = ref(0);
const steps = ref([]);
const currentArray = ref([]);
const currentExplanation = ref('');
const showVisualization = ref(false);

const isGeneratingNew = ref(false);

const runSort = () => {
  const numbers = inputArray.value.split(',')
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n));

  if (numbers.length === 0) {
    alert('Please enter valid numbers');
    return;
  }

  // Reset stats
  sortingStats.value = {
    executionTime: 0,
    comparisons: 0,
    swaps: 0
  };

  originalArray.value = [...numbers];
  currentArray.value = [...numbers];

  // Start timing
  const startTime = performance.now();
  
  // Generate steps and get sorted array
  const arrayToSort = [...numbers];
  steps.value = generateSortingSteps(arrayToSort, sortingStats.value);
  sortedArray.value = arrayToSort;
  
  // End timing and calculate with 2 decimal places
  const endTime = performance.now();
  sortingStats.value.executionTime = (endTime - startTime).toFixed(2);

  currentStep.value = 0;
  showVisualization.value = false;
  isGeneratingNew.value = false;
};

const generateSortingSteps = (arr, stats) => {
  const steps = [];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Count comparison
      stats.comparisons++;
      
      steps.push({
        type: 'compare',
        indices: [j, j + 1],
        explanation: `Comparing ${arr[j]} and ${arr[j + 1]}`
      });
      
      if (arr[j] > arr[j + 1]) {
        // Count swap
        stats.swaps++;
        
        steps.push({
          type: 'swap',
          indices: [j, j + 1],
          explanation: `Swapping ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}`
        });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return steps;
};

const bubbleSort = (arr, stats, steps) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      steps.push({ type: 'compare', indices: [j, j + 1], explanation: `Comparing ${arr[j]} and ${arr[j + 1]}` });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        stats.swaps++;
        steps.push({ type: 'swap', indices: [j, j + 1], explanation: `Swapping ${arr[j]} and ${arr[j + 1]}` });
      }
    }
  }
  return arr;
};

const selectionSort = (arr, stats, steps) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      steps.push({ type: 'compare', indices: [j, minIdx], explanation: `Comparing ${arr[j]} and ${arr[minIdx]}` });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      stats.swaps++;
      steps.push({ type: 'swap', indices: [i, minIdx], explanation: `Swapping ${arr[i]} and ${arr[minIdx]}` });
    }
  }
  return arr;
};

const insertionSort = (arr, stats, steps) => {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && (stats.comparisons++, arr[j] > key)) {
      arr[j + 1] = arr[j];
      stats.swaps++;
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
};

const mergeSort = (arr, stats, steps) => {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), stats, steps);
  const right = mergeSort(arr.slice(mid), stats, steps);
  
  return merge(left, right, stats, steps);
};

const merge = (left, right, stats, steps) => {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    stats.comparisons++;
    steps.push({ type: 'compare', indices: [i, j], explanation: `Comparing ${left[i]} and ${right[j]}` });
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
    stats.swaps++;
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
};

const quickSort = (arr, stats, steps, low = 0, high = arr.length - 1) => {
  if (low < high) {
    const pivotIndex = quickSortPartition(arr, low, high, stats, steps);
    quickSort(arr, stats, steps, low, pivotIndex - 1);
    quickSort(arr, stats, steps, pivotIndex + 1, high);
  }
  return arr;
};

const quickSortPartition = (arr, low, high, stats, steps) => {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    stats.comparisons++;
    steps.push({ type: 'compare', indices: [j, high], explanation: `Comparing ${arr[j]} and ${pivot}` });
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      stats.swaps++;
      steps.push({ type: 'swap', indices: [i, j], explanation: `Swapping ${arr[i]} and ${arr[j]}` });
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  stats.swaps++;
  steps.push({ type: 'swap', indices: [i + 1, high], explanation: `Swapping ${arr[i + 1]} and ${pivot}` });
  return i + 1;
};

const heapSort = (arr, stats, steps) => {
  const n = arr.length;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, stats, steps);
  }
  
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    stats.swaps++;
    steps.push({ type: 'swap', indices: [0, i], explanation: `Swapping ${arr[0]} and ${arr[i]}` });
    heapify(arr, i, 0, stats, steps);
  }
  
  return arr;
};

const heapify = (arr, n, i, stats, steps) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  stats.comparisons++;
  steps.push({ type: 'compare', indices: [left, largest], explanation: `Comparing ${arr[left]} and ${arr[largest]}` });
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  stats.comparisons++;
  steps.push({ type: 'compare', indices: [right, largest], explanation: `Comparing ${arr[right]} and ${arr[largest]}` });
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    stats.swaps++;
    steps.push({ type: 'swap', indices: [i, largest], explanation: `Swapping ${arr[i]} and ${arr[largest]}` });
    heapify(arr, n, largest, stats, steps);
  }
};

const generateRandomArray = () => {
  isGeneratingNew.value = true;
  showVisualization.value = false;
  currentStep.value = 0;
  steps.value = [];
  currentArray.value = [];
  sortedArray.value = [];
  originalArray.value = [];
  currentExplanation.value = '';
  sortingStats.value = {
    executionTime: 0,
    comparisons: 0,
    swaps: 0
  };

  const length = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
  const randomNumbers = Array.from({ length }, () => Math.floor(Math.random() * 100));
  inputArray.value = randomNumbers.join(', ');
};

const resetDemo = () => {
  showDemo.value = false;
  sortedArray.value = [];
  inputArray.value = '';
  originalArray.value = [];
  sortingStats.value = {
    executionTime: 0,
    comparisons: 0,
    swaps: 0
  };
  showVisualization.value = false;
};

const startVisualization = () => {
  showVisualization.value = true;
  currentStep.value = 0;
  currentArray.value = [...originalArray.value]; // Reset to original array
  updateExplanation();
};

const nextStep = () => {
  if (currentStep.value < steps.value.length) {
    const step = steps.value[currentStep.value];
    if (step.type === 'swap') {
      const [i, j] = step.indices;
      [currentArray.value[i], currentArray.value[j]] = [currentArray.value[j], currentArray.value[i]];
    }
    currentStep.value++;
    updateExplanation();
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    // Reset and replay steps
    currentArray.value = [...originalArray.value];
    for (let i = 0; i < currentStep.value; i++) {
      const step = steps.value[i];
      if (step.type === 'swap') {
        const [i, j] = step.indices;
        [currentArray.value[i], currentArray.value[j]] = [currentArray.value[j], currentArray.value[i]];
      }
    }
    updateExplanation();
  }
};

const updateExplanation = () => {
  if (currentStep.value === 0) {
    currentExplanation.value = 'Starting the sorting process...';
    return;
  }

  const step = steps.value[currentStep.value - 1];
  if (step.type === 'compare') {
    const [i, j] = step.indices;
    const nums = currentArray.value;
    currentExplanation.value = `Comparing ${nums[i]} and ${nums[j]}: ${
      nums[i] > nums[j] 
        ? `${nums[i]} is greater than ${nums[j]}, needs swap` 
        : `${nums[i]} is less than or equal to ${nums[j]}, no swap needed`
    }`;
  } else if (step.type === 'swap') {
    const [i, j] = step.indices;
    currentExplanation.value = `Swapping ${currentArray.value[j]} and ${currentArray.value[i]} to maintain ascending order`;
  }
};

const isComparing = (index) => {
  const step = steps.value[currentStep.value - 1];
  return step && step.type === 'compare' && step.indices.includes(index);
};

const isSwapping = (index) => {
  const step = steps.value[currentStep.value - 1];
  return step && step.type === 'swap' && step.indices.includes(index);
};

// Update the stats display to show microsecond precision
const formatExecutionTime = (time) => {
  if (time < 0.001) return '< 0.001ms';
  if (time < 1) return `${time.toFixed(3)}ms`;
  return `${Math.round(time)}ms`;
};

// Update your template where execution time is displayed
const getExpectedTime = () => {
  const algorithm = route.params.algorithm;
  const n = sortingStats.value.arraySize;
  
  // More realistic base times in milliseconds
  const baseTime = 0.0001; // 0.1 microsecond base operation time
  
  const timeMap = {
    'bubble-sort': baseTime * n * n,
    'selection-sort': baseTime * n * n,
    'insertion-sort': baseTime * n * n / 2,
    'merge-sort': baseTime * n * Math.log2(n) * 2,
    'quick-sort': baseTime * n * Math.log2(n),
    'heap-sort': baseTime * n * Math.log2(n) * 1.5
  };

  const expectedMs = timeMap[algorithm] || 0;
  return expectedMs < 0.001 ? '< 0.001ms' : 
         expectedMs < 1 ? `~${expectedMs.toFixed(3)}ms` : 
         `~${Math.round(expectedMs)}ms`;
};
</script>
<style scoped>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optional: Add this if you want smoother number transitions */
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.number-animate-in {
  animation: slideIn 0.3s ease-out forwards;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(17, 24, 39, 0.3);
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}

.flex-wrap {
  margin: -0.375rem; /* Compensate for gap */
}

.flex-wrap > * {
  margin: 0.375rem; /* Add consistent spacing */
}

/* Optional: Add animation for numbers */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.relative {
  animation: fadeIn 0.3s ease-out forwards;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.5) rgba(17, 24, 39, 0.3);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}
</style>
