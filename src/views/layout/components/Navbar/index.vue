<template>
    <div class="navbar-wrapper">
      <div class="left-side">
        <slot name="left-side"></slot>
      </div>
      <div class="right-side">
        <slot name="right-side"></slot>
      </div>
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
    justify-content: space-between;
    .left-side{
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
    .right-side{
      margin-right: 20px;
      display: flex;
      align-items: center;
    }
  }
</style>
