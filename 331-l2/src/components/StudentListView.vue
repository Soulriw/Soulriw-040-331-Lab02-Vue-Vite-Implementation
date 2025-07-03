<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'
import type { Student } from '@/student-types'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      students.value = response.data
    })
    .catch((error) => {
      console.error('There was an error fetching students!', error)
    })
})
</script>

<template>
  <h1>Student Directory</h1>
  
  <div class="students">
    <div class="student-grid">
      <StudentCard v-for="student in students" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}
</style>