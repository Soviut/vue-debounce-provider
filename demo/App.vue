<template>
  <div id="app">
    <debounce
      v-slot="{ debounce, cancel, flush, debouncing, wait, maxWait }"
      :wait="3000"
      :max-wait="3500"
      @start="onStart"
      @timeout="onTimeout"
      @cancel="onCancel"
    >
      <button @click="debounce">
        Start
      </button>

      <button @click="flush">
        Flush
      </button>

      <button @click="cancel">
        Cancel
      </button>

      <p>Debouncing ({{ wait }} ms, {{ maxWait }} max): {{ debouncing }}</p>
    </debounce>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    onTimeout(e) {
      console.log('onTimeout', e)
    },

    onCancel(e) {
      console.log('onCancel', e)
    }
  },
}
</script>
