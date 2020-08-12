# vue-debounce-provider

A template-based debounce provider component.

## Installation

Install with npm

    npm install vue-debounce-provider

Install with Yarn

    yarn install vue-debounce-provider

## What is Debouncing?

Debouncing prevents a slow operation from being spammed by "noisy" events. It
does this by waiting an elapsed time after each event before performing the
operation. If another event comes in before the time has elapsed, the timer
is restarted so only the last event triggers the operation a single time.

## Usage

Vue Debounce Provider lets you perform debouncing directly in the template,
rather than writing additional methods or using wrapper libraries.

**Without Vue Debounce Provider**

```html
<template>
  <input type="range" @input="rangeChanged" />
</template>

<script>
export default {
  methods: {
    // some slow operation here
    rangeChanged(e) {
      // UH OH! This gets called hundreds of times as the range slider is moved
    }
  }
}
</script>
```

Vue Debounce Provider uses a scoped slot to yield a `debounce` method. This
method can be bound to as many events as you want. Like any debounce, the
method restarts a timeout each time it is called. After the `:wait` time has
elapsed uninterrupted, the method bound to `@timeout` is called.

**With Vue Debounce Provider**

```html
<template>
  <vue-debounce-provider
    v-slot="{ debounce }"
    :wait="300"
    @timeout="rangeChanged"
  >
    <input type="range" @input="debounce" />
  </vue-debounce-provider>
</template>

<script>
import VueDebounceProvider from 'vue-debounce-provider'

export default {
  components: {
    VueDebounceProvider
  },

  methods: {
    // some slow operation here
    rangeChanged(e) {
      // COOL! This only gets called once
    }
  }
}
</script>
```

Any event arguments received by `debounce` are passed to `@timeout` when it
is called.

### Styling

By default, the `<vue-debounce-provider>` component behaves like a `<div>`
meaning it displays as a block and will affect layout. However, this can be
adjusted with classes and styles.

```html
<vue-debounce-provider class="d-inline-block">
  ...
</vue-debounce-provider>
```
