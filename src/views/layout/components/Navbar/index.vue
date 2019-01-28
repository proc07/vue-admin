<template>
    <div class="navbar-wrapper">
      <div class="left-side">
        <div class="menu-fold" :class="isCollapse ? 'collapse' : ''" @click="changeCollapse">
          <base-svg-icon name="svg-menu-fold"></base-svg-icon>
        </div>
        <slot name="left-side"></slot>
      </div>
      <div class="right-side">
        <slot name="right-side"></slot>
      </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_COLLAPSE'
    ]),
    changeCollapse () {
      this.SET_COLLAPSE(!this.isCollapse)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar-wrapper{
    background: #ffffff;
    display: flex;
    flex: 0 0 56px;
    height: 56px;
    justify-content: space-between;
    border-bottom: 1px solid #f0f2f5;
    .left-side{
      margin-left: 20px;
      display: flex;
      align-items: center;
      .menu-fold{
        cursor: pointer;
        color: black;
        width: 25px;
        height: 25px;
        font-size: 25px;
        margin-right: 20px;
        transition: all .5s;
        &.collapse{
          transform: rotate(90deg);
        }
      }
    }
    .right-side{
      margin-right: 20px;
      display: flex;
      align-items: center;
    }
  }
</style>
