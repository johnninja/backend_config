<template>
  <el-container>
    <el-button :loading="applying" type="primary" @click="applyChange()">应用</el-button>
    <el-button :loading="building" type="primary" @click="buildApp()">编译项目</el-button>
  </el-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { HIDE_MESSAGE } from '../store/types'

export default {
  name: 'Build',
  beforeUpdate () {
    if (this.message !== '') {
      if (this.message === 'success') {
        this.$message({
          message: this.message,
          type: 'success'
        })
      } else {
        this.$message.error(this.message)
      }

      this.$store.commit(HIDE_MESSAGE)
    }
  },
  computed: {
    ...mapState({
      applying: state => state.build.applying,
      building: state => state.build.building,
      message: state => state.message
    })
  },
  methods: {
    ...mapActions(['applyChange', 'buildApp'])
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
