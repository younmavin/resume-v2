<script setup>
import { ref } from 'vue'
import Footer from '@/components/Footer.vue'
import ProjectView from '@/components/ProjectView.vue'
import InfoView from '@/components/InfoView.vue'
import Contact from '@/components/Contact.vue'
import XpBoot from '@/components/Xpboot.vue'

const isBooting = ref(true)
const openModal = ref(null)
const isContactOpen = ref(false)
const isMobile = window.innerWidth <= 768
const isInfoOpen = ref(!isMobile)
</script>

<template>
  <main>
    <XpBoot v-if="isBooting" @done="isBooting = false" />
    <section class="container">
      <router-view />
      <ProjectView :open-modal-id="openModal?.id" @open-modal="openModal = $event" @close-modal="openModal = null" />
      <InfoView v-if="isInfoOpen" @close="isInfoOpen = false" />
      <h1 class="typing-txt">MAVIN PORTFOLIO</h1>
    </section>
  </main>
  <Contact v-if="isContactOpen" :is-open="isContactOpen" @close="isContactOpen = false" />
  <Footer @toggle-info="isInfoOpen = !isInfoOpen" :is-info-open="isInfoOpen" :open-modal="openModal" @close-modal="openModal = null" @toggle-contact="isContactOpen = !isContactOpen" @open-modal="openModal = $event" />
</template>
