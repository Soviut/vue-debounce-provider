[![npm version](https://badgen.net/npm/v/vue-debounce-provider?color=green)](https://www.npmjs.com/package/vue-debounce-provider)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0123ecbaca724d6d9be29a24f7264acb)](https://www.codacy.com/manual/Soviut/vue-debounce-provider)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/vue-debounce-provider?color=green)](https://bundlephobia.com/result?p=vue-debounce-provider)
[![License](https://badgen.net/github/license/Soviut/vue-debounce-provider?color=green)](https://github.com/Soviut/vue-debounce-provider/blob/master/LICENSE)

# Vue Debounce Provider

A template-based debounce component that uses scoped slots to allow any method
to be debounced or throttled without altering its code. It provides a
interface similar to [Lodash Debounce](https://lodash.com/docs/4.17.15#debounce)
so debounces can be cancelled or flushed as well as a scoped status variable
that makes toggling inputs a breeze.

## Features

*   [Tiny bundle size](https://bundlephobia.com/result?p=vue-debounce-provider) with no dependencies
*   Template-based debouncing using a scoped slot
*   Props and interface similar to [Lodash Debounce](https://lodash.com/docs/4.17.15#debounce)
*   Throttling with optional `max-wait` prop
*   Support for leading and tailing evoking of `@timeout` event
*   Cancelable and flushable
*   Debouncing status variable to easily toggle inputs
*   Nuxt plugin built-in

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

In your template wrap your event emitter in the `<debounce>` component

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

All you have to do is move your handler to the `@timeout` event and put
the `debounce` function the scoped slot provides in its place.

Any event arguments received by the scoped `debounce` function are passed to
`@timeout` when it is called.

### Nuxt

Add the Nuxt plugin in your `nuxt.config.js`

```js
export default {
  modules: [
    'vue-debounce-provider'
  ]
}
```

### Styling

By default, the `<debounce>` component behaves like a `<div>`
meaning it displays as a block and will contribute to layout. However, this can
be easily adjusted with classes and styles.

```html
<debounce class="d-inline-block">
  ...
</debounce>
```

## API

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

### Events

#### `start`

Invoked once at leading edge of a debounce cycle. Will only be evoked again
once the current debounce cycle has fully completed.

#### `timeout`

Invoked at the trailing edge of the debounce cycle if `:trailing="true"`
(default).

Invoked at the leading edge of the debounce cycle if `:leading="true"`.

Invoked at the leading and trailing edge if both are `true`.

#### `cancel`

Invoked when the `cancel` scoped function is called.

`@timeout` will not be invoked when a debounce is cancelled.

#### `flush`

Invoked when the `flush` scoped function is called.

`@timeout` will also be invoked if `:trailing="true"`.

### Scoped Slot

Several optional scoped functions and variables are yielded inside the scoped
slot.

#### `debounce` scoped

Type: `Function`

Calling will start a new debounce cycle is one is not already started and will
reset the timer on an existing cycle.

All arguments passed to this function will be forwarded to method on the
`@timeout` handler. This means your handler will have access to `$event`.

#### `cancel` scoped

Type: `Function`

Calling this will immediately stop the current debounce cycle without evoking
the `@timeout` handler.

The `@cancel` handler will be evoked.

#### `flush` scoped

Type: `Function`

Calling this will immediately stop the current debounce cycle but will evoke
`@timeout` if `:trailing="true"`.

The `@flush` handler will also be evoked.

#### `debouncing` scoped

Type: `Boolean`

Indicates whether a debounce cycle is currently running. This is very useful
for toggling loading spinners or disabling buttons while the debounce cycle
is active.

#### `wait` scoped

Type: `Number`

The number of milliseconds set in the `:wait` prop. Useful for being able to
display the number even with hard coded props.

#### `max-wait` scoped

Type: `Number`

The number of milliseconds set in the `:max-wait` prop.
