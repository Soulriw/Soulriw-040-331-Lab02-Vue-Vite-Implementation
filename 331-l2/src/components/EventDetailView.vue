<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const event = ref<Event | null>(null)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <div v-if="event" class="text-center font-sans text-gray-700 max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-[#2c3e50] mb-4">{{ event.title }}</h1>
    <p class="text-lg text-gray-600 mb-4">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p class="text-gray-800 leading-relaxed">{{ event.description }}</p>
  </div>
</template>


// https://my-json-server.typicode.com/Soulriw/db-02/events?_limit=2&_page=1
