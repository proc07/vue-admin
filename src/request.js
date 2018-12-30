import axios from './utils/axios'

const apiList = {}
const requireFiles = require.context('./api', false, /\.js$/)

function addRequestToList (mName, reqList) {
  apiList[mName] = {}
  reqList && reqList.forEach(item => {
    const headers = {}
    const { name, url, method } = item
    apiList[mName][name] = (params) => {
      return axios({
        method: method || 'post',
        url,
        headers,
        data: params
      })
    }
  })
}

requireFiles.keys().forEach(fileName => {
  const moduleFile = requireFiles(fileName)
  const moduleName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')

  addRequestToList(moduleName, moduleFile.default)
})

export default apiList
