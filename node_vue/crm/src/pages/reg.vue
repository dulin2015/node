<template>
  <div class="reg">
    {{str}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: '您好，Hello world~ 您好，世界， JAVA'
    }
  },
  mounted() {
      let reg_str = 'java';
      let reg = eval(`/${reg_str}/ig`);

      this.str = this.str.replace(reg, reg_str);
  },
  methods: {

  }
}
</script>

<style>

</style>
