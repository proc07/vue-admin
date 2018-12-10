<template>
  <el-submenu :index="item.path" v-if="item.children && item.children.length">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">{{item.name}}</span>
    </template>
    <sidebar-menu v-for="(menu, index) in item.children" :key="index" :item="menu" />
  </el-submenu>
  <el-menu-item :index="item.path" v-else>
    <i class="el-icon-menu"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
</template>

<script>
import SidebarMenu from './SidebarMenu'

export default {
  name: 'SidebarMenu',
  data () {
    return {}
  },
  props: {
    item: Object
  },
  components: {
    SidebarMenu
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
