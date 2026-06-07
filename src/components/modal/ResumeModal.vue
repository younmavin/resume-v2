<script setup>
import { ref } from 'vue'
import ModalBase from './ModalBase.vue'
import { projects } from '@/data/projects.js'

defineEmits(['close', 'open'])

const resume = projects.find((p) => p.id === 'resume')
const modalRef = ref(null)

const scrollToTop = () => {
  if (modalRef.value?.modalMiddleRef) {
    modalRef.value.modalMiddleRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const skills = [
  { tool: 'HTML', desc: '웹표준 및 접근성 준수, 시멘틱태그 적극 활용' },
  { tool: 'CSS', desc: '크로스 브라우징 준수, 디바이스별 반응형 및 SCSS 활용' },
  { tool: 'JQuery / JavaScript', desc: '이벤트 핸들링, 인터랙션 및 애니메이션 등 다양한 작업을 수행' },
  { tool: 'Vue.js', desc: '컴포넌트 재사용 관리, 데이터 바인딩 및 이벤트 핸들링 수행' },
  { tool: 'Ajax', desc: '비동기 통신을 활용한 API 연동 및 데이터 바인딩을 수행' },
  { tool: '라이브러리', desc: '부트스트랩 및 GSAP등 다양한 라이브러리 사용 경험 다수 있음' },
  { tool: '포토샵', desc: '이미지 보정과 배너 및 템플릿 등 제작 경험 다수 있음' },
  { tool: '피그마 / XD', desc: '템플릿 제작 및 디자이너와 협업 가능' },
  { tool: 'Git / Svn', desc: '버전 관리 및 개발자와 협업 가능' },
]

const careers = [
  { text: '유틸리티 CSS 시스템을 제작하여 팀 내 배포해', point: '공통 스타일 가이드 구축' },
  { text: '공통 UI 컴포넌트화를 통해', point: '코드 재사용성 및 유지보수 효율 개선' },
  { text: 'GSAP 기반 인터랙션·애니메이션을 활용하여', point: '사용자 경험 향상 및 페이지 이탈률 감소에 기여' },
  { text: 'Ajax 기반 API 연동 및 사용자 인증 기능', point: '(회원가입·로그인·비밀번호 찾기) 개발' },
  { text: '포토샵·피그마 등 디자인툴 활용하여', point: 'UI/UX 디자인 협업 및 산출물 제작' },
  { text: '프로젝트 관리 툴 도입 및 운영을 주도해 업무 추적시간을 단축하여', point: '팀 협업 효율 향상에 기여' },
  { text: '이미지 저장 방식을 AWS S3로 제안 및 적용하여', point: '서버 디스크 부하 감소' },
  { text: '이벤트 페이지 내 미니게임 등을 기획·구현하여', point: '클라이언트 재계약률 향상에 기여' },
]
</script>

<template>
  <ModalBase ref="modalRef" :title="resume.label" :icon="resume.icon" project-id="resume" @close="$emit('close')" @open="$emit('open', $event)">
    <div class="modal-middle-inner">
      <div class="bg"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/resume_bg.png" alt="" /></div>
      <hgroup>
        <h3>안녕하세요 웹퍼블리셔 윤관호 인사드립니다.</h3>
        <p>단순한 화면 구현에 그치지 않고, 지속적인 리팩토링으로 코드를 간결하고 읽기 쉽게 다듬는 것을 중요하게 생각합니다. W3C 표준을 준수한 마크업을 기반으로 모든 사용자가 편리하게 이용할 수 있는 환경을 만들고, 적절한 인터랙션과 애니메이션을 더해 풍부한 웹 경험을 제공합니다.</p>
      </hgroup>
      <article>
        <h3>기술 역량</h3>
        <table>
          <thead>
            <tr>
              <th>언어 및 툴</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in skills" :key="s.tool">
              <td>{{ s.tool }}</td>
              <td>{{ s.desc }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article>
        <h3>경력기술서</h3>
        <ol>
          <li v-for="(c, i) in careers" :key="i" class="data-txt" :data-txt="`${i + 1})`">
            <div>
              {{ c.text }}
              <span>{{ c.point }}</span>
            </div>
          </li>
        </ol>
      </article>
      <article>
        <h3>팀 협업 및 의사 소통 능력</h3>
        <p>
          협업에서 가장 중요한 것은
          <b>신뢰</b>
          라고 생각합니다.
          <br />
          믿고 맡길 수 있는 동료가 되기 위해, 안 되는 이유보다 해낼 방법을 먼저 찾는 자세로 업무에 임합니다.
          <br />
          <br />
          프로젝트 완수를 위해 팀원들과 꾸준히 소통하고 의견을 경청하며, 제 의견을 제시할 때는 논리적인 근거를 바탕으로 설득하려 노력합니다. 팀 전체의 성장을 위해 코딩 가이드 문서 제작·공유, 디자인 지원 등 서포트 역할을 자처하고, 필요한 상황에서는 리더십을 발휘해 프로젝트를 이끌기도 합니다.
          <br />
          <br />
          돌잔치 사회자, 여행 가이드 등 다양한 아르바이트 경험을 통해 사람들과 자연스럽게 소통하는 능력을 키웠습니다. 이를 바탕으로 사내 워크숍·야유회에서 레크리에이션 진행을 맡아 조직 분위기를 활기차게 이끌었으며, 동아리 활동에도 적극 참여하며 동료들과 신뢰를 쌓아왔습니다.
        </p>
        <div class="img-bx"><img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/resume01.png" alt="" /></div>
        <h4 class="ep">3년 5개월간 웹 기반 게임, 관리자 사이트, 기업 홈페이지, 웹진, 뉴스레터 등 다양한 프로젝트를 수행하며 웹 전문가들과 협업해 왔습니다. 그동안 쌓은 경험과 기술을 바탕으로 새로운 도전에 임하고자 합니다.</h4>
      </article>
    </div>
    <template #bottom>
      <p>
        <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/web_ico.png" alt="" />
        이력서.exe
      </p>
      <button class="btn-top" @click="scrollToTop"><i class="fa-solid fa-arrow-up"></i></button>
    </template>
  </ModalBase>
</template>
