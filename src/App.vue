<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <Navigation />
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>