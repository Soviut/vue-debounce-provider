import { shallowMount, mount } from '@vue/test-utils'
import Debounce from '../../src/component'

jest.useFakeTimers()

const mountComponent = (config => shallowMount(Debounce, {
  ...config,
  scopedSlots: {
    default: `
      <div>
        <button class="start" @click="props.debounce">Start</button>
        <button class="flush" @click="props.flush">Flush</button>
        <button class="cancel" @click="props.cancel">Cancel</button>
      </div>
    `
  }
}))

describe('@timeout', () => {
  describe('when :wait is 300', () => {
    it('should be evoked 300 ms after debounce is called', () => {
      const onTimeout = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 300 },
        listeners: { timeout: onTimeout }
      })

      expect.assertions(3)

      wrapper.find('button').trigger('click')
      expect(onTimeout).not.toHaveBeenCalled()

      // assert it has not been called midway
      jest.advanceTimersByTime(150)
      expect(onTimeout).not.toHaveBeenCalled()

      jest.advanceTimersByTime(150)
      expect(onTimeout).toHaveBeenCalled()
    })
  })
})
