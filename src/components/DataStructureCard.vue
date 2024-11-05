<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  description: string
  icon: string
  route: string
}>()

const router = useRouter()
</script>

<template>
  <div 
    @click="router.push(route)"
    class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all cursor-pointer transform hover:-translate-y-1 border border-gray-700"
  >
    <div class="text-4xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>