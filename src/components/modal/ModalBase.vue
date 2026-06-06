<script setup>
import { ref, computed } from 'vue'
import { projects } from '@/data/projects.js'

const props = defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: 'word_ico.png' },
  projectId: { type: String, default: '' },
})

const emit = defineEmits(['close', 'open'])

const modalMiddleRef = ref(null)
defineExpose({ modalMiddleRef })

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) emit('close')
}

// prev / next
const currentIndex = computed(() => projects.findIndex((p) => p.id === props.projectId))
const hasPrev = computed(() => true)
const hasNext = computed(() => true)

const goPrev = () => {
  const prevIndex = (currentIndex.value - 1 + projects.length) % projects.length
  emit('open', projects[prevIndex].id)
}
const goNext = () => {
  const nextIndex = (currentIndex.value + 1) % projects.length
  emit('open', projects[nextIndex].id)
}
</script>

<template>
  <div class="modal-wrap" @click="handleBackdropClick">
    <div class="modal-inner">
      <div class="modal-top">
        <div class="tit">
          <h3>
            <img :src="`https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/${icon}`" alt="" />
            {{ title }}
          </h3>
          <button class="btn-close" @click="emit('close')"><i class="fa-solid fa-x"></i></button>
        </div>
        <div class="util">
          <div class="paging">
            <button :disabled="!hasPrev" @click="goPrev">
              <img src="@/assets/images/icons/prev_ico.svg" alt="이전" />
            </button>
            <span class="line"></span>
            <button :disabled="!hasNext" @click="goNext">
              <img src="@/assets/images/icons/next_ico.svg" alt="다음" />
            </button>
          </div>
          <span class="line"></span>
          <a class="btn-pdf" href="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/files/resume.pdf" download="resume.pdf">
            <img src="@/assets/images/icons/pdf_ico.svg" alt="PDF 다운로드" />
          </a>
          <slot name="util" />
        </div>
      </div>

      <div class="modal-middle custom-scroll" ref="modalMiddleRef">
        <slot />
      </div>

      <div class="modal-bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>
