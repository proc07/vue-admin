<template>
  <div class="app-container">
    <sidebar class="sidebar-container" :class="collapseClass">
      <div v-if="!isCollapse" class="custom-content">
        Config Admin
      </div>
      <div v-else class="custom-content">
        I G
      </div>
    </sidebar>
    <div class="main-container" :class="collapseClass">
      <div class="main-wrapper">
        <navbar>
          <div slot="left-side">
            <comp-breadcrumb />
          </div>
          <div slot="right-side">
            <el-dropdown>
              <div class="user-dropdown-link">
                <img width="40" height="40" class="user-avatar" src="http://iph.href.lu/200x200?text=IG&fg=ffffff&bg=30b898" alt="用户头像">{{userInfo.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/" tag="div">
                  <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </navbar>
        <page-tabs style="display: none;" />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  AppMain,
  Navbar,
  PageTabs,
  Sidebar
} from './components'

export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'isCollapse'
    ]),
    collapseClass () {
      return this.isCollapse ? 'collapse' : ''
    }
  },
  created () {
  },
  methods: {
    logout () {
    }
  },
  components: {
    AppMain,
    Navbar,
    PageTabs,
    Sidebar
  }
}
</script>
这里需要把组件样式和slot中样式分离开
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    width: 100%;
    height: 100%;
    position: relative;
    .sidebar-container{
      width: 200px;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      overflow: hidden;
      transition: width .5s;
      &.collapse{
        width: 64px!important;
      }
      .custom-content{
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #30B898;
        color: #fff;
        border-bottom: 1px solid #ccc;
      }
    }
    .main-container{
      background: #f0f2f5;
      margin-left: 200px;
      height: 100%;
      transition: margin-left .5s;
      &.collapse{
        margin-left: 64px!important;
      }
      .main-wrapper{
        display: flex;
        height: 100%;
        flex-direction: column;
        .user-dropdown-link{
          display: flex;
          align-items: center;
          .user-avatar{
            border-radius: 50%;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
