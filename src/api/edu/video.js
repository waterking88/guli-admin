import request from '@/utils/request'
const api_name = '/eduservice/edu-video'
export default {
  saveVideoInfo(videoInfo) {
    return request({
      url: `${api_name}/saveVideoInfo`,
      method: 'post',
      data: videoInfo
    })
  },
  getVideoInfoById(id) {
    return request({
      url: `${api_name}/videoInfo/${id}`,
      method: 'get'
    })
  },
  updateVideoInfoById(videoInfo) {
    return request({
      url: `${api_name}/updateVideoInfo`,
      method: 'put',
      data: videoInfo
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  }
}
