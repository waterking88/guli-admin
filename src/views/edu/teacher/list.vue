<template>
  <div class="app-container">

    <el-form
      :inline="true"
      class="demo-form-inline"
    >
      <el-form-item>
        <el-input
          v-model="teacherQuery.name"
          placeholder="讲师名"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
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
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getTeacherListPage()"
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
        prop="name"
        label="名称"
        width="80"
      />
      <el-table-column
        label="头衔"
        width="80"
      >
        <template slot-scope="scope">
          <!-- //三个等号判断类型和值 两个等号判断值-->
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="career"
        label="资历"
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
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
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
            @click="deleteTeacherId(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 封装单向绑定页数，改变页数的时候重新调用getTeacherListPage方法 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getTeacherListPage"
    />
  </div>
</template>
//引入teacher.js文件
<script>
import teacher from '@/api/edu/teacher'

export default {
  //写核心代码位置
  data() {
    return {
      //定义变量和初始值
      list: null, //查询之后接口返回集合
      page: 1,
      limit: 2,
      total: 0,
      teacherQuery: {
        //条件封装对象，不定义字段也可以自动封装
      }
    }
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getTeacherListPage()
  },
  methods: {
    //创建具体的方法，调用teacher.js定义的方法
    // page不传参的话默认是1
    getTeacherListPage(page = 1) {
      this.page = page
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
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
      this.teacherQuery = {}
      //查询表单
      this.getTeacherListPage()
    },
    deleteTeacherId(id) {
      //删除讲师
      //弹窗组件
      this.$confirm('此操作将永久删除该讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除、提示、刷新、
        teacher.deleteTeacherId(id).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTeacherListPage()
        })
      })
    }
  }
}
</script>
