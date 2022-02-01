<template>
  <v-app>
    <client />
  </v-app>
</template>

<script>
import Client from './components/client';

export default {
  name: 'app',
  components: {
    Client
  }
}
</script>
