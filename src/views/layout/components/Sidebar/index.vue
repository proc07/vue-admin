<template>
  <el-scrollbar wrap-class="sidebar-wrapper">
    <slot></slot>
    <el-menu
      ref="elMenu"
      class="el-menu-warpper"
      :default-active="defaultRoutePath"
      :collapse="isCollapse"
      :router="true"
      :background-color="menuBackgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
    >
      <sidebar-menu v-for="(menu, index) in routers" :key="index" :item="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarMenu from './SidebarMenu'

export default {
  name: 'Sidebar',
  data () {
    return {
      ...this.$config.sidebarStyle,
      defaultRoutePath: this.$route.path
    }
  },
  computed: {
    ...mapGetters([
      'routers',
      'isCollapse'
    ])
  },
  watch: {
    $route (newRoute) {
      this.defaultRoutePath = newRoute.path
    }
  },
  created () {
    this._generateMenuStyle()
  },
  methods: {
    _generateMenuStyle () {
      const { activeBackgroundColor, activeTextColor, sidebarBackgroundColor } = this.$config.sidebarStyle
      const cStyle = document.createElement('style')
      const cssText = `.sidebar-wrapper{background: ${sidebarBackgroundColor}} .sidebar-wrapper .el-menu-warpper .el-submenu__title:hover, .sidebar-wrapper .el-menu-warpper .el-menu-item:hover, .sidebar-wrapper .el-menu-warpper .el-menu-item.is-active{background-color: ${activeBackgroundColor}!important;color: ${activeTextColor}!important;}`
      cStyle.innerText = cssText
      document.head.appendChild(cStyle)
    }
  },
  components: {
    SidebarMenu
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-wrapper{
    overflow-x: hidden!important;
    // background: #2B2F39;
    .el-menu-warpper{
      border-right: 0;
      .el-submenu__title{
        &:hover{
         // background-color: #30B898!important;
         // color: #fff!important;
         i {
            color: inherit;
         }
        }
      }
      .el-menu-item{
        &:hover {
          // background-color: #30B898!important;
          // color: #fff!important;
          i {
            color: inherit;
          }
        }
        &.is-active{
          // background-color: #30B898!important;
          // color: #fff!important;
        }
      }
    }
  }
</style>
