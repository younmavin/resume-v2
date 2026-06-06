<script setup>
import { projects } from '@/data/projects.js'

const emit = defineEmits(['openModal', 'close'])

const handleItem = (item) => {
  emit('openModal', item)
  emit('close')
}
</script>

<template>
  <div class="submenu-inner">
    <div class="tit-wrap">
      <h3>MAVIN PORTFOLIO</h3>
    </div>
    <nav class="custom-scroll">
      <ul>
        <li v-for="item in projects" :key="item.id" @click.prevent="handleItem(item)">
          <div>
            <img :src="`https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/${item.icon}`" :alt="item.label" />
            {{ item.label }}
          </div>
          <i class="fa-solid fa-caret-right"></i>
        </li>
      </ul>
      <button class="btn-logout" @click="emit('close')">
        <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/logout_ico.svg" alt="" />
        닫기
      </button>
    </nav>
  </div>
</template>
