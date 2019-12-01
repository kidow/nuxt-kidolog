export const state = () => ({
  user: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: ''
  }
})

export const getters = {
  IS_LOGGED_IN: state => !!state.user.uid,
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
    return new Promise((resolve, reject) => {
      this.$auth().onAuthStateChanged(user => {
        if (user) {
          console.log('auth/ME', user)
          const { uid, email, displayName, photoURL } = user
          commit('SAVE_USER', {
            uid,
            email,
            displayName,
            photoURL
          })
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  },
  LOGOUT({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$auth().signOut()
        commit('CLEAR_USER')
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  GOOGLE_LOGIN() {
    const provider = new this.$auth.GoogleAuthProvider()
    this.$auth().signInWithRedirect(provider)
  },
  FACEBOOK_LOGIN() {
    const provider = new this.$auth.FacebookAuthProvider()
    this.$auth().signInWithRedirect(provider)
  },
  TWITTER_LOGIN() {
    const provider = new this.$auth.TwitterAuthProvider()
    this.$auth().signInWithRedirect(provider)
  },
  GITHUB_LOGIN() {
    const provider = new this.$auth.GithubAuthProvider()
    this.$auth().signInWithRedirect(provider)
  }
}
