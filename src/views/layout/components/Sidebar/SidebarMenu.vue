<template>
  <el-submenu :index="item.path" v-if="item.children && item.children.length">
    <template slot="title">
      <icon :iconOrUrl="item.meta.icon" />
      <span>{{item.meta.title}}</span>
    </template>
    <sidebar-menu v-for="(children, index) in item.children" :key="index" :item="children" />
  </el-submenu>
  <el-menu-item :index="item.path" v-else>
    <icon :iconOrUrl="item.meta.icon" />
    <span slot="title">{{item.meta.title}}</span>
  </el-menu-item>
</template>

<script>
import SidebarMenu from './SidebarMenu'
import Icon from './Icon'

export default {
  name: 'SidebarMenu',
  data () {
    return {}
  },
  props: {
    item: Object
  },
  methods: {
    uniqueIndex (name) {
      return name || String(Math.random())
    }
  },
  components: {
    SidebarMenu,
    Icon
  }
}
</script>
