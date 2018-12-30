export default {
  getRegionList: config => {
    return {
      status: 200,
      data: [
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
    }
  }
}
