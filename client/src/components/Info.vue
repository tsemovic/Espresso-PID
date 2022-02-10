<template>
  <div>
    <q-card
      flat
      bordered
      class="my-card bg-white text-primary no-margin full-height"
    >
      <!-- Temperature -->
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">Temperature</div>
            <div class="text-h6">{{ temperature.at(-1) }}</div>
            <div class="text-h6">
              {{ P }}|{{ I }}|{{ D }}|{{ targetTemperature }}
            </div>
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
        <q-btn
          color="red"
          icon="settings"
          label="Settings"
          @click="updateForm(); settings = true"
        />
      </q-card-actions>
    </q-card>

    <q-dialog
      v-model="settings"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card>
        <q-card-section
          class="row items-center q-pb-none bg-white text-primary"
        >
          <div class="text-h6">PID Settings</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
          <q-btn
            icon="done"
            flat
            round
            dense
            v-close-popup
            @click="passEvent"
          />
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-3 q-pa-sm">
              <q-input v-model="form_P" label="P" :dense="dense" />
            </div>
            <div class="col-3 q-pa-sm">
              <q-input v-model="form_I" label="I" :dense="dense" />
            </div>
            <div class="col-3 q-pa-sm">
              <q-input v-model="form_D" label="D" :dense="dense" />
            </div>
            <div class="col-auto q-pa-sm">
              <q-input
                v-model="form_targetTemperature"
                label="Target Temperature"
                :dense="dense"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: "Info",
  props: ["P", "I", "D", "targetTemperature", "temperature"],

  data: function () {
    return {
      form_P: this.P,
      form_I: this.I,
      form_D: this.D,
      form_targetTemperature: this.targetTemperature,
    };
  },
  created() {
    // this.updateForm();
  },
  beforeMount() {
    // this.updateForm();
  },
  methods: {
    passEvent() {
      var data = {
        P: this.form_P,
        I: this.form_I,
        D: this.form_D,
        targetTemperature: this.form_targetTemperature,
      };
      this.$emit("setPID", data);
    },
    updateForm() {
      this.form_P = this.P;
      this.form_I = this.I;
      this.form_D = this.D;
      this.form_targetTemperature = this.targetTemperature;
    },
  },
};
</script>
