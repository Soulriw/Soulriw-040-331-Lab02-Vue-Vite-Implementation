<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages 
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)

onMounted(() => {
  watchEffect(() => {
    events.value = null
        EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
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

    <RouterLink :to="{ name: 'event-list-view', query: { page: page - 1 } }" rel="prev" v-if="page != 1">Prev Page</RouterLink>
    <RouterLink :to="{ name: 'event-list-view', query: { page: page + 1 } }" rel="next" v-if="hasNextPage">Next Page</RouterLink>

  </div>
</template>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
