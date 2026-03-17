import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders application shell', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.find('.app').exists()).toBe(true)
    expect(wrapper.find('main.main').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AsideMenu' }).exists()).toBe(true)
  })
})
