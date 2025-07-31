<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event" class="text-center font-sans text-gray-700">
    <h1 class="text-3xl font-bold text-[#2c3e50] mb-6">{{ event.title }}</h1>
    <nav class="py-[30px]">
      <RouterLink class="font-bold text-[#2c3e50] hover:text-[#42b983] no-underline mx-2" :to="{ name: 'event-detail-view' }">Details</RouterLink> |
      <RouterLink class="font-bold text-[#2c3e50] hover:text-[#42b983] no-underline mx-2" :to="{ name: 'event-register-view' }">Register</RouterLink> |
      <RouterLink class="font-bold text-[#2c3e50] hover:text-[#42b983] no-underline mx-2" :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
</template>
