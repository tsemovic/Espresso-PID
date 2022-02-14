<q-card
      flat
      bordered
      class="info-container info-card bg-white text-primary no-margin full-height"
    >
      <!-- Temperature -->
      <q-card-section class="column">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle1">Temperature</div>
            <div class="text-h3">{{ displayTemperature }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- Separator -->
      <q-separator inset />

      <!-- Target Temperature -->
      <q-card-section class="column">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle1">Target Temperature</div>
            <div class="text-h3">{{ targetTemperature }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- Separator -->
      <q-separator inset />

      <!-- Current Settings -->
      <q-card-section class="column">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle1">Settings</div>
            <div class="text-h3">P: {{ P }}</div>
            <div class="text-h3">I: {{ I }}</div>
            <div class="text-h3">D: {{ D }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- Settings -->
      <q-card-actions class="justify-center">
        <q-btn
          color="red"
          size= "22px"
          icon="settings"
          label="Settings"
          @click="
            updateForm();
            settings = true;
          "
        />
      </q-card-actions>
    </q-card>