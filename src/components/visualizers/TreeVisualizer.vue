<script setup>
import { ref, onMounted } from 'vue'
import OrgChart from '@balkangraph/orgchart.js'

const chartContainer = ref(null)
let chart = null
const currentTraversal = ref([])
const isTraversing = ref(false)
const selectedTraversal = ref('inorder')

const nodes = ref([
  { id: "1", name: "A" },
  { id: "2", pid: "1", name: "B" },
  { id: "3", pid: "1", name: "C" },
  { id: "4", pid: "2", name: "D" },
  { id: "5", pid: "2", name: "E" },
  { id: "6", pid: "3", name: "F" }
])

onMounted(() => {
  if (chartContainer.value) {
    chart = new OrgChart(chartContainer.value, {
      nodes: nodes.value,
      template: "ula",
      enableDragDrop: true,
      nodeBinding: {
        field_0: "name"
      },
      layout: OrgChart.tree,
      orientation: OrgChart.orientation.top,
      nodeMenu: {
        add: { text: "Add Child Node" },
        remove: { text: "Remove Node" }
      },
      tags: {
        highlighted: {
          template: "highlighted",
        }
      }
    })
  }
})

const addNode = () => {
  const parentNode = nodes.value[Math.floor(Math.random() * nodes.value.length)]
  const newNode = {
    id: String(nodes.value.length + 1),
    pid: parentNode.id,
    name: String.fromCharCode(65 + nodes.value.length % 26)
  }
  nodes.value.push(newNode)
  if (chart) {
    chart.addNode(newNode)
  }
}

const removeNode = () => {
  if (nodes.value.length > 1) {
    const nodeToRemove = nodes.value[nodes.value.length - 1]
    nodes.value = nodes.value.filter(node => node.id !== nodeToRemove.id)
    if (chart) {
      chart.removeNode(nodeToRemove.id)
    }
  }
}

const startTraversal = (type) => {
  if (isTraversing.value) return
  
  isTraversing.value = true
  currentTraversal.value = []
  selectedTraversal.value = type
  
  const traverse = (nodeId) => {
    if (!nodeId) return
    
    const node = nodes.value.find(n => n.id === nodeId)
    const children = nodes.value.filter(n => n.pid === nodeId)
    
    switch (type) {
      case 'preorder':
        currentTraversal.value.push(node.name)
        children.forEach(child => traverse(child.id))
        break
      case 'inorder':
        if (children[0]) traverse(children[0].id)
        currentTraversal.value.push(node.name)
        if (children[1]) traverse(children[1].id)
        break
      case 'postorder':
        children.forEach(child => traverse(child.id))
        currentTraversal.value.push(node.name)
        break
    }
  }
  
  traverse("1") // Start from root
  isTraversing.value = false
}
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="flex gap-4 justify-center">
      <button
        @click="addNode"
        class="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Add Node
      </button>
      <button
        @click="removeNode"
        class="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        Remove Node
      </button>
    </div>

    <!-- Traversal Controls -->
    <div class="flex gap-4 justify-center">
      <button
        v-for="type in ['preorder', 'inorder', 'postorder']"
        :key="type"
        @click="startTraversal(type)"
        :class="[
          'px-4 py-2 rounded-lg transition-colors capitalize',
          selectedTraversal === type ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
        ]"
      >
        {{ type }}
      </button>
    </div>

    <!-- Traversal Result -->
    <div v-if="currentTraversal.length" class="text-center">
      <p class="text-lg">
        {{ selectedTraversal }} traversal:
        <span class="font-mono">{{ currentTraversal.join(' → ') }}</span>
      </p>
    </div>

    <!-- Tree Visualization -->
    <div ref="chartContainer" class="h-[400px] bg-gray-900 rounded-xl"></div>
  </div>
</template>

<style scoped>
.node {
  transition: all 0.3s ease;
}
</style>