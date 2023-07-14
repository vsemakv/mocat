export { default as VButton } from '../../components/VButton.vue'
export { default as VDropdown } from '../../components/VDropdown.vue'
export { default as VHeader } from '../../components/VHeader.vue'
export { default as VHero } from '../../components/VHero.vue'
export { default as VSerialsList } from '../../components/VSerialsList.vue'
export { default as VSlider } from '../../components/VSlider.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
