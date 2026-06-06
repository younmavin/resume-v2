<script setup>
import { ref } from 'vue'
import ModalBase from './ModalBase.vue'
import { projects } from '@/data/projects.js'

defineEmits(['close', 'open'])

const readme = projects.find((p) => p.id === 'readme')
const modalRef = ref(null)

const scrollToTop = () => {
  if (modalRef.value?.modalMiddleRef) {
    modalRef.value.modalMiddleRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const careers = [
  { text: 'Vue.js SFC 기반 공통 컴포넌트 모듈화 및 데이터 바인딩 구현' },
  { text: '공통 스타일 변수 및 함수화를 통한 코드 재사용성 향상 및 유지보수 효율 개선' },
  { text: 'EmailJS를 활용한 실제 메일 발송 기능 구현' },
  { text: 'GitHub REST API 연동을 통한 레포지토리 동적 조회 및 렌더링 구현' },
  { text: 'Amazon S3를 활용한 이미지 리소스 외부 저장 및 CDN 배포를 통한 트래픽 최적화' },
  { text: 'Google Analytics 연동을 통한 사용자 행동 데이터 수집 및 트래킹 구현' },
]
</script>

<template>
  <ModalBase ref="modalRef" :title="readme.label" :icon="readme.icon" project-id="readme" @close="$emit('close')" @open="$emit('open', $event)">
    <div class="modal-middle-inner">
      <hgroup>
        <h3>열람해주셔서 감사드립니다.</h3>
        <p>
          이 포트폴리오는
          <b>Windows 98 + Windows XP</b>
          테마를 기반으로 레트로한 감성을 살려 제작했습니다.
          <br />
          부팅 인트로 화면부터 하단 툴바, 창 UI 폼, 아이콘 이미지 소스, 레트로 BGM까지 XP 감성을 하나하나 디테일하게 구현했으며, 화면에 보이는 모든 UI 요소는 실제 기능을 제공하고 있으니 참고바랍니다.
        </p>
      </hgroup>
      <article>
        <h5>작업내용</h5>
        <ol>
          <li v-for="(c, i) in careers" :key="i" class="data-txt" :data-txt="`${i + 1})`">
            <div>
              {{ c.text }}
            </div>
          </li>
        </ol>
      </article>
      <article>
        <h5>UI 화면 설계</h5>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme01.png" alt="" /></div>
        <p class="caption">옛날 Windows 로딩화면 구현</p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme02.png" alt="" /></div>
        <p class="caption">
          <span class="data-txt" data-txt="1)">
            <div>
              <i class="fa-solid fa-sliders"></i>
              아이콘 클릭 시 BGM 플레이어 구현 및 재생·정지·볼륨 조절·구간 이동 등 인터랙션 제공
            </div>
          </span>
          <span class="data-txt" data-txt="2)">
            <div>
              <i class="fa-solid fa-volume-high"></i>
              아이콘 클릭 시 뮤트 기능 제공
            </div>
          </span>
        </p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme03.png" alt="" /></div>
        <p class="caption">옛날 Windows 시작 메뉴 UI를 참고하여 디자인</p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme04.png" alt="" /></div>
        <p class="caption">
          <span class="data-txt" data-txt="1)">옛날 Windows IE UI 참고하여 디자인 및 하단 트레이 버튼을 통해 인적사항 모달 제어</span>
          <span class="data-txt" data-txt="2)">드래그 앤 드롭(Drag & Drop) 기반 창 이동 기능 제공</span>
        </p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme05.png" alt="" /></div>
        <p class="caption">
          <span class="data-txt" data-txt="1)">하단 트레이 버튼을 통해 메일 모달 제어</span>
          <span class="data-txt" data-txt="2)">EmailJS를 활용한 실제 메일 발송 기능 구현 및 정규식 기반 유효성 검사 적용</span>
        </p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme06.png" alt="" /></div>
        <p class="caption">
          <span class="data-txt" data-txt="1)">상단 툴바를 통한 모달 간 페이지네이션 및 이력서 PDF 제공</span>
          <span class="data-txt" data-txt="2)">
            <div>
              하단
              <i class="fa-solid fa-arrow-up"></i>
              아이콘 클릭시 맨위로 이동
            </div>
          </span>
        </p>
        <div class="img-bx02"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/readme07.png" alt="" /></div>
        <p class="caption">
          <span class="data-txt" data-txt="1)">GitHub REST API 연동을 통한 레포지토리 렌더링</span>
          <span class="data-txt" data-txt="2)">옛날 Windows 폴더 UI 참고하여 디자인</span>
        </p>
      </article>
    </div>
    <template #bottom>
      <p>
        <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/web_ico.png" alt="" />
        README.md
      </p>
      <button class="btn-top" @click="scrollToTop"><i class="fa-solid fa-arrow-up"></i></button>
    </template>
  </ModalBase>
</template>
