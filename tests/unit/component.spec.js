import { shallowMount, mount } from '@vue/test-utils'
import Debounce from '../../src/component'

jest.useFakeTimers()

const mountComponent = propsData => shallowMount(Debounce, {
  propsData,
  scopedSlots: {
    default: '<p>ding</p>'
  }
})

describe.skip('component', () => {
  it('should mount', () => {
    const wrapper = mountComponent({ propsData: {} })
    expect(wrapper.is(Debounce)).toBe(true)
  })
})

describe('@timeout', () => {
  it('should be evoked after debounce is called', () => {
    const onTimeout = jest.fn()

    const wrapper = shallowMount(Debounce, {
      propsData: {
        wait: 300
      },
      listeners: {
        timeout: onTimeout
      },
      scopedSlots: {
        default: '<button @click="props.debounce">Start</button>'
      }
    })

    expect.assertions(3)

    wrapper.find('button').trigger('click')

    expect(onTimeout).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)

    expect(onTimeout).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(onTimeout).toHaveBeenCalled()
  })
})
