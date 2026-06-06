<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BgmPlayer from './BgmPlayer.vue'
import SubMenu from './Submenu.vue'

const props = defineProps({
  isInfoOpen: Boolean,
  openModal: Object,
})

const emit = defineEmits(['toggleInfo', 'closeModal', 'toggleContact', 'openModal'])

const isMenuOpen = ref(false)
const currentTime = ref('')
const currentDate = ref('')
const isMuted = ref(false)
const isPlayerOpen = ref(false)

const menuRef = ref(null)
const playerRef = ref(null)
const bgmPlayerRef = ref(null)

const updateTime = () => {
  const now = new Date()
  const h = now.getHours()
  const m = String(now.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? '오후' : '오전'
  const h12 = String(h % 12 || 12).padStart(2, '0')
  currentTime.value = `${ampm}${h12}:${m}`
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  currentDate.value = `${yyyy}-${mm}-${dd}`
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  bgmPlayerRef.value?.setMuted(isMuted.value)
}

const togglePlayer = () => {
  isPlayerOpen.value = !isPlayerOpen.value
}

const handleOpenModal = (item) => {
  emit('openModal', item)
}

const handleOutsideClick = (e) => {
  if (isMenuOpen.value && menuRef.value && !menuRef.value.contains(e.target)) {
    isMenuOpen.value = false
  }
  if (isPlayerOpen.value && playerRef.value && !playerRef.value.contains(e.target)) {
    isPlayerOpen.value = false
  }
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('click', handleOutsideClick)
})

const showBgmNotice = ref(true)

const closeBgmNotice = () => {
  showBgmNotice.value = false
  document.removeEventListener('click', closeBgmNotice)
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('click', closeBgmNotice)
  }, 100) // 마운트 직후 클릭 방지용 딜레이
})
</script>

<template>
  <footer>
    <div class="f-inner">
      <div class="left" ref="menuRef">
        <div class="submenu" :class="{ active: isMenuOpen }">
          <SubMenu @open-modal="handleOpenModal" @close="isMenuOpen = false" />
        </div>
        <button class="btn-menu custom-btn" :class="{ on: isMenuOpen }" @click="isMenuOpen = !isMenuOpen">
          <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/window_ico.png" alt="" />
          <span>메뉴</span>
        </button>
      </div>

      <div class="center">
        <button v-if="props.openModal" class="custom-btn btn-web" @click="emit('closeModal')">
          <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/ie_ico.png" alt="" />
          {{ props.openModal.label }}.exe
          <i class="fa-solid fa-x"></i>
        </button>
        <button class="btn-info custom-btn" @click="emit('toggleInfo')">
          <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/ie_ico.png" alt="" />
          <span>웹퍼블리셔 윤관호.exe</span>
        </button>
      </div>

      <BgmPlayer v-show="isPlayerOpen" ref="bgmPlayerRef" @close="isPlayerOpen = false" />

      <div class="right">
        <button class="btn-mail custom-btn" @click="emit('toggleContact')">
          <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/mail_ico.png" alt="" />
          <span>메일 보내기</span>
        </button>
        <div class="tray">
          <div class="bgm-deps" v-if="showBgmNotice">
            <div class="inner">
              <div class="ico"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/alert_ico.png" alt="" /></div>
              <p>해당 웹사이트는 BGM을 제공하고 있습니다. BGM을 선택할 수 있으니 참고 바랍니다.</p>
            </div>
          </div>
          <div class="tray-icons" ref="playerRef">
            <i class="fa-solid fa-sliders" title="BGM 플레이어" @click.stop="togglePlayer"></i>
            <i class="fa-solid" :class="isMuted ? 'fa-volume-xmark' : 'fa-volume-high'" title="음소거" @click.stop="toggleMute"></i>
          </div>
          <div class="tray-clock">
            <span class="time">{{ currentTime }}</span>
            <span class="date">{{ currentDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
