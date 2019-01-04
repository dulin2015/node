<template>
  <div id="app">
    <el-header></el-header>
    <div class="crumbs"></div>
    <el-container>
      <router-view/>
    </el-container>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

