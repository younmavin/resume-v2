<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const profile = [
  { icon: 'fa-solid fa-user', text: '윤관호 / 1996.04.12', link: null },
  { icon: 'fa-solid fa-envelope', text: 'ddw6229@naver.com', link: 'mailto:ddw6229@naver.com' },
  { icon: 'fa-solid fa-phone', text: '010-9506-1006', link: 'tel:01095061006' },
  { icon: 'fa-brands fa-github', text: 'https://github.com/younmavin', link: 'https://github.com/younmavin' },
]

const education = [
  { name: '광주자연과학고등학교', period: '2015.02 졸업' },
  { name: '목포대학교(간호학과)', period: '2015.03 ~ 2020.06 중퇴' },
  { name: '학점은행제(컴퓨터공학 + 관광경영학)', period: '2024.02 ~ 2026 졸업예정' },
]

const career = [
  { name: '경성문화사', period: '2023.11 ~ 2026.02' },
  { name: '제이브로 컴퍼니', period: '2022.05 ~ 2023.06' },
]

const skills = ['HTML', 'CSS/SCSS', 'JQuery / Java Script', 'Vue.js', 'Ajax', '라이브러리(부트스트랩, GSAP 등)', '포토샵', '피그마 / XD', 'Git / Svn']
const certificates = ['웹디자인 기능사', 'GTQ 1급(포토샵)', 'GTQI 1급(일러스트)', 'JLPT N1(일본어)', '레크레이션 강사 1급', '웃음치료사 1급', '펀리더쉽 지도자 1급']

const BOX_W = 500
const BOX_H = 800

const isMobile = ref(window.innerWidth <= 768)
const pos = ref({ x: window.innerWidth - BOX_W - 60, y: 60 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const onDragStart = (e) => {
  if (isMobile.value) return
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - pos.value.x,
    y: e.clientY - pos.value.y,
  }
}

const onDragMove = (e) => {
  if (!isDragging.value || isMobile.value) return
  pos.value = {
    x: Math.max(0, Math.min(e.clientX - dragOffset.value.x, window.innerWidth - BOX_W)),
    y: Math.max(0, Math.min(e.clientY - dragOffset.value.y, window.innerHeight - BOX_H)),
  }
}

const onDragEnd = () => {
  isDragging.value = false
}

const clampPos = () => {
  isMobile.value = window.innerWidth <= 768
  pos.value = {
    x: Math.max(0, Math.min(pos.value.x, window.innerWidth - BOX_W)),
    y: Math.max(0, Math.min(pos.value.y, window.innerHeight - BOX_H)),
  }

  if (pos.value.x < 0 || pos.value.x > window.innerWidth - BOX_W) {
    pos.value = {
      x: Math.max(0, window.innerWidth - BOX_W - 60),
      y: 60,
    }
  }
}

const emit = defineEmits(['close'])

onMounted(() => {
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('resize', clampPos)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('resize', clampPos)
})
</script>

<template>
  <div class="info-bx" :style="isMobile ? {} : { left: pos.x + 'px', top: pos.y + 'px' }" :class="{ 'is-mobile': isMobile }">
    <div class="info-top" @mousedown="onDragStart">
      <h3>웹퍼블리셔 윤관호.exe</h3>
      <button class="btn-close" @click="emit('close')"><i class="fa-solid fa-x"></i></button>
    </div>

    <div class="info-middle custom-scroll">
      <div class="cont cont01">
        <div class="visual"><img src="../assets/images/profile.png" alt="" /></div>
        <ul>
          <li v-for="item in profile" :key="item.text">
            <a v-if="item.link" :href="item.link" target="_blank">
              <i :class="item.icon"></i>
              {{ item.text }}
            </a>
            <div v-else>
              <i :class="item.icon"></i>
              {{ item.text }}
            </div>
          </li>
        </ul>
      </div>

      <div class="cont02 cont">
        <div>
          <h6>학력</h6>
          <ul>
            <li v-for="item in education" :key="item.name">
              {{ item.name }}
              <small>{{ item.period }}</small>
            </li>
          </ul>
        </div>
        <div>
          <h6>경력</h6>
          <ul>
            <li v-for="item in career" :key="item.name">
              {{ item.name }}
              <small>{{ item.period }}</small>
            </li>
          </ul>
        </div>
      </div>

      <div class="cont03 cont">
        <div>
          <h6>사용스킬</h6>
          <ul>
            <li v-for="item in skills" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h6>자격증</h6>
          <ul>
            <li v-for="item in certificates" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
