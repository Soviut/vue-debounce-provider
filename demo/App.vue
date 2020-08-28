<template>
  <div id="app">
    <debounce v-slot="{ debounce, debouncing }" :wait="2000" @timeout="timeout">
      <button @click="debounce">
        Click me
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
