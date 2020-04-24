<template>
  <div class="hello">
    <div>{{timestamp}}</div>
    <div>{{time}}</div>
    <div>{{tmp}}</div>
    <div>{{tmp2}}</div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted, reactive, watchEffect, WatchCallback } from 'vue'
import { useHelper } from '../useApi';

export default {
  setup() {
    const time = ref(new Date().getTime());
    const tmp = {
      aaa: 123,
      bbb: 445
    };
    const tmp2 = reactive({
      aaa: 123,
      bbb: 445
    });
    const helper = useHelper();
    const timestamp = computed(() => {
      return helper.formatTimestamp(time.value);
    })

    const dateTimer = setInterval(() => {
      time.value += 1000;
      tmp.aaa = Math.random()
      tmp2.aaa = Math.random()
    }, 1000);

    onUnmounted(() => {
      clearInterval(dateTimer)
    });

    watchEffect(onCalled => {
      onCalled((a,b,c) => {
        console.log('tmp2.aaa 被改变', tmp2.aaa, a, b, c)
      });
      console.log(tmp2.aaa);
    });

    


    return {
      time,
      timestamp,
      tmp2,
      tmp
    }
  }
}
</script>