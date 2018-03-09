<template>
  <el-container>
    <el-header style="background-color: #545c64;">Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1">
            <router-link to="navigation" slot="title">新建导航</router-link>
          </el-menu-item>
          <el-menu-item index="1">
            <router-link to="chart" slot="title">新建图表</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="group" slot="title">新建分组</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="page" slot="title">新建页面</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="build" slot="title">发布页面</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-menu-item a {
    display: block;
    text-decoration: none;
    color: #303133;
  }
  .el-menu-item .router-link-active {
    color: #409EFF;
  }
</style>
