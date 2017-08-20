<template>
 <div>
   <div class="filter">
     <el-select v-model="category" placeholder="类别" size="mini">
       <el-option
         v-for="item in categoryData"
         :key="item.value"
         :label="item.label"
         :value="item.value"
         :disabled="item.disabled">
       </el-option>
     </el-select>
   </div>
   <div class="article-list">
     <el-table
       :data="tableData"
       border
       style="width: 90%">
       <el-table-column
         label="标题"
         width="350">
         <template scope="scope">
           <el-icon name="time"></el-icon>
           <span style="margin-left: 10px">{{ scope.row.date }}</span>
         </template>
       </el-table-column>
       <el-table-column
         label="类别"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag>{{ scope.row.name }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="阅读"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag>{{ scope.row.name }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         label="评论"
         width="100">
         <template scope="scope">
           <div slot="reference" class="name-wrapper">
             <el-tag>{{ scope.row.name }}</el-tag>
           </div>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template scope="scope">
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">置顶</el-button>
           <el-button
             size="small"
             @click="handleEdit(scope.$index, scope.row)">分类</el-button>
           <el-button
             size="small"
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
   <el-pagination
     layout="prev, pager, next"
     :total="50">
   </el-pagination>
 </div>
</template>
<script>
export default {
  data () {
    return {
      categoryData: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      category: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style scoped>
  .article-list {
    margin-top: 5px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 40px;
  }
</style>
