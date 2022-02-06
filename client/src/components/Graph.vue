<template>
  <div>
    <q-card class="my-card bg-white text-red">
      <q-card-section>
        <div class="text-h6">{{ temperature }}</div>
        <!-- <div class="text-subtitle2">by John Doe</div> -->
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "Graph",
  props: ['temperature'],
};
</script>
