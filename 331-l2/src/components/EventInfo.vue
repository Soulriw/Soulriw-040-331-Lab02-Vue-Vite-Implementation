<script setup lang="ts">
import { type Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-class">
    <div class="p-5 w-[250px] cursor-pointer border border-[#39495c] mb-[18px] text-right hover:scale-[1.01] hover:shadow-sp">
      <h3>Category: {{ event.category }}</h3>
      <h3>Organizer: {{ event.organizer }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>
