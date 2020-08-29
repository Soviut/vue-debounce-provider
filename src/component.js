export default {
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        debounce: this.debounce,
        cancel: this.cancel,
        flush: this.flush,
        debouncing: this.debouncing,
        wait: this.wait,
        maxWait: this.maxWait,
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
      if (!this.timer) {
        this.$emit('start', $event)
      }

      if ((!this.timer && this.leading) || this.wait === 0) {
        this.$emit('timeout', $event)
      }

      if (this.wait > 0) {
        clearTimeout(this.timer)

        this.debouncing = true

        this.timer = setTimeout(() => {
          this.stop()

          if (this.trailing) {
            this.$emit('timeout', $event)
          }
        }, this.wait)

        if (this.maxWait && !this.maxTimer) {
          this.maxTimer = setTimeout(() => {
            this.stop()

            if (this.trailing) {
              this.$emit('timeout', $event)
            }
          }, this.maxWait)
        }
      }
    },

    cancel($event) {
      if (this.timer) {
        this.stop()

        this.$emit('cancel', $event)
      }
    },

    flush($event) {
      if (this.timer) {
        this.stop()

        if (this.trailing) {
          this.$emit('timeout', $event)
        }
      }
    },

    stop() {
      clearTimeout(this.timer)
      this.timer = null
      clearTimeout(this.maxTimer)
      this.maxTimer = null
      this.debouncing = false
    },
  },
}
