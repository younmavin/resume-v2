<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['done'])
import bootLogo from '../assets/images/xp_boot_logo.png'

onMounted(() => {
  const img = new Image()
  img.src = bootLogo
  img.onload = () => {
    // 이미지 로드 완료 후 타이머 시작
    setTimeout(() => emit('done'), 4300)
  }
})
</script>

<template>
  <div class="xp-boot">
    <div class="xp-boot-logo-wrap">
      <img :src="bootLogo" alt="MAVIN Portfolio" class="xp-boot-logo" />
    </div>
    <div class="xp-boot-bar-wrap">
      <div class="xp-boot-bar">
        <div class="xp-boot-track">
          <div class="xp-boot-block"></div>
          <div class="xp-boot-block"></div>
          <div class="xp-boot-block"></div>
        </div>
      </div>
    </div>
    <div class="xp-boot-footer">
      <span>Copyright © 2026 Mavin Portfolio</span>
    </div>
  </div>
</template>
