<template>
  <div v-loading="loading">
    <h2>页面</h2>
    <el-button @click="handleEdit({},null)" type="primary">创建新页面</el-button>
    <el-table
      border
      type="index"
      :data="allPages"
      style="margin-top: 20px"
    >
      <el-table-column
        prop="_id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="页面名称">
      </el-table-column>
      <el-table-column
        prop="title"
        label="页面标题">
      </el-table-column>
      <el-table-column
        label="分组">
        <template slot-scope="scope">
          <ul>
            <li v-for="item in scope.row.groups" :key="item._id">{{ item.name }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        prop="path_name"
        label="路径名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="访问路径">
      </el-table-column>
      <el-table-column
        prop="node"
        label="权限节点">
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
          <el-button type="text" size="small" @click="deletePage({id: scope.row._id, index: scope.$index})">删除</el-button>
          <el-button type="text" size="small" @click="buildPage({id: scope.row._id, index: scope.$index})">{{scope.row.build ? '重新编译' : '编译'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑页面" :visible.sync="dialogVisible">
      <el-form :model="currentData" label-width="80px">
        <el-form-item label="页面名称">
          <el-input v-model="currentData.name"></el-input>
        </el-form-item>
        <el-form-item label="页面标题">
          <el-input v-model="currentData.title"></el-input>
        </el-form-item>
        <el-form-item label="路径名称">
          <el-input v-model="currentData.path_name"></el-input>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="currentData.path"></el-input>
        </el-form-item>
        <el-form-item label="权限节点">
          <el-input v-model="currentData.node"></el-input>
        </el-form-item>
        <el-form-item label="选择分组">
          <el-transfer
            v-model="currentData.ids"
            :titles="['未添加','已添加']"
            :props="{
              key: '_id',
              label: 'name'
            }"
            :data="groups">
          </el-transfer>
        </el-form-item>
      </el-form>
      <div solt="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-show="!currentData._id" type="primary" @click="createPage()">创建</el-button>
        <el-button v-show="currentData._id" type="primary" @click="editPage(index)">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { HIDE_MESSAGE } from '../store/types'

export default {
  name: 'NewPage',
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
    ...mapActions(['getPages', 'addNewPage', 'updatePage', 'deletePage', 'getGroups', 'buildPage']),
    handleEdit (row, index) {
      this.index = index
      this.currentData = {...row}
      this.dialogVisible = true
    },
    createPage () {
      this.currentData = {
        ...this.currentData,
        groups: this.currentData.ids
      }
      delete this.currentData.ids
      this.addNewPage(this.currentData)
    },
    editPage (index) {
      this.currentData = {
        ...this.currentData,
        groups: this.currentData.ids
      }
      delete this.currentData.ids
      this.updatePage({ data: this.currentData, index })
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      message: state => state.message,
      pages: state => state.page.list,
      groups: state => state.group.list
    }),
    ...mapGetters({
      allPages: 'allPages'
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
    if (this.groups.length === 0) {
      this.$store.dispatch('getGroups')
    }
    this.$store.dispatch('getPages')
  }
}
</script>

<style>

</style>
