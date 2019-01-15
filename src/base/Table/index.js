import { Table, TableColumn, Pagination } from 'element-ui'

function renderColumn (h, { prop, label, columns, render, header, ...args }) {
  const scopedSlotsProp = this.$scopedSlots[prop]
  const props = {
    props: args,
    scopedSlots: {
      header
    }
  }

  if (scopedSlotsProp || render) {
    props.scopedSlots.default = (row) => {
      return (scopedSlotsProp && scopedSlotsProp(row)) || (render && render(row))
    }
  }
  // const on = {
  //   on: this.$listeners this.$scopedSlots[prop] || render
  // }
  return (
    <el-table-column
      {...props}
      prop={prop}
      label={label}>
      {
        columns && columns.length && (
          getAllColumn.call(this, h, columns)
        )
      }
    </el-table-column>
  )
}

function getAllColumn (h, columns) {
  const res = []

  columns.forEach(item => {
    res.push(
      renderColumn.call(this, h, item)
    )
  })

  return res
}

const PAGE_DEFAULT = {
  currentPage: 1,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 0,
  direction: 'center'
}

export default {
  inheritAttrs: false,

  name: 'BaseTable',

  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    requestDataFn: {
      type: Function,
      default: null
    },
    pagination: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      loading: true,
      pageConfig: {}
    }
  },

  created () {
    this.pageConfig = Object.assign({}, PAGE_DEFAULT, this.pagination)
    this.requestTableData()
    console.log(this)
  },

  render: function (h) {
    const props = {
      props: this.$attrs,
      directives: [
        {
          name: 'loading',
          value: this.loading
        }
      ]
    }
    const on = {
      on: this.$listeners
    }
    const pageStyle = {
      textAlign: 'center',
      padding: '20px',
      ...this.pageConfig.style
    }

    return (
      <div>
        <el-table
          {...props}
          {...on}
          data={this.data}
          style={this.tableWidth}>
          {getAllColumn.call(this, h, this.columns)}
          {this.$slots.default}
        </el-table>
        <div style={pageStyle}>
          {this.renderPagination()}
        </div>
      </div>
    )
  },

  computed: {
    tableWidth () {
      return {
        width: `${this.width}`
      }
    }
  },

  methods: {
    renderPagination () {
      if (this.pagination) {
        const props = {
          props: this.pageConfig
        }

        return (
          <el-pagination
            {...props}
            on-size-change={this.handleSizeChange}
            on-current-change={this.handleCurrentChange}/>
        )
      }
    },
    requestTableData () {
      if (this.requestDataFn) {
        this.loading = true
        try {
          this.requestDataFn({
            currentPage: this.pageConfig.currentPage,
            pageSize: this.pageConfig.pageSize
          }).then(res => {
            const { data, total } = res
            // 场景特殊：减少代码量，可能导致应用数据流混乱
            // https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
            this.data.length = 0
            data.forEach(item => {
              this.data.push(item)
            })
            this.pageConfig.total = total
            this.loading = false
          }).catch(err => {
            console.log(err)
          })
        } catch (err) {
          console.error('component: <Base-Table /> argument requestDataFn must be return is Promise')
        }
      } else {
        this.loading = false
      }
    },
    handleSizeChange (val) {
      this.pageConfig.pageSize = val
      this.requestTableData()
    },
    handleCurrentChange (val) {
      this.pageConfig.currentPage = val
      this.requestTableData()
    }
  },

  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElPagination: Pagination
  }
}
