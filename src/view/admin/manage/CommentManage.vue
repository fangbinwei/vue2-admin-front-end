<template>
  <div class="comment-admin">
    <div class="comment-list">
      <el-table
        :data="commentData"
        border
        height="300"
        style="width: 100%"
        :emptyText="emptyText"
        v-loading="tableLoading">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="姓名"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发表时间"
          width="200">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.replyTime | momentWithYear}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          width="250">
          <template slot-scope="scope">
            <el-icon name="document"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.content.slice(0,10)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleStick(scope.$index, scope.row)">置顶</el-button>
            <el-button
              size="small"
              @click="handleWatch(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="small"
              @click="handleCheck(scope.$index, scope.row)">审核</el-button>
            <el-button
              size="small"
              type="danger"
              :loading="delLoading"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-sizes="[5, 10, 20]"-->
      <!--:page-size="pageSize"-->
      <!--layout="total, prev, pager, next, sizes"-->
      <!--:total="totalArticle">-->
    <!--</el-pagination>-->
    <!--<my-dialog :is-show="showCateDialog" @on-close="closeDialog">-->
      <!--<el-input v-model.trim="cateInput"></el-input>-->
      <!--<div class="buttons">-->
        <!--<el-button @click="closeDialog">取消</el-button>-->
        <!--<el-button v-loading="cateLoading" @click="updateCategory">确定</el-button>-->
      <!--</div>-->
    <!--</my-dialog>-->
  </div>
</template>
<script>
  import MyDialog from '@/components/dialog'
  import {getAllCommentAPI} from '@/api/article'
  export default {
    data () {
      return {
        emptyText: '暂无数据',
        // loading
        tableLoading: false,
        delLoading: false,
        commentData: []
      }
    },
    components: {
      MyDialog
    },
    methods: {
      updateCommentList () {
        this.tableLoading = true
        getAllCommentAPI()
          .then((res) => {
            this.commentData = res.data.result.doc
            this.tableLoading = false
          })
          .catch(() => {
            this.tableLoading = false
          })
      },
      handleCheck () {
      },
      handleWatch () {
      },
      handleStick () {
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.updateCommentList()
      })
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
  .buttons {
    text-align: center;
    margin-top: 20px;
  }
</style>

