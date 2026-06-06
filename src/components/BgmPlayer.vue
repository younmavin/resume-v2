<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const isPlaying = ref(false)
const currentTrack = ref(0)
const volume = ref(50)
const progress = ref(0)
const currentTimeStr = ref('0:00')
const isMuted = ref(false)

const tracks = [
  { name: 'bgm01.mp3', src: 'https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/audio/bgm01.mp3' },
  { name: 'bgm02.mp3', src: 'https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/audio/bgm02.mp3' },
  { name: 'bgm03.mp3', src: 'https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/audio/bgm03.mp3' },
]

let audio = null

const fmt = (s) => {
  const sec = Math.floor(s)
  return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0')
}

const loadTrack = (index, autoPlay = false) => {
  if (audio) {
    audio.pause()
    audio.removeEventListener('timeupdate', onTimeUpdate)
    audio.removeEventListener('ended', onEnded)
  }
  currentTrack.value = index
  audio = new Audio(tracks[index].src)
  audio.volume = volume.value / 100
  audio.muted = isMuted.value
  audio.addEventListener('timeupdate', onTimeUpdate)
  audio.addEventListener('ended', onEnded)
  if (autoPlay || isPlaying.value) {
    audio.play()
    isPlaying.value = true
  }
}

const onTimeUpdate = () => {
  if (!audio) return
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
  currentTimeStr.value = fmt(audio.currentTime)
}

const onEnded = () => nextTrack()

const togglePlay = () => {
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.play()
    isPlaying.value = true
  }
}

const stopTrack = () => {
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
  isPlaying.value = false
}

const prevTrack = () => loadTrack((currentTrack.value - 1 + tracks.length) % tracks.length)
const nextTrack = () => loadTrack((currentTrack.value + 1) % tracks.length)
const selectTrack = (i) => loadTrack(i, true)

const onProgressClick = (e) => {
  if (!audio || !audio.duration) return
  const rect = e.currentTarget.getBoundingClientRect()
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
}

const onVolumeClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  volume.value = Math.min(100, Math.max(0, Math.round(((e.clientX - rect.left) / rect.width) * 100)))
  if (audio) audio.volume = volume.value / 100
}

// 뮤트 외부에서 제어 가능하게
const setMuted = (val) => {
  isMuted.value = val
  if (audio) audio.muted = val
}

defineExpose({ setMuted })

// 첫 클릭 시 자동재생
const autoPlay = () => {
  if (audio && !isPlaying.value) {
    audio.play()
    isPlaying.value = true
  }
  document.removeEventListener('click', autoPlay)
}

onMounted(() => {
  loadTrack(0)
  document.addEventListener('click', autoPlay)
})

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio = null
  }
  document.removeEventListener('click', autoPlay)
})
</script>

<template>
  <div class="bgm-player" @click.stop>
    <div class="bgm-titlebar">
      <span>🎵 BGM.mp3</span>
      <button class="bgm-close" @click="$emit('close')"><i class="fa-solid fa-x"></i></button>
    </div>
    <div class="bgm-body">
      <div class="bgm-screen">
        <div class="bgm-track-name">{{ isPlaying ? '▶' : '■' }} {{ tracks[currentTrack].name }}</div>
        <div class="bgm-time">{{ currentTimeStr }}</div>
      </div>
      <div class="bgm-progress" @click="onProgressClick">
        <div class="bgm-progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="bgm-vol-row">
        <span class="bgm-vol-label">VOL</span>
        <div class="bgm-vol" @click="onVolumeClick">
          <div class="bgm-vol-fill" :style="{ width: volume + '%' }"></div>
        </div>
        <span class="bgm-vol-pct">{{ volume }}%</span>
      </div>
      <div class="bgm-controls">
        <button @click="prevTrack"><i class="fa-solid fa-backward-step"></i></button>
        <button @click="togglePlay"><i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i></button>
        <button @click="stopTrack"><i class="fa-solid fa-stop"></i></button>
        <button @click="nextTrack"><i class="fa-solid fa-forward-step"></i></button>
      </div>
      <div class="bgm-playlist">
        <div class="bgm-pl-header">
          <span>재생 목록</span>
          <span>{{ tracks.length }}곡</span>
        </div>
        <div v-for="(track, i) in tracks" :key="i" class="bgm-pl-item" :class="{ active: currentTrack === i }" @click="selectTrack(i)">
          {{ track.name }}
        </div>
      </div>
    </div>
  </div>
</template>
