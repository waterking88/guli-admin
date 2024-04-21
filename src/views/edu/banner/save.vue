<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题名称">
        <el-input v-model="banner.title" />
      </el-form-item>
      <el-form-item label="幻灯片排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="链接URL">
        <el-input v-model="banner.linkUrl" />
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleImageUrlSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/file/upload'"
          class="avatar-uploader"
        >
          <img :src="banner.imageUrl">
        </el-upload>
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
import banner from '@/api/edu/banner'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
const defaultBanner = {
  sort: 0,
  imageUrl: process.env.OSS_PATH + '/cover/default.jpg' //默认封面图片
}
export default {
  components: { ImageCropper, PanThumb }, //声明组件
  data() {
    return {
      banner: defaultBanner,
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
    handleImageUrlSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      this.banner.imageUrl = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.banner.id) {
        this.saveData()
      } else {
        this.updateById()
      }
    },
    // 保存
    saveData() {
      banner
        .save(this.banner)
        .then((response) => {
          return this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
        .then((resposne) => {
          //路由跳转
          this.$router.push({ path: '/edu/banner' })
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
      banner.getById(id).then((response) => {
        this.banner = response.data.item
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
      banner
        .updateById(this.banner)
        .then((response) => {
          return this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
        .then((resposne) => {
          this.$router.push({ path: '/edu/banner' })
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
        this.banner = { ...defaultTBanner }
      }
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      this.imagecropperShow = false
      this.banner.imageUrl = data.imageUrl
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
