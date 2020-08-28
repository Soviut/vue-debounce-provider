<template>
  <div id="app">
    <debounce
      v-slot="{ debounce, cancel, debouncing }"
      :wait="3000"
      @timeout="timeout"
    >
      <button @click="debounce">
        Start
      </button>

      <button @click="cancel">
        Cancel
      </button>

      <p>
        Debouncing: {{ debouncing }}
      </p>
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
