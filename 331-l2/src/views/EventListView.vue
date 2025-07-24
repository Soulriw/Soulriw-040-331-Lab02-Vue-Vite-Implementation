<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    default: 2,
  },
})
const page = computed(() => props.page)
const pageSize = computed(() => props.size)

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
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

  <div class="page-size-selector">
    <label for="page-size">Events per page: </label>
    <select id="page-size" :value="pageSize" @change="updatePageSize">
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>

  <div class="event">
    <div class="event-card">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>

    <div class="event-info">
      <EventInfo v-for="event in events" :key="`info-${event.id}`" :event="event" />
    </div>

    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    updatePageSize(event: any) {
      const newSize = parseInt(event.target.value)
      this.$router.push({
        name: 'event-list-view',
        query: { page: 1, size: newSize },
      })
    },
  },
}
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
