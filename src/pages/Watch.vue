<template>
  <div id="page-watch">
    <div @click="time=Math.random()">{{time}}</div>
  </div>
</template>

<script>
import { ref, watchEffect, nextTick } from "vue";
import { useRouter } from "../useApi";

export default {
  setup() {
    const router = useRouter().currentRoute.value;
    console.log(router)
    const time = ref(new Date().getTime());

    // 观测演示
    watchEffect(() => {
      
    });

    return {
      time
    };
  }
};
</script>