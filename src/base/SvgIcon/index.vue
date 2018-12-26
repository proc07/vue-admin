<template>
  <svg class="svg-icon">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  data () {
    return {}
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .svg-icon{
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
