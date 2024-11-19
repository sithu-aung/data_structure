<template>
  <div class="space-y-8">
    <header class="text-center">
      <h1 class="text-4xl font-bold mb-4">Sorting Algorithms</h1>
      <p class="text-xl text-gray-300">Learn different sorting techniques and their implementations</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="algorithm in sortingAlgorithms" 
        :key="algorithm.title"
        @click="goToDetail(algorithm.route)"
        class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all cursor-pointer transform hover:-translate-y-1 border border-gray-700"
      >
        <div class="text-4xl mb-4">{{ algorithm.icon }}</div>
        <h3 class="text-xl font-semibold mb-2">{{ algorithm.title }}</h3>
        <p class="text-gray-400">{{ algorithm.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const sortingAlgorithms = [
  {
    title: 'Bubble Sort',
    description: 'A simple comparison-based sorting algorithm',
    icon: '🫧',
    route: 'bubble-sort'
  },
  {
    title: 'Selection Sort',
    description: 'Sorts by repeatedly selecting the minimum element',
    icon: '🎯',
    route: 'selection-sort'
  },
  {
    title: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time',
    icon: '📥',
    route: 'insertion-sort'
  },
  {
    title: 'Merge Sort',
    description: 'Divide-and-conquer algorithm that recursively breaks down a problem',
    icon: '🔄',
    route: 'merge-sort'
  },
  {
    title: 'Quick Sort',
    description: 'Efficient, in-place sorting algorithm using partitioning',
    icon: '⚡',
    route: 'quick-sort'
  },
  {
    title: 'Heap Sort',
    description: 'Comparison-based sorting using heap data structure',
    icon: '🏗️',
    route: 'heap-sort'
  }
];

function goToDetail(algorithm: string) {
  router.push({ name: 'SortingDetail', params: { algorithm } });
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #4b5563;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #374151;
}
.btn {
  background-color: #4a90e2;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #357ab8;
}
</style>