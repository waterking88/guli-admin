import request from '@/utils/request'
const api_name = '/cmsservice/crm-banner'
export default {
  getBannerListPage(current, limit, bannerQuery) {
    return request({
      // url: "/eduservice/edu-teacher/pageQuery/" + current + "/" + limit, //拼接字符串写法
      url: `${api_name}/${current}/${limit}`,
      method: 'post',
      //后端用RequestBody获取数据
      //data 表示把数据转为json进行传递
      data: bannerQuery
    })
  },
  deleteBannerId(id) {
    return request({
      // url: "/eduservice/edu-teacher/pageQuery/" + current + "/" + limit, //拼接字符串写法
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  save(banner) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: banner
    })
  },
  updateById(banner) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: banner
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  }
}
