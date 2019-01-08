import { Table, TableColumn } from 'element-ui'

function renderColumn (h, { prop, label, columns, render, ...args }) {
  const props = {
    props: args
  }
  // const on = {
  //   on: this.$listeners
  // }
  console.log(render)
  return (
    <el-table-column
      {...props}
      prop={prop}
      label={label}>
      {
        columns && columns.length ? (
          getAllColumn.call(this, h, columns)
        ) : this.$scopedSlots[prop] ? (
          this.$scopedSlots[prop]
        ) : render
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

export default {
  inheritAttrs: false,

  name: 'BaseTable',

  props: {
    columns: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    }
  },

  data () {
    return {
    }
  },

  mounted () {
    console.log(this)
  },

  render (h) {
    const props = {
      props: this.$attrs
    }
    const on = {
      on: this.$listeners
    }

    return (
      <el-table
        {...props}
        {...on}
        style={this.tableWidth}>
        { getAllColumn.call(this, h, this.columns) }
        { this.$slots.default }
      </el-table>
    )
  },

  computed: {
    tableWidth () {
      return {
        width: `${this.width}`
      }
    }
  },

  components: {
    ElTable: Table,
    ElTableColumn: TableColumn
  }
}
