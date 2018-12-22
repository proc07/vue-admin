<template>
  <i v-if="isIconOrImage" class="menu-icon" :class="iconOrUrl"></i>
  <img v-else class="menu-icon" :src="iconOrUrl" alt="icon" />
</template>

<script>
export default {
  name: 'Icon',
  data () {
    return {}
  },
  props: {
    iconOrUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    isIconOrImage () {
      return this.iconOrUrl.indexOf('http') === -1 ? true : false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-icon{
    margin-right: 5px;
    width: 16px;
    text-align: center;
    vertical-align: middle;
  }
</style>
