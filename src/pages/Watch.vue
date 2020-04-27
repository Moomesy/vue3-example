<template>
  <div id="page-watch">
    <div @click="time=Math.random()">{{time}}</div>
    <div><div v-html="changeLog"></div></div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from "vue";

export default {
  setup() {
    const time = ref(new Date().getTime());
    const changeLog = ref('');

    // 观测演示
    watch(time, (newVal, oldTime) => {
        changeLog.value = `NEW:${newVal} => OLD:${oldTime}<br/>` + changeLog.value
    });

    return {
      time,
      changeLog
    };
  }
};
</script>