<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select
          v-model="teacher.level"
          clearable
          placeholder="请选择"
        >
          <!--
数据类型一定要和取出的json中的一致，否则没法回填
因此，这里value使用动态绑定的值，保证其数据类型是number
-->
          <el-option
            :value="1"
            label="高级讲师"
          />
          <el-option
            :value="2"
            label="首席讲师"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input
          v-model="teacher.intro"
          :rows="10"
          type="textarea"
        />
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow=true"
        >更换头像
        </el-button>
        <!--
v-show：是否显示上传组件
:key：类似于id，如果一个页面多个图片上传控件，可以做区分
:url：后台上传的url地址
@close：关闭上传组件
@crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
const defaultTeacher = {
  name: '',
  sort: 0,
  level: 1,
  career: '',
  intro: '',
  avatar: process.env.OSS_PATH + '/avatar/default.jpg' //默认头像
}
export default {
  components: { ImageCropper, PanThumb }, //声明组件
  data() {
    return {
      teacher: defaultTeacher,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0 // 上传组件id
    }
  },
  watch: {
    //监视路由是否变化
    $route(to, from) {
      console.log('watch $route')
      this.init()
    }
  },
  created() {
    // console.log('created')
    //解决组件重用问题
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.fetchDataById(id)
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateById()
      }
    },
    // 保存
    saveData() {
      teacher
        .save(this.teacher)
        .then((response) => {
          return this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .then((resposne) => {
          //路由跳转
          this.$router.push({ path: '/edu/teacher' })
        })
        // .catch((response) => {
        //   // console.log(response)
        //   this.$message({
        //     type: 'error',
        //     message: '保存失败'
        //   })
        // })
    },
    // 根据id查询记录
    fetchDataById(id) {
      teacher
        .getById(id)
        .then((response) => {
          this.teacher = response.data.item
        })
        // .catch((response) => {
        //   this.$message({
        //     type: 'error',
        //     message: '获取数据失败'
        //   })
        // })
    },
    // 根据id更新记录
    updateById() {
      this.saveBtnDisabled = true
      teacher
        .updateById(this.teacher)
        .then((response) => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .then((resposne) => {
          this.$router.push({ path: '/edu/teacher' })
        })
        .catch((response) => {
          // console.log(response)
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.teacher = { ...defaultTeacher }
      }
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.teacher.avatar = data.url
      // 上传成功后，如果重新打开上传组件时，要初始化组件，否则会出现显示上一次的上传结果的问题
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 关闭上传组件
    close() {
      this.imagecropperShow = false
      // 上传失败后如果，重新打开上传组件时，要初始化组件，否则出现显示上一次的上传结果的问题
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
}
</script>
