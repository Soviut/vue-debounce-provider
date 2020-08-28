export default {
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        debounce: this.debounce,
        debouncing: this.debouncing,
        cancel: this.cancel,
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

  data() {
    return {
      timer: null,
      debouncing: false,
    }
  },

  methods: {
    debounce($event) {
      if ((!this.timer && this.leading) || this.wait === 0) {
        this.$emit('timeout', $event)
      }

      if (this.wait > 0) {
        clearTimeout(this.timer)

        this.debouncing = true

        this.timer = setTimeout(() => {
          clearTimeout(this.timer)

          if (this.trailing) {
            this.$emit('timeout', $event)
            this.debouncing = false
          }
        }, this.wait)
      }
    },

    cancel($event) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.debouncing = false
        this.$emit('cancel', $event)
      }
    }
  },
}
