<template>
  <div class="app-container">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <page-tabs />
      <app-main />
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
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    .sidebar-container{
      width: 200px;
      flex: 0 0 200px;
    }
    .main-container{
      flex: 1;
    }
  }
</style>
