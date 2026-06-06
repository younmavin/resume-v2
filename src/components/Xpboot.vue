<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['done'])
const bootLogo = 'https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/xp_boot_logo.png'

onMounted(() => {
  setTimeout(() => emit('done'), 4300)
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
