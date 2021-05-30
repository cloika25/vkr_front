<template>
  <div>
  <b-container class="main_flex">
    <div class="left_flex">
      <span>Инструкция по работе с</span>
      <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a>
    </div>
    <div class="rigth_flex">
      <span>Link on github: </span>
      <a href="https://github.com/cloika25">Timur Rylov</a>
    </div>
  </b-container>
  </div>
</template>

<script>
export default {
name: "pageFooter",
  data(){
    return {

    }
  },
}
</script>

<style scoped>
.main_flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left_flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.rigth_flex {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
