export default {
  render (h) {
    return h('div', [
      this.$scopedSlots.default({
        debounce: this.debounce,
      }),
    ])
  },

  name: 'debounce',

  props: {
    wait: {
      type: Number,
      default: 0, // milliseconds
    },

    // invoke on the leading edge of the timeout
    leading: {
      type: Boolean,
      default: false,
    },

    // invoke on the trailing edge of the timeout
    trailing: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      debouncer: null,
    }
  },

  methods: {
    debounce ($event) {
      if ((!this.debouncer && this.leading) || this.wait === 0) {
        this.$emit('timeout', $event)
      }

      if (this.wait > 0) {
        clearTimeout(this.debouncer)

        this.debouncer = setTimeout(() => {
          clearTimeout(this.debouncer)

          if (this.trailing) {
            this.$emit('timeout', $event)
          }
        }, this.wait)
      }
    },
  },
}
