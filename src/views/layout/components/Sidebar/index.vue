<template>
    <div class="">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1-4-1" class="el-menu-warpper" :collapse="isCollapse">
        <sidebar-menu v-for="(menu, index) in systemMenus" :key="index" :item="menu" />
      </el-menu>
    </div>
</template>

<script>
import SidebarMenu from './SidebarMenu'

export default {
  name: 'Sidebar',
  data () {
    return {
      isCollapse: false,
      systemMenus: [
      ]
    }
  },
  methods: {
  },
  components: {
    SidebarMenu
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar-container{
    .el-menu-warpper{
    }
  }
</style>
