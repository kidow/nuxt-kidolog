export const state = () => ({
  title: '',
  markdown: '',
  tags: ''
})

export const mutations = {
  SAVE_EDITOR(state, { title, markdown, tags }) {
    state.title = title
    state.markdown = markdown
    state.tags = tags
  }
}
