<template>
  <div class="filters">
    <el-form :inline="true" :size="size">
      <el-form-item
        v-for="(options, key) in filterOptions"
        :key="key"
        v-show="toggleFold || !highFilters[key]"
        :style="options.style"
      >
        <div class="el-input-group">
          <div class="el-input-group__prepend" v-if="options.prepend">{{options.prepend}}</div>
          <component
            :is="options.component"
            v-model="options.value"
            v-bind="options.attr"
            v-on="options.event"
            :class="{ 'filters-input-group__prepend': options.prepend, 'filters-input-group__append': options.append }"
            >
            <template v-if="options.slot && options.slot.default">
              <!-- 1: 特定(slotWhiteList)组件使用 -->
              <template v-if="_checkedWhiteSlot(options.component)">
                <el-option
                  v-for="item in options['selectOptions']"
                  :key="item[options['alias']['value']]"
                  :label="item[options['alias']['label']]"
                  :value="item[options['alias']['value']]">
                  <slot :name="options.slot.default" :item="item"></slot>
                </el-option>
              </template>
              <!-- 2: 只挂载除了(slotWhiteList)组件中的 default slot -->
              <template v-else>
                <!-- v-if template 和 slot-scope template 不能放在一层。v-if 结果 false 时，也会挂载 slot-scope -->
                <template slot-scope="{ item }" >
                  <slot :name="options.slot.default" :item="item"></slot>
                </template>
              </template>
            </template>
            <!-- 3: 只挂载非 default slot -->
            <template v-for="(slotItem, key) in filterDefaultSlot(options)" :slot="key">
              <slot :name="slotItem"></slot>
            </template>
          </component>
          <div class="el-input-group__append" v-if="options.append">{{options.append}}</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button-group class="el-dropdown">
          <el-button type="primary" @click="submitForm">查询</el-button>
          <el-tooltip class="item" effect="dark" content="更多查询条件" placement="top-start">
            <el-button type="primary" class="el-dropdown__caret-button" @click="toggleFold = !toggleFold">
              <i class="el-dropdown__icon el-icon-arrow-down" v-show="!toggleFold"></i>
              <i class="el-dropdown__icon el-icon-arrow-up" v-show="toggleFold"></i>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deepClone } from '@/utils/util'

export default {
  name: 'BaseFilters',
  data () {
    return {
      slotWhiteList: [
        'el-select'
      ],
      data: {},
      toggleFold: false,
      highFilters: {}
    }
  },
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    filterOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    console.log(this)
    this.extractHighFilters()
  },
  methods: {
    extractHighFilters () {
      Object.keys(this.filterOptions).forEach(name => {
        const isHigh = this.filterOptions[name]['high']
        isHigh && (this.highFilters[name] = isHigh)
      })
    },
    filterDefaultSlot ({ slot, component }) {
      if (
        slot &&
        slot.default
      ) {
        const cloneSlot = deepClone(slot)
        delete cloneSlot.default
        return cloneSlot
      } else {
        return slot
      }
    },
    submitForm () {
      this._extractValue()
      this.$emit('submit', this.data)
    },
    _checkedWhiteSlot (slotName) {
      return this.slotWhiteList.findIndex(name => name === slotName) !== -1
    },
    _extractValue () {
      for (let key in this.filterOptions) {
        // 不同类型
        this.data[key] = this.filterOptions[key]['value']
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filters{
    .el-form-item{
      margin-bottom: 10px;
      /deep/ .el-form-item__content{
        height: 100%;
        /deep/ .el-input-group{
          height: 100%;
        }
      }
    }
    .filters-input-group__prepend /deep/ .el-input__inner{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .filters-input-group__append /deep/ .el-input__inner{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    // 兼容 el-xxx 样式
    /deep/ .el-switch{
      height: 100%;
      padding: 0 10px;
      border: 1px solid #dcdfe6;
    }
    /deep/ .el-checkbox{
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      border: 1px solid #dcdfe6;
    }
  }
</style>
