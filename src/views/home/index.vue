<template>
    <div class="">
      routePath：{{routePath}}
      <br/>
      token: {{token}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      routePath: this.$route.fullPath
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    '$route.fullPath' (newVal) {
      this.routePath = newVal
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
