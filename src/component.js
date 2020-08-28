export default {
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        debounce: this.debounce,
        cancel: this.cancel,
        debouncing: this.debouncing,
        wait: this.wait,
      }),
    ])
  },

  name: 'debounce',

  props: {
    wait: {
      type: Number,
      default: 0, // milliseconds
    },

    maxWait: {
      type: Number,
      default: null, // milliseconds
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
      maxTimer: null,
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
          this.timer = null
          clearTimeout(this.maxTimer)
          this.maxTimer = null
          this.debouncing = false

          if (this.trailing) {
            console.log('timeout')
            this.$emit('timeout', $event)
          }
        }, this.wait)

        this.maxTimer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
          clearTimeout(this.maxTimer)
          this.maxTimer = null
          this.debouncing = false

          if (this.trailing) {
            console.log('max timeout')
            this.$emit('timeout', $event)
          }
        }, this.maxWait)
      }
    },

    cancel($event) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
        clearTimeout(this.maxTimer)
        this.maxTimer = null
        this.debouncing = false

        this.$emit('cancel', $event)
      }
    },
  },
}
