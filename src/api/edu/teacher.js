import request from '@/utils/request'
const api_name = '/eduservice/edu-teacher'
export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // url: "/eduservice/edu-teacher/pageQuery/" + current + "/" + limit, //拼接字符串写法
      url: `${api_name}/pageQuery/${current}/${limit}`,
      method: 'post',
      //后端用RequestBody获取数据
      //data 表示把数据转为json进行传递
      data: teacherQuery
    })
  },
  deleteTeacherId(id) {
    return request({
      // url: "/eduservice/edu-teacher/pageQuery/" + current + "/" + limit, //拼接字符串写法
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  save(teacher) {
    return request({
      url: `${api_name}`,
      method: 'post',
      data: teacher
    })
  },
  updateById(teacher) {
    return request({
      url: `${api_name}/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  },
  getList() {
    return request({
      url: `${api_name}/findAll`,
      method: 'get'
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  }
}
