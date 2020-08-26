<template>
  <div id="app">
    <debounce v-slot="{ debounce }" :wait="1000" @timeout="timeout">
      <button @click="debounce">
        Click me
      </button>
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
