<template>
  <div class="app-container">

    <el-form
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input
          v-model="bannerQuery.title"
          placeholder="标题"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="bannerQuery.imageUrl"
          placeholder="图片URL"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="bannerQuery.linkUrl"
          placeholder="链接URL"
        />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="bannerQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bannerQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getBannerListPage()"
      >查询</el-button>
      <el-button
        type="default"
        @click="resetData()"
      >清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="80"
      />
      <el-table-column
        prop="imageUrl"
        label="图片URL"
      />
      <el-table-column
        prop="linkUrl"
        label="链接URL"
      />
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
      />
      <el-table-column
        prop="sort"
        label="排序"
        width="60"
      />
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <router-link :to="'/edu/banner/edit/'+scope.row.id">
            <el-button
              type="primary"
              size="mini"
            >修改
            </el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteBannerId(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 封装单向绑定页数，改变页数的时候重新调用getBannerListPage方法 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getBannerListPage"
    />
  </div>
</template>
//引入banner.js文件
<script>
import banner from '@/api/edu/banner'

export default {
  //写核心代码位置
  data() {
    return {
      //定义变量和初始值
      list: null, //查询之后接口返回集合
      page: 1,
      limit: 2,
      total: 0,
      bannerQuery: {
        //条件封装对象，不定义字段也可以自动封装
      }
    }
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getBannerListPage()
  },
  methods: {
    //创建具体的方法，调用banner.js定义的方法
    // page不传参的话默认是1
    getBannerListPage(page = 1) {
      this.page = page
      console.log(this.bannerQuery.title)
      banner
        .getBannerListPage(this.page, this.limit, this.bannerQuery)
        .then((response) => {
          //response接口返回的数据
          // console.log(response);
          this.list = response.data.rows
          this.total = response.data.total
          console.log(response)
        })
      // .catch((error) => {
      //   console.log(error)
      // }) //请求失败
    },
    resetData() {
      //清空表单输入
      this.bannerQuery = {}
      //查询表单
      this.getBannerListPage()
    },
    deleteBannerId(id) {
      //删除讲师
      //弹窗组件
      this.$confirm('此操作将永久删除该幻灯片记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除、提示、刷新、
        banner.deleteBannerId(id).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getBannerListPage()
        })
      })
    }
  }
}
</script>
