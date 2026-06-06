<script setup>
import { ref } from 'vue'
import ModalBase from './ModalBase.vue'
import { projects } from '@/data/projects.js'

defineEmits(['close', 'open'])

const portfolio = projects.find((p) => p.id === 'portfolio')
const modalRef = ref(null)

const scrollToTop = () => {
  if (modalRef.value?.modalMiddleRef) {
    modalRef.value.modalMiddleRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const BASE_URL = 'https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images'
const getImage = (filename) => `${BASE_URL}/${filename}`

const webzines = [
  {
    label: 'TS 매거진',
    title: '한국교통안전공단 웹진',
    rate: [{ text: '마크업 100%' }, { text: '디자인 20%(서브페이지)' }],
    skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript', '#GSAP', '#Lenis Scroll'],
    img: 'p01.png',
    link: 'http://tsmagazine.co.kr',
    desc: [{ text: 'GSAP + Lenis Scroll을 사용하여 부드러운 인터랙션 및 동적인 애니메이션 연출' }, { text: '#다함께 가자GO 카테고리 디자인 지원(페이지 8개)' }],
  },
  { label: '사학연금', title: '사학연금 웹진', rate: [{ text: '마크업 100%' }], skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript'], img: 'p02.png', link: 'https://www.tpwebzine.com', desc: [{ text: 'JavaScript·Css를 활용해 물결 효과, 텍스트 무한 슬라이드, 오브젝트 회전 등 스크롤 기반 애니메이션 및 다양한 인터랙션 구현' }] },
  {
    label: '삼구애',
    title: '삼구아이앤씨 웹진',
    rate: [{ text: '마크업 100%' }, { text: '디자인 20%(서브페이지)' }],
    skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript', '#GSAP', '#Ajax'],
    img: 'p03.png',
    link: 'https://webzine.samkoo.com/page/vol25/index.html',
    desc: [{ text: 'GSAP Scroll Trigger를 활용해 카드 흔들리는 모션 연출' }, { text: '행운쿠키 클릭시 랜덤 메세지 및 애니메이션 연출' }, { text: 'Ajax를 활용해 참가자 데이터를 받아와 민들레 fill 애니메이션 연출', link: 'https://webzine.samkoo.com/page/vol25/20.html' }, { text: '삼구 이벤트 & 캠페인 카테고리 디자인 지원(페이지 7개)' }],
  },
  {
    label: '청아람',
    title: '방위사업청 웹진',
    rate: [{ text: '마크업 100%' }],
    skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript'],
    img: 'p04.png',
    link: 'https://dapa-magazine.kr/page/vol146/index.html',
    desc: [
      { text: 'JavaScript 이벤트 핸들링을 활용한 OX퀴즈 기능 구현', link: 'https://dapa-magazine.kr/page/vol145/event.html' },
      { text: 'JavaScript 이벤트 핸들링을 활용한 투표 기능 구현', link: 'https://dapa-magazine.kr/page/vol145/00.html' },
      { text: '메인 페이지 인트로 구현', link: 'https://dapa-magazine.kr/page/vol145/index.html' },
    ],
  },
  {
    label: '레일로',
    title: '한국철도공사 웹진',
    rate: [{ text: '마크업 100%' }],
    skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript'],
    img: 'p05.png',
    link: 'https://www.korailstory.com/page/vol14/index.html',
    desc: [{ text: 'JavaScript·Css를 활용해 철도 애니메이션 연출' }, { text: 'JavaScript 이벤트 핸들링을 활용한 음식 맞추기 이벤트 구현', link: 'https://www.korailstory.com/page/vol14/event.html' }],
  },
  {
    label: '중부가족',
    title: '한국중부발전 웹진',
    rate: [{ text: '마크업 100%' }, { text: '디자인 20%(서브페이지)' }],
    skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript', '#FullPage'],
    img: 'p06.png',
    link: 'https://komipo-webzine.co.kr/page/vol25/index.html',
    desc: [{ text: 'FullPage Scroll을 사용한 동적 페이지 구현' }, { text: 'JavaScript 이벤트 핸들링을 활용한 틀린그림 찾기 이벤트 구현', link: 'https://komipo-webzine.co.kr/page/vol25/event.html' }, { text: '코미포 세상에 카테고리 디자인 지원(페이지 8개)' }],
  },
  { label: null, title: '씽크블락 웹사이트', rate: [{ text: '마크업 100%' }, { text: '디자인 100%' }], skills: ['#HTML', '#Css/Scss', '#JQuery/JavaScript'], img: 'p07.png', link: 'http://thinkblock.co.kr', desc: [{ text: '전체 페이지 코딩 및 디자인 전반에 참여' }, { text: '일본어 번역 전반에 참여' }] },
]

const etcList = [
  { title: '고용노동부 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript', '#PHP'], link: 'https://www.labor21.kr' },
  { title: '서울특별시의회 웹진', rate: ['마크업 50%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://webzine.smc.seoul.kr' },
  { title: '도로교통공단 웹진', rate: ['마크업 100%', '디자인 50%'], skills: ['#HTML', '#Css', '#JavaScript', '#PHP'], link: 'https://webzineplace.co.kr/remote/service/koroad/vol90/index.php' },
  { title: '공무원연금공단 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript', '#FullPage'], link: 'https://webzineplace.co.kr/remote/service/geps/vol01' },
  { title: '용산구청 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://yongsannews.com' },
  { title: '해안선 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://komsa-webzine.co.kr' },
  { title: '지방공공기관 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript', '#Jsp'], link: 'https://www.erc.re.kr/webzine/vol52/' },
  { title: '프로스포츠협회 웹진', rate: ['마크업 50%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://webzine.prosports.or.kr' },
  { title: '감정평가사협회 웹진', rate: ['마크업 100%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://www.kapanet.or.kr/kapawebzine/data/158' },
  { title: '서울대학교 웹진', rate: ['마크업 60%'], skills: ['#HTML', '#Css', '#JavaScript'], link: 'https://people.snu.ac.kr/83' },
  { title: 'VAEX 웹사이트', rate: ['마크업 100%', '디자인 100%'], skills: ['#HTML', '#Css', '#JavaScript', '#일본어 번역'], link: 'https://www.vaex.info' },
]
</script>

<template>
  <ModalBase ref="modalRef" :title="portfolio.label" :icon="portfolio.icon" project-id="portfolio" @close="$emit('close')" @open="$emit('open', $event)">
    <div class="modal-middle-inner">
      <div class="bg"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/p_bg.png" alt="" /></div>
      <article v-for="(item, i) in webzines" :key="i">
        <hgroup>
          <h6 v-if="item.label">{{ item.label }}</h6>
          <h2>{{ item.title }}</h2>
          <div class="rate" :class="{ line: item.rate.length > 1 }">
            <span v-for="r in item.rate" :key="r.text">{{ r.text }}</span>
          </div>
          <div class="skill">
            <span v-for="s in item.skills" :key="s">{{ s }}</span>
          </div>
        </hgroup>
        <div class="img-bx"><img :src="getImage(item.img)" alt="" /></div>
        <a class="btn-link" :href="item.link" target="_blank">
          사이트 바로가기
          <i class="fa-solid fa-arrow-right"></i>
        </a>
        <ol>
          <li v-for="(d, j) in item.desc" :key="j" class="data-txt" :data-txt="`${j + 1})`">
            <a v-if="d.link" class="txt-link" :href="d.link" target="_blank">
              {{ d.text }}
              <i class="fa-solid fa-link"></i>
            </a>
            <template v-else>{{ d.text }}</template>
          </li>
        </ol>
      </article>
      <article class="mb-none">
        <hgroup class="pb-none"><h2>그 외 사이트</h2></hgroup>
        <ul class="p-list">
          <li v-for="(e, i) in etcList" :key="i">
            <a :href="e.link" target="_blank">
              <div class="txt-wrap">
                <div class="txt">
                  <h6>{{ e.title }}</h6>
                  <div class="rate">
                    <span v-for="r in e.rate" :key="r">{{ r }}</span>
                  </div>
                </div>
                <div class="skill">
                  <span v-for="s in e.skills" :key="s">{{ s }}</span>
                </div>
              </div>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </li>
        </ul>
      </article>
    </div>
    <template #bottom>
      <p>
        <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/web_ico.png" alt="" />
        포트폴리오.exe
      </p>
      <button class="btn-top" @click="scrollToTop"><i class="fa-solid fa-arrow-up"></i></button>
    </template>
  </ModalBase>
</template>
