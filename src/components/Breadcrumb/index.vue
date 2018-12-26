<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index">
      <span v-if="!item.redirect">{{item.meta.title}}</span>
      <router-link v-else :to="{ path: item.redirect }">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  watch: {
    $route: {
      handler: 'getBreadcrumb',
      immediate: true
    }
  },
  methods: {
    getBreadcrumb () {
      this.breadcrumbList = this.$route.matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
