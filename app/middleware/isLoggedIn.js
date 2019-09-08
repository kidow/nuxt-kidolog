export default ({ store, redirect }) => {
  const isLoggedIn = store.getters['auth/IS_LOGGED_IN']

  if (!isLoggedIn) redirect('/')
}
