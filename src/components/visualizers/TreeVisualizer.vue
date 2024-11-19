<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrgChart from '@balkangraph/orgchart.js'

interface TreeNode {
  id: string
  pid?: string
  name: string
  tags?: string[]
}

const chartContainer = ref<HTMLElement | null>(null)
let chart: any = null
const currentTraversal = ref<string[]>([])
const isTraversing = ref(false)
const selectedTraversal = ref('inorder')

const nodes = ref<TreeNode[]>([
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
      },
      
    })
  }
})

const addNode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const usedLetters = new Set(nodes.value.map(n => n.name))
  const newLetter = letters.split('').find(l => !usedLetters.has(l))
  if (!newLetter) {
    alert('Maximum nodes reached!')
    return
  }

  const nodeMap = new Map(nodes.value.map(n => [n.id, n]))
  const childCount = new Map<string, number>()
  
  nodes.value.forEach(node => {
    if (node.pid) {
      childCount.set(node.pid, (childCount.get(node.pid) || 0) + 1)
    }
  })

  for (let node of nodes.value) {
    if ((childCount.get(node.id) || 0) < 2) {
      const newId = (Math.max(...nodes.value.map(n => parseInt(n.id))) + 1).toString()
      const newNode = { id: newId, pid: node.id, name: newLetter }
      nodes.value.push(newNode)
      chart.addNode(newNode)
      break
    }
  }
}

const removeNode = () => {
  const childCount = new Map<string, number>()
  nodes.value.forEach(node => {
    if (node.pid) {
      childCount.set(node.pid, (childCount.get(node.pid) || 0) + 1)
    }
  })

  for (let i = nodes.value.length - 1; i >= 0; i--) {
    const node = nodes.value[i]
    if (!childCount.has(node.id)) {
      chart.removeNode(node.id)
      nodes.value.splice(i, 1)
      break
    }
  }
}

// Tree traversal functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const highlightNode = async (nodeId: string) => {
  const node = nodes.value.find(n => n.id === nodeId)
  if (node) {
    node.tags = ['highlighted']
    chart.updateNode(node)
    await delay(1000)
    node.tags = undefined
    chart.updateNode(node)
  }
}

const inorderTraversal = async (nodeId: string, visited: string[] = []) => {
  const children = nodes.value.filter(n => n.pid === nodeId)
  const left = children[0]
  const right = children[1]

  if (left) await inorderTraversal(left.id, visited)
  
  visited.push(nodes.value.find(n => n.id === nodeId)?.name || '')
  await highlightNode(nodeId)
  currentTraversal.value = [...visited]
  
  if (right) await inorderTraversal(right.id, visited)
  return visited
}

const preorderTraversal = async (nodeId: string, visited: string[] = []) => {
  visited.push(nodes.value.find(n => n.id === nodeId)?.name || '')
  await highlightNode(nodeId)
  currentTraversal.value = [...visited]

  const children = nodes.value.filter(n => n.pid === nodeId)
  for (const child of children) {
    await preorderTraversal(child.id, visited)
  }
  return visited
}

const postorderTraversal = async (nodeId: string, visited: string[] = []) => {
  const children = nodes.value.filter(n => n.pid === nodeId)
  for (const child of children) {
    await postorderTraversal(child.id, visited)
  }
  
  visited.push(nodes.value.find(n => n.id === nodeId)?.name || '')
  await highlightNode(nodeId)
  currentTraversal.value = [...visited]
  return visited
}

const startTraversal = async () => {
  if (isTraversing.value) return
  isTraversing.value = true
  currentTraversal.value = []
  
  try {
    switch (selectedTraversal.value) {
      case 'inorder':
        await inorderTraversal('1')
        break
      case 'preorder':
        await preorderTraversal('1')
        break
      case 'postorder':
        await postorderTraversal('1')
        break
    }
  } finally {
    isTraversing.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
   

    <!-- Tree Visualization -->
    <div 
      ref="chartContainer" 
      class="w-full h-[400px] bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50"
    ></div>

     <!-- Controls -->
    <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 space-y-6">
      <h2 class="text-xl font-semibold text-white mb-4">Tree Operations</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Tree Traversals -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-purple-400">Traversal Types</h3>
          <div class="space-y-3">
            <div>
              <span class="text-green-400 font-medium">Inorder (LNR):</span>
              <p class="text-gray-300">Visit left subtree, process node, visit right subtree</p>
            </div>
            <div>
              <span class="text-green-400 font-medium">Preorder (NLR):</span>
              <p class="text-gray-300">Process node, visit left subtree, visit right subtree</p>
            </div>
            <div>
              <span class="text-green-400 font-medium">Postorder (LRN):</span>
              <p class="text-gray-300">Visit left subtree, visit right subtree, process node</p>
            </div>
          </div>
        </div>

        <!-- Node Operations -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-purple-400">Node Operations</h3>
          <div class="space-y-3">
            <div>
              <span class="text-pink-400 font-medium">Add Node:</span>
              <p class="text-gray-300">Adds a new node to the first available parent with less than 2 children</p>
            </div>
            <div>
              <span class="text-pink-400 font-medium">Remove Node:</span>
              <p class="text-gray-300">Removes a leaf node (node without children) from the tree</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Implementation Details -->
    <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
      <h2 class="text-xl font-semibold text-white mb-4">Implementation Details</h2>
      <div class="text-gray-300 space-y-2">
        <p>• The tree is implemented as a binary tree where each node can have up to 2 children</p>
        <p>• Nodes are labeled with letters (A-Z) in the order they are added</p>
        <p>• The visualization uses a top-down layout with animated traversals</p>
        <p>• Node operations maintain the binary tree structure and handle edge cases</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom styles for the org chart */
.node {
  background-color: rgba(31, 41, 55, 0.8) !important;
  border: 2px solid rgb(168, 85, 247) !important;
  border-radius: 50% !important;
  color: white !important;
  transition: all 0.3s ease !important;
  backdrop-filter: blur(8px) !important;
}

.node:hover {
  transform: scale(1.1) !important;
}

.node rect {
  fill: rgb(31, 41, 55) !important;
  stroke: rgb(168, 85, 247) !important;
  rx: 40px !important;
  ry: 40px !important;
}

.node text {
  fill: white !important;
  font-weight: 600 !important;
}

.link {
  stroke: rgb(75, 85, 99, 0.6) !important;
}

/* Animation for traversal */
@keyframes highlight {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.highlighted {
  animation: highlight 0.5s ease;
}
</style>