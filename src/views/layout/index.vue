<template>
  <div class="app-container">
    <sidebar class="sidebar-container">
      <div class="custom-content" style="height: 60px;line-height: 60px;text-align: center;background: #30B898;color: #fff; border-bottom: 1px solid #ccc">
        CONFIG 管理系统
      </div>
    </sidebar>
    <div class="main-container">
      <div class="main-wrapper">
        <navbar>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </navbar>
        <page-tabs />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import {
  AppMain,
  Navbar,
  PageTabs,
  Sidebar
} from './components'

export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    AppMain,
    Navbar,
    PageTabs,
    Sidebar
  }
}
</script>

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
    }
    .main-container{
      background: #f0f2f5;
      margin-left: 200px;
      height: 100%;
      .main-wrapper{
        display: flex;
        height: 100%;
        flex-direction: column;
      }
    }
  }
</style>
