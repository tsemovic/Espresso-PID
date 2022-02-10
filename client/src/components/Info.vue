<template>
    <q-card flat bordered class="my-card bg-white text-primary no-margin full-height">

      <!-- Temperature -->
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">Temperature</div>
            <div class="text-h6">{{ temperature.at(-1) }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- Separator -->
      <q-separator inset />

      <!-- Target Temperature -->
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">Target Temperature</div>
            <div class="text-h6">{{ targetTemperature }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- Settings -->
      <q-card-actions>
        <q-btn color="red" icon="settings" label="Settings" />
      </q-card-actions>

    </q-card>
</template>

<style>
</style>

<script>
export default {
  name: "Info",
  props: ["P", "I", "D", "targetTemperature", "temperature"],

  data: function () {
    return {};
  },
};
</script>
