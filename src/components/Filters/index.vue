<template>
  <div class="filters">
    <el-form :inline="true" size="medium">
      <el-form-item v-for="(options, key) in filterOptions" :key="key">
        <component
          :is="options.tag"
          v-model="data[key]"
          v-bind="options.attr"
          :style="options.style">
          <template v-if="isPrimitive(options.slot.name)" :slot="options.slot.name">{{options.slot.label}}</template>
          <template v-else v-for="(slotName, index) in options.slot.name" :slot="slotName">{{options.slot.label[index]}}</template>
        </component>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  data () {
    return {
      data: {}
    }
  },
  props: {
    filterOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    this.initFilterData()
  },
  methods: {
    initFilterData () {
      for (let key in this.filterOptions) {
        // 不同类型
        this.data[key] = this.filterOptions[key]['value'] || ''
      }
      console.log('init data:', this)
    },
    isPrimitive (val) {
      return typeof val === 'string'
    },
    submitForm () {
      this.$emit('submit', this.data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
