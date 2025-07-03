<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import type { Event } from '@/type'
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[]>([])

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<!-- <template>
  <div class="event">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template> -->

<template>
  <h1>Events For Good</h1>
  <!-- new element -->

  <div class="event">
    <div class="event-card">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="event-info">
      <EventInfo v-for="event in events" :key="`info-${event.id}`" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
