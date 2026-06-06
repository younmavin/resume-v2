<script setup>
import { ref, watch } from 'vue'
import ResumeModal from '@/components/modal/ResumeModal.vue'
import PortFolioModal from '@/components/modal/PortFolioModal.vue'
import MiniProjectModal from '@/components/modal/MiniProjectModal.vue'
import ReadmeModal from '@/components/modal/ReadmeModal.vue'
import { projects } from '@/data/projects.js'

const props = defineProps({
  openModalId: String,
})

const emit = defineEmits(['openModal', 'closeModal'])

const currentModal = ref(null)

watch(
  () => props.openModalId,
  (val) => {
    currentModal.value = val
  },
)

const handleOpen = (item) => {
  currentModal.value = item.id
  emit('openModal', item)
}

const handleClose = () => {
  currentModal.value = null
  emit('closeModal')
}

// prev/next로 모달 전환
const handleNavigate = (id) => {
  const item = projects.find((p) => p.id === id)
  if (item) handleOpen(item)
}
</script>

<template>
  <div class="project-bx">
    <ul>
      <li v-for="item in projects" :key="item.id">
        <button @click="handleOpen(item)">
          <img :src="`https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/${item.icon}`" :alt="item.label" />
          <span>{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>

  <ResumeModal v-if="currentModal === 'resume'" @close="handleClose" @open="handleNavigate" />
  <PortFolioModal v-if="currentModal === 'portfolio'" @close="handleClose" @open="handleNavigate" />
  <MiniProjectModal v-if="currentModal === 'miniproject'" @close="handleClose" @open="handleNavigate" />
  <ReadmeModal v-if="currentModal === 'readme'" @close="handleClose" @open="handleNavigate" />
</template>
