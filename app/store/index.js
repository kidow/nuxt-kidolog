export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      // await dispatch('auth/ME')
    } catch (err) {
      console.log('nuxtServerInit err: ', err)
    }
  }
}
