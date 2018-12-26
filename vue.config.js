/* eslint-disable indent */
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '', dir)
}

module.exports = {
  devServer: {
    port: '1314'
  },
  chainWebpack: config => {
    // 重点:删除默认配置中处理svg
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite')
        .test(/\.svg$/)
        .include
          .add(resolve('src/icons/svg'))
          .end()
        .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'svg-[name]'
          })
          .end()
  }
}
