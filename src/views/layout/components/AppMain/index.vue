<template>
    <div class="app-main">
      <div class="main-wrapper">
        <router-view />
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    flex: 1;
    padding: 16px;
    box-sizing: border-box;
    .main-wrapper{
      height: 100%;
      background: #ffffff;
      border-radius: 6px;
    }
  }
</style>
