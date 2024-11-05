<script setup lang="ts">
import { ref } from 'vue'

const nodes = ref([
  { id: 'A', x: 50, y: 50 },
  { id: 'B', x: 150, y: 50 },
  { id: 'C', x: 100, y: 150 }
])

const edges = ref([
  { source: 'A', target: 'B' },
  { source: 'B', target: 'C' },
  { source: 'C', target: 'A' }
])
</script>

<template>
  <div class="space-y-4">
    <svg width="200" height="200" class="bg-gray-700 rounded">
      <!-- Edges -->
      <line
        v-for="edge in edges"
        :key="`${edge.source}-${edge.target}`"
        :x1="nodes.find(n => n.id === edge.source)?.x"
        :y1="nodes.find(n => n.id === edge.source)?.y"
        :x2="nodes.find(n => n.id === edge.target)?.x"
        :y2="nodes.find(n => n.id === edge.target)?.y"
        stroke="white"
        stroke-width="2"
      />
      <!-- Nodes -->
      <g
        v-for="node in nodes"
        :key="node.id"
        :transform="`translate(${node.x},${node.y})`"
      >
        <circle
          r="20"
          fill="#374151"
          stroke="white"
        />
        <text
          text-anchor="middle"
          dy=".3em"
          fill="white"
        >{{ node.id }}</text>
      </g>
    </svg>
  </div>
</template>