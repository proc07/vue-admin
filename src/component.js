import Vue from 'vue'

const componentsFiles = require.context('./components', true, /.*\/index\.vue$/)
const baseFiles = require.context('./base', true, /.*\/index\.vue$/)

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

componentsFiles.keys().forEach(fileName => {
  const moduleFile = componentsFiles(fileName)
  const moduleName = fileName.match(/.\/(\w+)\//)

  Vue.component('Comp' + capitalizeFirstLetter(moduleName[1]), moduleFile.default)
})

baseFiles.keys().forEach(fileName => {
  const moduleFile = baseFiles(fileName)
  const moduleName = fileName.match(/.\/(\w+)\//)

  Vue.component('Base' + capitalizeFirstLetter(moduleName[1]), moduleFile.default)
})
