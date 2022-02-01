<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  <div>
    <md-button class="md-raised md-primary">Primary</md-button>
  </div>
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url('~@/assets/beansDark.jpg'); 

}
</style>