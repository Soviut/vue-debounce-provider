# vue-debounce-provider

A template-based debounce component that uses scoped slots to allow any method
to be debounced or throttled without altering its code. It provides a
interface similar to [Lodash Debounce](https://lodash.com/docs/4.17.15#debounce)
so debounces can be cancelled or flushed as well as a scoped status variable
that makes toggling loading spinners a breeze.

## Features

- Tiny bundle size and no dependencies
- Template-based debouncing using a scoped slot
- Lodash Debounce-compatible props and interface
- Throttling with optional `max-wait` prop
- Support for leading and tailing evoking of `@timeout` event
- Cancelable (end the debounce early without evoking `@timeout` event)
- Flushable (end the debounce early, evoking `@timeout` event)
- Debouncing status variable makes toggling a loading spinner easy
- Nuxt plugin built-in

## Live Demo

**Coming soon...**

## Installation

Install with npm

```bash
npm install vue-debounce-provider
```

Install with Yarn

```bash
yarn install vue-debounce-provider
```

## Usage

Add the Vue plugin in your `main.js`

```js
import Vue from 'vue'
import VueDebounceProvider from 'vue-debounce-provider'

Vue.use(VueDebounceProvider)
```

In your template, wrap your event emitter in a `<debounce>` component. Copy the
handler method your event calls to the `@timeout` event on `<debounce>`. Then
replace the handler method on your event emitter with the scoped `debounce`
function yielded by the scoped slot.

```html
<template>
  <debounce
    v-slot="{ debounce }"
    :wait="300"
    @timeout="rangeChanged"
  >
    <input type="range" @input="debounce" />
  </debounce>
</template>

<script>
export default {
  methods: {
    rangeChanged(e) {
      // perform some slow operation here
    }
  }
}
</script>
```

Any event arguments received by the scoped `debounce` function are passed to
`@timeout` when it is called.

### Props

#### `wait`

Type: `Number`<br/>
Default: `0`

Number of milliseconds to wait between `debounce` being called and invoking the
`@timeout` method.

#### `max-wait`

Type: `Number`<br/>
Default: `null`

Number of milliseconds to wait, regardless of the debounce, before calling
`@timeout` method. This effectively acts as a throttle.

#### `leading`

Type: `Boolean`<br/>
Default: `false`

Invokes the `@timeout` method the first time `debounce` is called with no delay.

#### `trailing`

Type: `Boolean`<br/>
Default: `true`

Invokes the `@timeout` method after the last `debounce` is called and `:wait`
has elapsed.

### Styling

By default, the `<debounce>` component behaves like a `<div>`
meaning it displays as a block and will contribute to layout. However, this can
be easily adjusted with classes and styles.

```html
<debounce class="d-inline-block">
  ...
</debounce>
```
