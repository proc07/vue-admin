<template>
    <div class="">
      routePath：{{routePath}}
      <br/>
      Comp - Filters
      <comp-filters :filterOptions="filterOptions" @submit="filtersCommit" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      routePath: this.$route.fullPath,
      filterOptions: {
        name: {
          tag: 'el-input',
          value: '1314',
          slot: {
            name: ['prepend', 'append'],
            label: ['客户账号', '提示']
          },
          attr: {
            type: 'number',
            placeholder: '请输入 name'
          },
          style: {
            width: '300px',
            marginRight: '10px'
          }
        },
        tel: {
          tag: 'el-input',
          slot: {
            name: 'prepend',
            label: '客户电话'
          },
          attr: {
            maxlength: 11,
            type: 'tel',
            placeholder: '只能输入11位 tel'
          },
          style: {
            width: '300px'
          }
        },
        region: {
          tag: 'el-select',
          value: '1',
          slot: {
            name: 'prepend',
            label: '选择地区'
          },
          attr: {
            placeholder: '请选择'
          },
          style: {
            width: '300px'
          }
        }
      }
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
  },
  methods: {
    filtersCommit (data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
