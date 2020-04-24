<template>
  <div id="main">
    <router-link to="/about" >about</router-link><br/>
    <router-link to="/" >home</router-link><br/>
    
    
    <br/><br/><br/>
    <router-view />
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
