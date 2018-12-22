<template>
    <div class="navbar-wrapper">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar-wrapper{
    background: #ffffff;
    display: flex;
    height: 56px;
  }
</style>
