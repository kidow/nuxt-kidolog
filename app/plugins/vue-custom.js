import Vue from 'vue'

Vue.prototype.$titleUrl = (title, alias) => {
  if (!title) return alias
  let result = title
    .replace(/[&\\/\\#,+()$~%!.'";:*`’“?<>{}]/g, '')
    .trim()
    .replace(/ |\xA0/g, '-')
  if (alias) result += `-${alias}`
  return result
}
Vue.prototype.$sliceParams = paramsId =>
  paramsId.slice(paramsId.lastIndexOf('-') + 1, paramsId.length)
Vue.prototype.$shareSns = url =>
  window.open(url, 'share', 'menubar=1, resizable=1, width=800, height=500')
