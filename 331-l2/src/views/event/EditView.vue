<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'


const props = defineProps<{
  event: Event
  id: String
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const store = useMessageStore()
const router = useRouter()
const editEvent = () => {
  store.updateMessage('The data has been updated.')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template>
  <p>Edit event here</p>
  <button @click="editEvent">Edit</button>

</template>
