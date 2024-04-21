import request from '@/utils/request'
const api_name = '/eduservice/edu-chapter'
export default {
  getNestedTreeList(courseId) {
    return request({
      url: `${api_name}/nested-list/${courseId}`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  save(chapter) {
    return request({
      url: api_name,
      method: 'post',
      data: chapter
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  updateById(chapter) {
    return request({
      url: `${api_name}`,     //改进：id放进chapter内？
      method: 'put',
      data: chapter
    })
  }
}
