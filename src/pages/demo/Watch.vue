<template>
  <div id="page-watch">
    <div @click="time=Math.random()">{{time}}</div>
    <div><div v-html="changeLog"></div></div>
    <div>{{netResp}}</div>
  </div>
</template>

<script>
import { ref, watch, nextTick, watchEffect } from "vue";
import {useHttp} from '../../useApi'

export default {
  setup() {
    const time = ref(new Date().getTime());
    const changeLog = ref('');
    const netResp = ref([]);
    const http = useHttp();

    // 观测演示
    watch(time, (newVal, oldTime) => {
        changeLog.value = `NEW:${newVal} => OLD:${oldTime}<br/>` + changeLog.value
    });

    watchEffect(()=>{
      http.get("http://www.aiyilearning.com/mapi_v2/Course/firstPage").then(data=>{
        netResp.value.push(data);
      }).catch(e=>{
        console.log(e.code)
      })
      http.post("http://gw.aiyilearning.com/doubleteacher/dtApp/artHomePage").then(data=>{
        netResp.value.push(data);
      }).catch(e=>{
        console.log(e.code)
      })
    })

    return {
      time,
      changeLog,
      netResp
    };
  }
};
</script>