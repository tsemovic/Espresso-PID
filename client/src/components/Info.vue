<template>
      <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ temperature }}</div>
            <div class="text-subtitle2">Temperature</div>
          </div>

        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn color="red" icon="settings" label="Settings" />
      </q-card-actions>
    </q-card>
</template>

<style>
</style>

<script>
export default {
  name: 'Info',
  data(){
      return{
          temperature: 20
      }
  }
}
</script>
