<template>
  <div class="components-filters">
    <div>
      Components - Filters
    </div>
    <br />
    <base-filters
      class="base-filters"
      :filterOptions.sync="filterOptions"
      size=""
      requestName="feature.SubmitFilter"
      @submit="BFsubmit">
      <!-- elAutocomplete slot -->
      <i
        class="el-icon-edit el-input__icon"
        slot="elAutocompleteSuffix">
      </i>
      <template slot="elAutocompleteDefault" slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>

      <!-- elSelectDefault -->
      <template slot="elSelectDefault" slot-scope="{ item }">
        <span style="float: left">{{ item.id }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
      </template>
    </base-filters>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const querySearchData = [
  { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
  { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
  { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
  { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
  { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
  { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
  { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
  { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
  { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
  { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
  { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
  { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
  { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
  { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
  { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
  { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
  { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
  { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
  { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
  { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
  { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
  { 'value': '钱记', 'address': '上海市长宁区天山西路' },
  { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
  { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
  { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
  { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
  { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
  { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
  { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
  { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
  { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
  { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
  { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
  { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
  { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
  { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
  { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
  { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
  { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
  { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
  { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
  { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
  { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
  { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
  { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
  { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
  { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
  { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
]

export default {
  name: 'Filters',
  data: function () {
    return {
      filterOptions: {
        elInput: {
          high: true,
          component: 'el-input',
          value: '1314',
          prepend: 'el-input',
          append: '@',
          attr: {
            type: 'number',
            placeholder: '请输入 el-input'
          },
          style: {
            width: '250px',
            marginBottom: '10px'
          }
        },
        elCheckbox: {
          component: 'el-checkbox',
          value: false,
          prepend: 'el-checkbox',
          style: {
            height: '36px'
          }
        },
        elSelect: {
          high: true,
          component: 'el-select',
          value: '1',
          prepend: 'el-select',
          slot: {
            default: 'elSelectDefault'
          },
          // el-select 独有配置
          selectOptions: [],
          alias: {
            value: 'id',
            label: 'name'
          },
          attr: {
            multiple: true,
            placeholder: '请选择 el-select'
          },
          style: {
            width: '250px'
          }
        },
        elAutocomplete: {
          component: 'el-autocomplete',
          value: '1',
          prepend: 'el-autocomplete',
          slot: {
            default: 'elAutocompleteDefault',
            suffix: 'elAutocompleteSuffix'
          },
          attr: {
            'popper-class': 'elAutocomplete',
            'fetch-suggestions': (queryString, cb) => {
              console.log('elAutocomplete: change', queryString)
              cb(querySearchData)
            },
            clearable: true,
            placeholder: '请选择 el-autocomplete'
          },
          event: {
            'select': (item) => {
              console.log('handleSelect', item)
              // 使用 .sync 修饰符，不需要要在设置
              // this.filterOptions.elAutocomplete.value = item.value
            }
          },
          style: {
            width: '270px'
          }
        },
        elCascader: {
          component: 'el-cascader',
          value: [],
          prepend: 'el-cascader',
          attr: {
            options: [],
            placeholder: '请选择 el-cascader'
          },
          event: {
            change: (value) => {
              console.log('elCascader chage:', value)
            }
          },
          style: {
            width: '270px'
          }
        },
        elSwitch: {
          component: 'el-switch',
          value: true,
          prepend: 'el-switch',
          attr: {
            'active-color': '#13ce66',
            'inactive-color': '#ff4949'
          },
          style: {
            height: '36px'
          }
        },
        elTimeSelect: {
          component: 'el-time-select',
          value: '',
          prepend: 'el-time-select',
          attr: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            },
            placeholder: '选择时间点'
          }
        },
        elDatePicker: {
          high: true,
          component: 'el-date-picker',
          // value: '',
          prepend: 'el-date-picker',
          attr: {
            type: 'date',
            align: 'right',
            format: 'yyyy 年 MM 月 dd 号',
            valueFormat: 'yyyy/MM/dd',
            placeholder: '选择日期',
            pickerOptions: {
              disabledDate (time) {
                return time.getTime() > Date.now()
              },
              shortcuts: [{
                text: '今天',
                onClick (picker) {
                  picker.$emit('pick', new Date())
                }
              }, {
                text: '昨天',
                onClick (picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24)
                  picker.$emit('pick', date)
                }
              }, {
                text: '一周前',
                onClick (picker) {
                  const date = new Date()
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                  picker.$emit('pick', date)
                }
              }]
            }
          }
        },
        customComponent: {
          component: 'comp-custom-filter',
          value: {
            city: '',
            county: ''
          },
          prepend: 'custom-component'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created () {
    // 异步获取地区 el-autocomplete 数据
    this.getRegionList()
    // 获取级联
    this.getCascaderList()
  },
  methods: {
    getCascaderList: function () {
      this.filterOptions['elCascader']['attr']['options'] = [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1-1',
              label: '1-1',
              children: [
                {
                  value: '1-1-1',
                  label: '1-1-1'
                }
              ]
            },
            {
              value: '1-2',
              label: '1-2',
              children: [
                {
                  value: '1-2-1',
                  label: '1-2-1'
                },
                {
                  value: '1-2-2',
                  label: '1-2-2'
                }
              ]
            },
            {
              value: '1-3',
              label: '1-3'
            }
          ]
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2-1',
              label: '2-1'
            }
          ]
        }
      ]
    },
    getRegionList () {
      this.filterOptions['elSelect']['selectOptions'] = [
        {
          name: '北京',
          id: '1'
        },
        {
          name: '上海',
          id: '2'
        },
        {
          name: '广州',
          id: '3'
        },
        {
          name: '深圳',
          id: '4'
        }
      ]
    },
    BFsubmit (data) {
      console.log('submit', data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .components-filters{
    padding: 20px;
  }
  .elAutocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
    }
  }
</style>
