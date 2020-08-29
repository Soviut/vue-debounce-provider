import { shallowMount, mount } from '@vue/test-utils'
import Debounce from '../../src/component'

jest.useFakeTimers()

const mountComponent = propsData => shallowMount(Debounce, {
  propsData,
  scopedSlots: {
    default: '<p>ding</p>'
  }
})

describe('component', () => {
  it('should mount', () => {
    const wrapper = mountComponent({ propsData: {} })
    expect(wrapper.is(Debounce)).toBe(true)
  })
})
