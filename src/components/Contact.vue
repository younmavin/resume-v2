<script setup>
import { ref, watch } from 'vue'
import emailjs from '@emailjs/browser'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const name = ref('')
const tel = ref('')
const mail = ref('')
const message = ref('')

// 제출 여부
const submitted = ref(false)

// 전화번호 정규식
const formatTel = (value) => {
  return value.replace(/[^0-9]/g, '')
}

// 이메일 정규식
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// 에러 조건
const isNameError = () => submitted.value && !name.value
const isTelError = () => submitted.value && !tel.value
const isMailError = () => submitted.value && (!mail.value || !isValidEmail(mail.value))
const isMsgError = () => submitted.value && !message.value

// 모달 닫힐 때 초기화
watch(
  () => props.isOpen,
  (val) => {
    if (!val) {
      submitted.value = false

      name.value = ''
      tel.value = ''
      mail.value = ''
      message.value = ''
    }
  },
)

const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) emit('close')
}

//폼 입력 조건문
const sendMail = async () => {
  submitted.value = true

  const cleanTel = formatTel(tel.value)

  if (!name.value) {
    alert('기업명을 입력해주세요.')
    return
  }

  if (!cleanTel) {
    alert('연락처를 입력해주세요.')
    return
  }

  if (!mail.value) {
    alert('메일 주소를 입력해주세요.')
    return
  }

  if (!isValidEmail(mail.value)) {
    alert('올바른 메일 형식을 입력해주세요.')
    return
  }

  if (!message.value) {
    alert('내용을 입력해주세요.')
    return
  }

  try {
    await emailjs.send(
      'mavin_contact',
      'template_sfqcpjq',
      {
        from_name: name.value,
        tel: cleanTel,
        mail: mail.value,
        message: message.value,
      },
      'JBFG728PPPRWiANsU',
    )

    alert('메일이 발송되었습니다.')

    // 초기화
    name.value = ''
    tel.value = ''
    mail.value = ''
    message.value = ''
    submitted.value = false
  } catch (error) {
    console.error(error)
    alert('메일 발송 실패')
  }
}
</script>

<template>
  <div class="contact-wrap" @click="handleBackdropClick">
    <div class="contact-inner" @click.stop>
      <div class="contact-top">
        <div class="tit">
          <h3>
            <img src="https://mavin-resume02.s3.ap-southeast-2.amazonaws.com/images/icons/smail_ico.png" alt="" />
            메일 보내기
          </h3>
          <button class="btn-close" @click="emit('close')"><i class="fa-solid fa-x"></i></button>
        </div>
      </div>
      <div class="contact-middle custom-scroll">
        <form @submit.prevent="sendMail">
          <!-- 기업명 -->
          <fieldset :class="{ error: isNameError() }">
            <label for="ipt_name">
              <i class="fa-solid fa-user"></i>
              기업명:
            </label>
            <input id="ipt_name" type="text" v-model="name" placeholder="기업명을 입력해 주세요." />
          </fieldset>

          <!-- 연락처 -->
          <fieldset :class="{ error: isTelError() }">
            <label for="ipt_tel">
              <i class="fa-solid fa-phone"></i>
              연락처:
            </label>
            <input id="ipt_tel" type="text" v-model="tel" @input="tel = formatTel(tel)" placeholder="- 제외 숫자만 입력해 주세요." />
          </fieldset>

          <!-- 메일 -->
          <fieldset :class="{ error: isMailError() }">
            <label for="ipt_mail">
              <i class="fa-solid fa-envelope"></i>
              메일 주소:
            </label>
            <input id="ipt_mail" type="email" v-model="mail" placeholder="메일 주소를 입력해 주세요." />
          </fieldset>

          <!-- 내용 -->
          <fieldset class="txtarea-gropup" :class="{ error: isMsgError() }">
            <label for="ipt_msg">
              <i class="fa-solid fa-pen"></i>
              내용:
            </label>
            <textarea id="ipt_msg" v-model="message" placeholder="내용을 입력해주세요." />
          </fieldset>

          <button type="submit" class="btn-send custom-btn">보내기</button>
        </form>
      </div>
      <div class="contact-bottom">
        <p>
          <i class="fa-solid fa-circle-exclamation"></i>
          메일은 실제 발송됩니다.
        </p>
      </div>
    </div>
  </div>
</template>
