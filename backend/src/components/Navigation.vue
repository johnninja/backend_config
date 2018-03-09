<template>
  <div v-loading="loading">
    <h2>导航</h2>
    <el-button @click="handleEdit({},null)" type="primary">创建新导航</el-button>
    <el-row style="margin-top: 20px;" :gutter="20">
      <el-col :span="4">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item v-for="(item, index) in navs" :key="item._id" :index="index+''" @click="handleEdit(item, index)">{{item.title}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-form :model="currentData" label-width="80px">
          <el-form-item label="导航名称">
            <el-input v-model="currentData.title"></el-input>
          </el-form-item>
          <el-form-item label="导航路径">
            <el-input v-model="currentData.path"></el-input>
          </el-form-item>
          <el-form-item label="子导航">
            <el-transfer
              v-model="currentData.children"
              :titles="['未添加','已添加']"
              :props="{
                key: '_id',
                label: 'title'
              }"
              :data="pages">
            </el-transfer>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" style="text-align: right">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button v-show="!currentData._id" type="primary" @click="addNewNavigation(currentData)">创建</el-button>
          <el-button v-show="currentData._id" type="primary" @click="updateNavigation({ data: currentData, index })">修改</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { HIDE_MESSAGE } from '../store/types'

export default {
  name: 'Navigation',
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
    ...mapActions(['getNavigations', 'addNewNavigation', 'updateNavigation', 'deleteNavigation']),
    handleEdit (row, index) {
      this.index = index
      this.currentData = row
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      message: state => state.message
    }),
    ...mapGetters({
      navs: 'allNavs',
      pages: 'allPages'
    })
  },
  data () {
    return {
      currentData: {},
      index: null
    }
  },
  created () {
    if (this.pages.length === 0) {
      this.$store.dispatch('getPages')
    }
    this.$store.dispatch('getNavigations')
  }
}
</script>

<style>

</style>
