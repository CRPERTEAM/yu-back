<template lang="html">
  <div class="l-table-container">
    <el-table
      :data="list"
      border
      tooltip-effect="dark"
      :style="style"
      ref="table"
      class="table"
      v-if="list.length > 0">
      <el-table-column
        type="selection"
        width="50"
        v-if="hasSelection">
      </el-table-column>
      <el-table-column
        v-for="item in fields"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || ''"
        v-if="!item.noShow"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        :width="operateCellWidth"
        v-if="operateType != -1 || operateTypes.length > 0">
        <template slot-scope="scope">
          <div class="operate-cell">
            <el-button
              size="small"
              type="primary"
              @click="handleOperate('view', scope.$index, scope.row)"
              v-if="(operateType >> 2 & 1) || validTypes('view')">查看</el-button>
            <el-button
              size="small"
              @click="handleOperate('edit', scope.$index, scope.row)"
              v-if="operateType >> 1 & 1 || validTypes('edit')">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleOperate('delete', scope.$index, scope.row)"
              v-if="operateType & 1 || validTypes('delete')">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :pageSize="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableTotal"
      class="pagination"
      v-if="tableTotal > 0">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LTable',
  props: {
    // type区分读取的table
    name: {
      type: String
    },
    fields: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    tableTotal: {
      type: Number,
      defualt: 0
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    // operateType 删除 001 编辑 010 查看 100
    operateType: {
      type: Number,
      default: -1
    },
    operateTypes: {
      type: Array,
      default: () => [],
      validator: function (value) {
        let validArr = ['view', 'edit', 'delete']
        let flag = true
        for (let i = 0; i < value.length; ++i) {
          if (validArr.indexOf(value[i]) < 0) {
            flag = false
            break
          }
        }
        return flag
      }
    }
  },
  data () {
    return {
      _list: this.list,
      _fields: this.fields,
      currentPage: 1,
      pageSize: 10,
      style: ''
    }
  },
  computed: {
    operateCellWidth: function () {
      let op = this.operateType
      let ops = this.operateTypes
      let cnt = 0

      if (op === 0) {
        cnt = ops.length
      } else {
        while (op) {
          cnt = op & 1 ? ++cnt : cnt
          op = op >> 1
          // console.log(`op: ${op}, cnt: ${cnt}`)
        }
      }
      console.log(cnt * 75)
      return cnt * 75
    }
  },
  created () {
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleOperate (type, index, row) {
      // 删除操作添加提示
      if (type === 'delete') {
        this.$confirm('此操作将删除该项，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('handleOperate', type, this.list[index])
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          })
        })
      } else {
        this.$emit('handleOperate', type, this.list[index])
      }
    },
    validTypes: function (type) {
      return this.operateTypes.indexOf(type) > -1
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
.l-table-container {
  // position: absolute;
  max-width: 100%;
  .table {
    .operate-cell {
      display: flex;
      justify-content: space-between;
    }
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
