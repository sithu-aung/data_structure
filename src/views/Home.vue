<script setup>
import DataStructureCard from '../components/DataStructureCard.vue'

const dataStructures = [
  {
    title: 'Linked Lists',
    description: 'Learn about singly and doubly linked lists, their operations, and use cases.',
    icon: '🔗',
    route: '/data-structure/linked-list'
  },
  {
    title: 'Stacks',
    description: 'Explore LIFO data structure with real-world applications.',
    icon: '📚',
    route: '/data-structure/stack'
  },
  {
    title: 'Queues',
    description: 'Understand FIFO principle and its practical implementations.',
    icon: '🎫',
    route: '/data-structure/queue'
  },
  {
    title: 'Trees',
    description: 'Master hierarchical data structures and their traversal algorithms.',
    icon: '🌳',
    route: '/data-structure/tree'
  },
  {
    title: 'Graphs',
    description: 'Discover network representations and graph algorithms.',
    icon: '🕸️',
    route: '/data-structure/graph'
  },
  {
    title: 'Sorting Algorithms',
    description: 'Learn and visualize different sorting techniques and their complexities.',
    icon: '🔄',
    route: '/sorting-algorithms'
  }
]
</script>

<template>
  <div class="space-y-8">
    <header class="text-center mb-12 px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Master Data Structures
      </h1>
      <p class="text-lg md:text-xl text-gray-300">Interactive learning journey through fundamental data structures</p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
      <DataStructureCard
        v-for="ds in dataStructures"
        :key="ds.title"
        v-bind="ds"
      />
    </div>
  </div>
</template>