<template>
  <div id="main">
    <nav>
      <template v-for="item in routes">
        <router-link :to="item.path" :key="item.path">{{item.name}}</router-link>
      </template>
    </nav>
    <section>
      <router-view />
    </section>
  </div>
</template>
<script>
import { useRouter } from "./useApi";
import { ref } from "vue";
// 自动获取路由
export default {
  setup() {
    const router = useRouter();
    const routes = ref(router.getRoutes());
    return {
      routes
    };
  }
};
</script>
<style lang="less">
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #999;
}
a {
  text-decoration: none;
  color: #333;
  &:hover {
    color: #333;
    text-decoration: underline;
  }
}
</style>
<style lang="less" scope>
#main {
  > nav {
    width: 700px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 10px auto;
    > a {
      display: inline-block;
      height: 80px;
      width: 100px;
      line-height: 80px;
      vertical-align: middle;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid #f00;
      border-right: none;
      &:last-child {
        border-right: 1px solid #f00;
      }
    }
  }
  > section {
    border: 1px solid #000;
    width: 700px;
    min-height: 800px;
    margin: 0 auto;
  }
}
</style>
