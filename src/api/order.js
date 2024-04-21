import request from '@/utils/request'
const api_name = '/orderservice/t-order'
export default {
  getOrderListPage(current, limit, orderQuery) {
    return request({
      url: `${api_name}/pageQuery/${current}/${limit}`,
      method: 'post',
      //后端用RequestBody获取数据
      //data 表示把数据转为json进行传递
      data: orderQuery
    })
  }
}
