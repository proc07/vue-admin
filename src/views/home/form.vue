<template>
    <div class="components-form">
      <div>
        Components - Form
      </div>
      <h3>Form - formData</h3>
      <base-form
        :formData="formData"
      >
        <div slot="title">
          我是一个 slot 插入的 title
        </div>
      </base-form>
    </div>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      formData: [
        {
          row: {

          },
          children: {
            col: {
              span: 8,
              offset: 2
            },
            label: 'EL-INPUT',
            tag: 'el-input'
          }
        },
        {
          slot: 'title'
        },
        {
          row: {

          },
          children: [
            {
              span: 8
            },
            {
              span: 8
            },
            {
              span: 8
            }
          ]
        },
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .components-form{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
