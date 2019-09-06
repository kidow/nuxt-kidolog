import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/scss/element-ui.scss'

export default () => {
  Vue.use(Element, { locale }),
    Vue.mixin({
      methods: {
        notifySuccess(message) {
          this.$notify({ type: 'success', title: '성공', message })
        },
        notifyError(message) {
          this.$notify({
            type: 'error',
            title: '실패',
            message:
              message ||
              '죄송합니다. 서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
          })
        },
        notifyWarning(message) {
          this.$notify({ type: 'warning', title: '경고', message })
        },
        notifyInfo(message) {
          this.$notify({ type: 'info', title: '정보', message })
        }
      }
    })
}
