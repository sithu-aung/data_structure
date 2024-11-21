<script setup>
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

const graphDetails = {
  title: 'Graph',
  description: 'A non-linear data structure of vertices and edges',
  fullDescription: 'A graph is a non-linear data structure consisting of vertices (nodes) and edges that connect these vertices. It can represent complex relationships and networks.',
  timeComplexity: {
    addVertex: 'O(1)',
    addEdge: 'O(1)',
    removeVertex: 'O(V + E)',
    removeEdge: 'O(E)',
    search: 'O(V + E)'
  },
  spaceComplexity: 'O(V + E)',
  advantages: [
    'Model real-world relationships',
    'Flexible structure',
    'Powerful algorithms',
    'Network analysis'
  ],
  disadvantages: [
    'Complex implementation',
    'Memory intensive',
    'Scaling challenges',
    'Complex traversal'
  ]
}

// Add explanations for graph operations
const explanations = {
  addVertex: {
    title: 'Add Vertex Operation',
    steps: [
      'Create a new vertex with unique ID',
      'Initialize vertex properties',
      'Add vertex to graph structure'
    ],
    example: 'Like adding a new city to a map'
  },
  addEdge: {
    title: 'Add Edge Operation',
    steps: [
      'Identify source and target vertices',
      'Create connection between vertices',
      'Add edge to graph structure'
    ],
    example: 'Like connecting two cities with a road'
  },
  traverse: {
    title: 'Graph Traversal',
    steps: [
      'Start from a source vertex',
      'Visit connected vertices',
      'Mark visited vertices',
      'Explore all paths'
    ],
    example: 'Like exploring all possible routes in a road network'
  }
}

// Add methods for graph manipulation
const addVertex = () => {
  const letters = 'ABCDEFGHIJK'
  const usedLetters = new Set(nodes.value.map(n => n.id))
  const newLetter = letters.split('').find(l => !usedLetters.has(l))
  
  if (!newLetter) return
  
  // Add new vertex with better positioning
  const radius = 80  // Distance from center
  const angle = Math.random() * 2 * Math.PI  // Random angle
  const newNode = {
    id: newLetter,
    x: 100 + radius * Math.cos(angle),  // Center x = 100
    y: 100 + radius * Math.sin(angle)   // Center y = 100
  }
  nodes.value.push(newNode)

  // Connect to nearest node
  if (nodes.value.length > 1) {
    const otherNodes = nodes.value.filter(n => n.id !== newLetter)
    const nearestNode = otherNodes[Math.floor(Math.random() * otherNodes.length)]
    edges.value.push({
      source: newLetter,
      target: nearestNode.id
    })

    // Randomly add a second edge to create more interesting graphs
    if (Math.random() > 0.5 && otherNodes.length > 1) {
      const secondNode = otherNodes.find(n => n.id !== nearestNode.id)
      if (secondNode) {
        edges.value.push({
          source: newLetter,
          target: secondNode.id
        })
      }
    }
  }
}

const removeVertex = () => {
  if (nodes.value.length <= 1) return
  
  // Remove the last added vertex and its connected edges
  const removed = nodes.value.pop()
  if (removed) {
    // Remove all edges connected to this vertex
    edges.value = edges.value.filter(
      e => e.source !== removed.id && e.target !== removed.id
    )

    // If we disconnected any nodes, try to reconnect them
    const connectedNodes = new Set()
    edges.value.forEach(edge => {
      connectedNodes.add(edge.source)
      connectedNodes.add(edge.target)
    })

    // Find isolated nodes
    const isolatedNodes = nodes.value.filter(node => !connectedNodes.has(node.id))
    
    // Connect isolated nodes to random existing nodes
    isolatedNodes.forEach(isolatedNode => {
      const connectedNodesList = Array.from(connectedNodes) 
      if (connectedNodesList.length > 0) {
        const randomConnectedNode = connectedNodesList[
          Math.floor(Math.random() * connectedNodesList.length)
        ]
        edges.value.push({
          source: isolatedNode.id,
          target: randomConnectedNode
        })
      }
    })
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Controls -->
    <div class="flex justify-center space-x-4">
      <button 
        @click="addVertex"
        class="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition-colors"
      >
        Add Vertex
      </button>
      <button 
        @click="removeVertex"
        class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600 transition-colors"
      >
        Remove Vertex
      </button>
    </div>

    <!-- Graph Visualization -->
    <div class="flex justify-center">
      <svg 
        width="200" 
        height="200" 
        class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
      >
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

    <!-- Operations Explanation -->
    <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-semibold mb-4 text-purple-400">Graph Operations</h3>
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

    <!-- Implementation Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Time & Space Complexity -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 class="text-xl font-semibold mb-4 text-purple-400">Time & Space Complexity</h3>
        <div class="grid grid-cols-2 gap-2">
          <div 
            v-for="(complexity, operation) in graphDetails.timeComplexity" 
            :key="operation"
            class="bg-gray-900/50 p-3 rounded-lg"
          >
            <div class="text-sm text-gray-400">{{ operation }}</div>
            <div class="text-lg font-semibold text-purple-400">{{ complexity }}</div>
          </div>
          <div class="bg-gray-900/50 p-3 rounded-lg col-span-2">
            <div class="text-sm text-gray-400">Space Complexity</div>
            <div class="text-lg font-semibold text-purple-400">{{ graphDetails.spaceComplexity }}</div>
          </div>
        </div>
      </div>

      <!-- Pros & Cons -->
      <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
        <h3 class="text-xl font-semibold mb-4 text-purple-400">Advantages & Disadvantages</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- ... similar to Queue's advantages/disadvantages section ... -->
        </div>
      </div>
    </div>
  </div>
</template>