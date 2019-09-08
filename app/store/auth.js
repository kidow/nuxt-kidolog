export const state = () => ({
  user: {
    id: '',
    email: '',
    displayName: '',
    profileUrl: '',
    provider: '',
    providerId: '',
    status: null
  }
})

export const getters = {
  IS_LOGGED_IN: state => !!state.user.id,
  GET_USER: state => state.user
}

export const mutations = {
  SAVE_USER(state, user) {
    state.user = user
  },
  CLEAR_USER(state) {
    state.user = {}
  }
}

export const actions = {
  ME({ commit }) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'get',
        url: '/auth/me'
      }
      try {
        const { data } = await this.$axios(options)
        commit('SAVE_USER', data)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  LOGOUT({ commit }) {
    return new Promise(async (resolve, reject) => {
      const options = {
        method: 'delete',
        url: '/auth/logout'
      }
      try {
        await this.$axios(options)
        commit('CLEAR_USER')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}
