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

describe('@start', () => {
  describe('when not debouncing', () => {
    it('should be evoked immediately after debounce is called', () => {
      const onStart = jest.fn()

      const wrapper = mountComponent({
        listeners: { start: onStart }
      })

      wrapper.find('button.start').trigger('click')
      expect(onStart).toHaveBeenCalled()
    })
  })

  describe('when already debouncing', () => {
    it('should not evoke after debounce is called', () => {
      const onStart = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 300 },
        listeners: { start: onStart }
      })

      wrapper.find('button.start').trigger('click')
      expect(onStart).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(150)
      wrapper.find('button.start').trigger('click')
      expect(onStart).toHaveBeenCalledTimes(1)
    })
  })

  describe('when debouncing is complete', () => {
    it('should evoke immediately after debounce is called', () => {
      const onStart = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 300 },
        listeners: { start: onStart }
      })

      wrapper.find('button.start').trigger('click')
      expect(onStart).toHaveBeenCalledTimes(1)

      jest.advanceTimersByTime(300)
      wrapper.find('button.start').trigger('click')
      expect(onStart).toHaveBeenCalledTimes(2)
    })
  })
})

describe('@timeout', () => {
  describe('when :wait is default (0)', () => {
    it('should be evoked immediately after debounce is called', () => {
      const onTimeout = jest.fn()

      const wrapper = mountComponent({
        listeners: { timeout: onTimeout }
      })

      wrapper.find('button.start').trigger('click')
      expect(onTimeout).toHaveBeenCalled()
    })
  })

  describe('when :wait is 0', () => {
    it('should be evoked immediately after debounce is called', () => {
      const onTimeout = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 0 },
        listeners: { timeout: onTimeout }
      })

      wrapper.find('button.start').trigger('click')
      expect(onTimeout).toHaveBeenCalled()
    })
  })

  describe('when :wait is 300', () => {
    it('should be evoked 300 ms after debounce is called', () => {
      const onTimeout = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 300 },
        listeners: { timeout: onTimeout }
      })

      wrapper.find('button.start').trigger('click')
      expect(onTimeout).not.toHaveBeenCalled()

      // assert it has not been called midway
      jest.advanceTimersByTime(150)
      expect(onTimeout).not.toHaveBeenCalled()

      jest.advanceTimersByTime(150)
      expect(onTimeout).toHaveBeenCalled()
    })

    it('should be evoked 500 ms after debounce is called twice', () => {
      const onTimeout = jest.fn()

      const wrapper = mountComponent({
        propsData: { wait: 300 },
        listeners: { timeout: onTimeout }
      })

      wrapper.find('button.start').trigger('click')
      expect(onTimeout).not.toHaveBeenCalled()

      jest.advanceTimersByTime(200)
      wrapper.find('button.start').trigger('click')
      expect(onTimeout).not.toHaveBeenCalled()

      jest.advanceTimersByTime(300)
      expect(onTimeout).toHaveBeenCalled()
    })
  })
})
