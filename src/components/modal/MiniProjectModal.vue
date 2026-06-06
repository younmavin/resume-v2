<script setup>
import { ref, onMounted } from 'vue'
import ModalBase from './ModalBase.vue'
import { projects } from '@/data/projects.js'

defineEmits(['close', 'open'])

const miniproject = projects.find((p) => p.id === 'miniproject')
const modalRef = ref(null)
const repos = ref([])
const loading = ref(true)
const error = ref(null)
const selectedRepo = ref(null)

const fetchRepos = async () => {
  try {
    const res = await fetch('https://api.github.com/users/younmavin/repos?sort=updated&per_page=20')
    if (!res.ok) throw new Error('GitHub API 오류')
    const data = await res.json()
    repos.value = data.filter((r) => !r.fork)
  } catch (e) {
    error.value = '레포지토리를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchRepos)

const scrollToTop = () => {
  if (modalRef.value?.modalMiddleRef) {
    modalRef.value.modalMiddleRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <ModalBase ref="modalRef" :title="miniproject.label" :icon="miniproject.icon" project-id="miniproject" @close="$emit('close')" @open="$emit('open', $event)">
    <div class="modal-middle-inner miniproject">
      <article>
        <div class="side">
          <div class="side-inner">
            <h5>
              <i class="fa-solid fa-list"></i>
              프로젝트 리스트
            </h5>
            <p v-if="loading" class="side-loading">불러오는 중...</p>
            <p v-else-if="error" class="side-error">{{ error }}</p>
            <ul v-else>
              <li v-for="repo in repos" :key="repo.id" :class="{ active: selectedRepo?.id === repo.id }" @click="selectedRepo = repo">
                <a :href="repo.html_url" target="_blank" @click.stop>
                  <h6>{{ repo.name }}</h6>
                  <p>{{ repo.description || '설명 없음' }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="cont">
          <div class="cont-inner">
            <template v-if="loading"><p class="cont-loading">레포지토리 불러오는 중...</p></template>
            <template v-else-if="error">
              <p class="cont-error">{{ error }}</p>
            </template>
            <template v-else>
              <a v-for="repo in repos" :key="repo.id" :href="repo.html_url" target="_blank">
                <div class="ico"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/git_ico.svg" alt="" /></div>
                {{ repo.name }}
              </a>
            </template>
          </div>
        </div>
      </article>
    </div>
    <template #bottom>
      <p>
        <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/web_ico.png" alt="" />
        미니프로젝트.exe
      </p>
      <button class="btn-top" @click="scrollToTop"><i class="fa-solid fa-arrow-up"></i></button>
    </template>
  </ModalBase>
</template>
