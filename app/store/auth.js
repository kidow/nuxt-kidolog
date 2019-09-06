export const state = () => ({
  user: {
    id: null,
    email: '',
    displayName: '',
    thumbnail: '',
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
    state.user = {
      id: '',
      email: '',
      displayName: '',
      thumbnail: '',
      status: null
    }
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
  }
}
