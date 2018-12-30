<template>
  <div class="custom-filter">
    <el-select v-model="value.city" placeholder="请选择省市" @change="addCountyList">
      <el-option
        v-for="item in cityOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value.county" v-if="value.city" placeholder="请选择区县">
      <el-option
        v-for="item in countyOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
const data = {
  '1': [
    {
      label: '荔湾区',
      value: '1-1'
    },
    {
      label: '白云区',
      value: '1-2'
    },
    {
      label: '天河区',
      value: '1-3'
    }
  ],
  '2': [
    {
      label: '上海没去过区',
      value: '2-1'
    },
    {
      label: '上海真没去过区',
      value: '2-2'
    },
    {
      label: 'XXX区',
      value: '2-3'
    }
  ],
  '3': [
    {
      label: '北京1',
      value: '3-1'
    },
    {
      label: '北京2',
      value: '3-2'
    },
    {
      label: '北京3',
      value: '3-3'
    }
  ]
}

export default {
  name: 'CustomFilter',
  props: {
    value: Object
  },
  data () {
    return {
      // city: '',
      // county: '',
      cityOptions: [
        {
          label: '不限地区',
          value: ''
        },
        {
          label: '广州',
          value: '1'
        },
        {
          label: '上海',
          value: '2'
        },
        {
          label: '北京',
          value: '3'
        }
      ],
      countyOptions: []
    }
  },
  methods: {
    addCountyList () {
      this.countyOptions = data[this.value.city] || []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
