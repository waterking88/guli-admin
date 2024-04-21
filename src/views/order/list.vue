<template>
  <div class="app-container">

    <el-form
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input
          v-model="orderQuery.name"
          placeholder="讲师名"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="orderQuery.courseTitle"
          placeholder="课程名称"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="orderQuery.nickname"
          placeholder="会员昵称"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="orderQuery.mobile"
          placeholder="会员手机"
        />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="orderQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="orderQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getOrderListPage()"
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
        prop="courseTitle"
        label="课程名称"
      />
      <el-table-column
        prop="teacherName"
        label="教师名称"
        width="80"
      />
      <el-table-column
        prop="nickname"
        label="会员昵称"
      />
      <el-table-column
        prop="mobile"
        label="会员手机"
      />
      <el-table-column
        prop="totalFee"
        label="订单金额"
      />
      <el-table-column
        prop="gmtCreate"
        label="添加时间"
        width="160"
      />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getOrderListPage"
    />
  </div>
</template>
//引入teacher.js文件
<script>
import order from '@/api/order'

export default {
  //写核心代码位置
  data() {
    return {
      //定义变量和初始值
      list: null, //查询之后接口返回集合
      page: 1,
      limit: 3,
      total: 0,
      orderQuery: {
        //条件封装对象，不定义字段也可以自动封装
      }
    }
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getOrderListPage()
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    // page不传参的话默认是1
    getOrderListPage(page = 1) {
      this.page = page
      order
        .getOrderListPage(this.page, this.limit, this.orderQuery)
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
      this.orderQuery = {}
      //查询表单
      this.getOrderListPage()
    }
  }
}
</script>
