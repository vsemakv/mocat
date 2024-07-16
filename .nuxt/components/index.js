export const VButton = () => import('../../components/VButton.vue' /* webpackChunkName: "components/v-button" */).then(c => wrapFunctional(c.default || c))
export const VDropdown = () => import('../../components/VDropdown.vue' /* webpackChunkName: "components/v-dropdown" */).then(c => wrapFunctional(c.default || c))
export const VHeader = () => import('../../components/VHeader.vue' /* webpackChunkName: "components/v-header" */).then(c => wrapFunctional(c.default || c))
export const VHero = () => import('../../components/VHero.vue' /* webpackChunkName: "components/v-hero" */).then(c => wrapFunctional(c.default || c))
export const VSerialsList = () => import('../../components/VSerialsList.vue' /* webpackChunkName: "components/v-serials-list" */).then(c => wrapFunctional(c.default || c))
export const VSlider = () => import('../../components/VSlider.vue' /* webpackChunkName: "components/v-slider" */).then(c => wrapFunctional(c.default || c))

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
