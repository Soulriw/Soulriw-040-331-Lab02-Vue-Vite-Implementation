import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/components/EventDetailView.vue'
import StudentListView from '@/components/StudentListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/students',
      name: 'Students',
      component: StudentListView,
    },
    {
      path: '/event/5928101',
      name: 'event-detail-view',
      component: EventDetailView
    },
  ],
})

export default router
