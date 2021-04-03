<template>
    <div id="editor">
        <textarea v-model="src"></textarea>
        <vue-markdown :source="src"></vue-markdown>
        <div>
            {{ src }}
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
    components: {
        VueMarkdown,
    },
    data() {
        return {
            src: ''
        }
    },
    mounted () {
        setInterval(() => {
            this.source = new Date().toLocaleTimeString();
        }, 1000);
    }
}
</script>

<style scoped>
textarea, #editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
</style>
