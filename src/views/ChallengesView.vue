<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useChallengesStore } from '../stores/challenges'
import ChallengeEditor from '../components/ChallengeEditor.vue'

const route = useRoute()
const type = computed(() => route.params.type)
const challengesStore = useChallengesStore()

const selectedChallenge = ref(null)

const challenges = computed(() => challengesStore.challenges[type.value] || [])

const selectChallenge = (challenge) => {
  selectedChallenge.value = challenge
}
</script>

<template>
  <div class="space-y-8">
    <header class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }} Challenges</h1>
      <p class="text-xl text-gray-300">Test your knowledge with these practical exercises</p>
    </header>

    <div v-if="selectedChallenge" class="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div class="mb-4">
        <button
          @click="selectedChallenge = null"
          class="text-gray-400 hover:text-white"
        >
          ← Back to challenges
        </button>
      </div>
      <ChallengeEditor :challenge="selectedChallenge" />
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2">
      <div
        v-for="challenge in challenges"
        :key="challenge.title"
        @click="selectChallenge(challenge)"
        class="bg-gray-800 rounded-xl p-6 border border-gray-700 cursor-pointer hover:border-purple-500 transition-colors"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-semibold">{{ challenge.title }}</h3>
          <span 
            class="px-3 py-1 rounded text-sm"
            :class="{
              'bg-green-500/20 text-green-300': challenge.difficulty === 'Easy',
              'bg-yellow-500/20 text-yellow-300': challenge.difficulty === 'Medium',
              'bg-red-500/20 text-red-300': challenge.difficulty === 'Hard'
            }"
          >
            {{ challenge.difficulty }}
          </span>
        </div>
        <p class="text-gray-300">{{ challenge.description }}</p>
      </div>
    </div>
  </div>
</template>