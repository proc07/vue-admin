<template>
    <div class="">
      Home：{{route}}
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      route: this.$route.fullPath
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
