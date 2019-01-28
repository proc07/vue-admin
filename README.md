## vue-admin

### api 请求接口

我们进行定义业务的接口时，只需要将在 `./src/api/` 目录下新建js文件 export 函数即可。如下：

```javascript
// ./src/api/login.js
export default [
  {
    name: 'Login',
    url: '/login/login',
    method: 'post'
  },
  {
    name: 'Logout',
    url: '/login/logout',
    method: 'post'
  },
  {
    name: 'GetUserInfo',
    url: '/login/getUserInfo',
    method: 'post'
  }
]
```

将会自动导入到 vue 实例中，可直接调用，如下：

```javascript
// this.$request - 将方法全部都挂载到VUE.$request实例下面
// login - 文件的名称
// Login - json对象中定义的 name 函数明名
this.$request.login.Login().then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

- 待优化点：使用了多个 ROUTER_BASE_API 地址时，如果进行切换？

### sidebar （侧边栏）组件颜色配置

props: sidebarStyle

- sidebarBackgroundColor 侧边栏背景底色
- menuBackgroundColor    导航按钮背景底色
- textColor              文字颜色
- activeTextColor        hover时，文字颜色
- activeBackgroundColor  hover时，导航按钮背景颜色

### svg-icon

- 使用 svgo 压缩 `./icons/svg/` 目录下 svg 图标，直接下面命令即可

```javascript
// package.json
"scripts": {
  "svgo": "svgo -f ./src/icons/svg"
},
```

### router 路由权限

分为两种路由挂载模式：

- constant
- async

在 ./src/router/ 目录下，三种js文件

- asyncRouter.js - async 模式下与请求接口返回的数据进行比对替换
- constantRouter.js - async 模式下定义的全部路由都会被添加，constant 模式下会对路由中 meta.roles 进行权限检测，进行过滤。
- index.js - 定义的路由添加 `whiteList: true` 属性后，则当前路由不会添加到侧边栏中。

### 多环境

每个变量都需要加上 `VUE_APP_` 前缀，使用 `process.env.xxx` 调用即可

- .env.dev 本地、测试环境
- .env.pre 预发布环境
- .env.pro 正式环境

- 注意每次修改文件，需要重新启动服务！！！

### 组件

- base 公共组件
- components 业务组件

在这两个文件中定义的组件都会自动挂载到Vue中（带有 base- 或 comp- 前缀），可查看 ./src/component.js 实现过程。

```javascript
import Vue from 'vue'

const componentsFiles = require.context('./components', true, /.*\/index\.(vue|js)$/)
const baseFiles = require.context('./base', true, /.*\/index\.(vue|js)$/)

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
```
##### 除此之外，在 base 目录下基于 element 封装了两个组件，如下：
可在 ./src/views/home/[name].vue 中查看案例
- Filters
- Table
- 更多待续！
