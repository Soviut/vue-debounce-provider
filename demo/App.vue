<template>
  <div id="app">
    <debounce
      v-slot="{ debounce, cancel, debouncing, wait }"
      :wait="3000"
      :max-wait="3500"
      @timeout="timeout"
    >
      <button @click="debounce">
        Start
      </button>

      <button @click="cancel">
        Cancel
      </button>

      <p>Debouncing ({{ wait }} ms): {{ debouncing }}</p>
    </debounce>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    timeout(e) {
      console.log(e)
    },
  },
}
</script>
