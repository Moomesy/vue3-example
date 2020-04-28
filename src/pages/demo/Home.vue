<template>
  <div id="page-home">
    <div>时间戳：{{timestamp}}</div>
    <div>格式化时间：{{time}}</div>
    <div>无法观测：{{tmp.aaa}}[{{tmp.updatedTime}}]</div>
    <div>
      可观测：{{tmp2.aaa}}
      <b>[{{tmp2.updatedTime}}]</b>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onUnmounted,
  reactive,
  watchEffect,
  nextTick
} from "vue";
import { useHelper } from "../../useApi";

export default {
  setup() {
    const helper = useHelper();
    const time = ref(new Date().getTime());

    // computed演示
    const timestamp = computed(() => {
      return helper.formatTimestamp(time.value);
    });
    // return出去还是可以动态渲染dom，但是无法观测
    const tmp = {
      aaa: 123,
      updatedTime: 0
    };
    // 比上面增加了观测
    const tmp2 = reactive({
      aaa: 123,
      updatedTime: 0
    });

    const iterator = setInterval(() => {
      time.value += 1000;
      tmp.aaa = Math.floor((Math.random() + 1) * 100);
      tmp2.aaa = Math.floor((Math.random() + 1) * 100);
    }, 1000);
    // 生命周期演示
    onUnmounted(() => {
      clearInterval(iterator);
    });

    // 观测演示
    watchEffect(onCalled => {
      onCalled(() => {
        console.log("tmp2.aaa 被改变");
      });
      console.log(tmp2.aaa);
      tmp2.updatedTime = new Date().toLocaleString();
    });
    // 下面这个无法被触发
    watchEffect(onCalled => {
      onCalled(() => {
        console.log("tmp.aaa 被改变");
      });
      console.log(tmp.aaa);
      tmp.updatedTime = new Date().toLocaleString();
    });

    return {
      time,
      timestamp,
      tmp2,
      tmp
    };
  }
};
</script>