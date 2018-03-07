<template>
  <div v-loading="loading">
    <h2>分组</h2>
    <el-button @click="handleEdit({},null)" type="primary">创建新分组</el-button>
    <el-table
      border
      type="index"
      :data="allGroups"
      style="margin-top: 20px"
    >
      <el-table-column
        prop="_id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分组名称">
      </el-table-column>
      <el-table-column
        prop="title"
        label="分组标题">
      </el-table-column>
      <el-table-column
        label="图表">
        <template slot-scope="scope">
          <ul>
            <li v-for="item in scope.row.charts" :key="item._id">{{ item.name }}</li>
          </ul>
        </template>
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
          <el-button type="text" size="small" @click="deleteGroup({id: scope.row._id, index: scope.$index})">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑分组" :visible.sync="dialogVisible">
      <el-form :model="currentData" label-width="80px">
        <el-form-item label="分组名称">
          <el-input v-model="currentData.name"></el-input>
        </el-form-item>
        <el-form-item label="分组标题">
          <el-input v-model="currentData.title"></el-input>
        </el-form-item>
        <el-form-item label="选择图表">
          <el-transfer
            v-model="currentData.ids"
            :titles="['未添加','已添加']"
            :props="{
              key: '_id',
              label: 'name'
            }"
            :data="charts">
          </el-transfer>
        </el-form-item>
      </el-form>
      <div solt="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-show="!currentData._id" type="primary" @click="createGroup()">创建</el-button>
        <el-button v-show="currentData._id" type="primary" @click="editGroup(index)">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { HIDE_MESSAGE } from '../store/types'

export default {
  name: 'NewGroup',
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
    ...mapActions(['getGroups', 'addNewGroup', 'updateGroup', 'deleteGroup', 'getCharts']),
    handleEdit (row, index) {
      this.index = index
      this.currentData = {...row}
      this.dialogVisible = true
    },
    createGroup () {
      this.currentData = {
        ...this.currentData,
        charts: this.currentData.ids
      }
      delete this.currentData.ids
      this.addNewGroup(this.currentData)
    },
    editGroup (index) {
      this.currentData = {
        ...this.currentData,
        charts: this.currentData.ids
      }
      delete this.currentData.ids
      this.updateGroup({ data: this.currentData, index })
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      message: state => state.message,
      groups: state => state.group.list,
      charts: state => state.chart.list
    }),
    ...mapGetters({
      allGroups: 'allGroups'
    })
  },
  data () {
    return {
      dialogVisible: false,
      currentData: {},
      index: null
    }
  },
  created () {
    if (this.charts.length === 0) {
      this.$store.dispatch('getCharts')
    }
    this.$store.dispatch('getGroups')
  }
}
</script>

<style>

</style>
