<template>
  <div v-loading="loading">
    <h2>图表</h2>
    <el-button @click="handleEdit({},null)" type="primary">创建新图表</el-button>
    <el-table
      border
      type="index"
      :data="charts"
      style="margin-top: 20px"
    >
      <el-table-column
        prop="_id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图表名称">
      </el-table-column>
      <el-table-column
        prop="api"
        label="接口地址">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row, scope.$index)">修改</el-button>
          <el-button type="text" size="small" @click="deleteChart({id: scope.row._id, index: scope.$index})">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑图表" :visible.sync="dialogVisible">
      <el-form :model="currentData" label-width="80px">
        <el-form-item label="图表名称">
          <el-input v-model="currentData.name"></el-input>
        </el-form-item>
        <el-form-item label="接口地址">
          <el-input v-model="currentData.api"></el-input>
        </el-form-item>
        <el-form-item label="图表配置">
          <el-input type="textarea" :rows="10" v-model="currentData.option"></el-input>
        </el-form-item>
      </el-form>
      <div solt="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-show="!currentData._id" type="primary" @click="addNewChart(currentData)">创建</el-button>
        <el-button v-show="currentData._id" type="primary" @click="updateChart({ data: currentData, index })">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { HIDE_MESSAGE } from '../store/types'

export default {
  name: 'NewChart',
  beforeUpdate () {
    if (this.message !== '') {
      if (this.message === 'success') {
        this.$message({
          message: this.message,
          type: 'success'
        })
        this.dialogVisible = false
      } else {
        this.$message.error(this.message)
      }

      this.$store.commit(HIDE_MESSAGE)
    }
  },
  methods: {
    ...mapActions(['getCharts', 'addNewChart', 'updateChart', 'deleteChart']),
    handleEdit (row, index) {
      this.index = index
      this.currentData = {...row}
      this.dialogVisible = true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      message: state => state.message
    }),
    ...mapGetters({
      charts: 'allCharts'
    })
  },
  data () {
    return {
      dialogVisible: false,
      currentData: {},
      index: null,
      form: {
        name: ''
      }
    }
  },
  created () {
    this.$store.dispatch('getCharts')
  }
}
</script>

<style>

</style>
