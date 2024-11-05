<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import LinkedListVisualizer from '../components/visualizers/LinkedListVisualizer.vue'
import StackVisualizer from '../components/visualizers/StackVisualizer.vue'
import QueueVisualizer from '../components/visualizers/QueueVisualizer.vue'
import TreeVisualizer from '../components/visualizers/TreeVisualizer.vue'
import GraphVisualizer from '../components/visualizers/GraphVisualizer.vue'

const route = useRoute()
const type = computed(() => route.params.type as string)

const visualizers = {
  'linked-list': LinkedListVisualizer,
  'stack': StackVisualizer,
  'queue': QueueVisualizer,
  'tree': TreeVisualizer,
  'graph': GraphVisualizer
}

const content = {
  'linked-list': {
    title: 'Linked Lists',
    description: 'A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.',
    realWorld: [
      'Music playlist implementation',
      'Undo/Redo functionality in applications',
      'Memory allocation in operating systems'
    ]
  },
  'stack': {
    title: 'Stacks',
    description: 'A stack is a LIFO (Last In, First Out) data structure where elements are added and removed from the same end.',
    realWorld: [
      'Browser history navigation',
      'Function call stack in programming',
      'Undo mechanism in text editors'
    ]
  },
  'queue': {
    title: 'Queues',
    description: 'A queue is a FIFO (First In, First Out) data structure where elements are added at one end and removed from the other.',
    realWorld: [
      'Print job scheduling',
      'Customer service systems',
      'Message queues in distributed systems'
    ]
  },
  'tree': {
    title: 'Trees',
    description: 'A tree is a hierarchical data structure with a root node and child nodes, commonly used for representing hierarchical relationships.',
    realWorld: [
      'File system organization',
      'HTML DOM structure',
      'Organization charts'
    ]
  },
  'graph': {
    title: 'Graphs',
    description: 'A graph is a non-linear data structure consisting of vertices and edges, perfect for representing networks and relationships.',
    realWorld: [
      'Social network connections',
      'GPS and navigation systems',
      'Network routing protocols'
    ]
  }
}

const currentContent = computed(() => content[type.value as keyof typeof content])
</script>

<template>
  <div class="space-y-8">
    <header class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ currentContent.title }}</h1>
      <p class="text-xl text-gray-300">{{ currentContent.description }}</p>
    </header>

    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <component :is="visualizers[type]" />
    </div>

    <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 class="text-2xl font-semibold mb-4">Real-World Applications</h2>
      <ul class="list-disc list-inside space-y-2">
        <li v-for="example in currentContent.realWorld" :key="example" class="text-gray-300">
          {{ example }}
        </li>
      </ul>
    </div>

    <div class="text-center">
      <router-link 
        :to="`/challenges/${type}`"
        class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Try Challenges
      </router-link>
    </div>
  </div>
</template>