<template lang="pug">
  .page 
    VHeader
    VSerialsList
    VHeroVue
    VDropdown
</template>

<script>
import { mapGetters } from 'vuex';
import VHeroVue from '../components/VHero.vue';
import VHeader from '../components/VHeader.vue';
import VSlidersList from '../components/VSlider.vue';
import VDropdown from '../components/VDropdown.vue';
export default {
  asyncData({store}) { 
    return store.dispatch('movies/getMovies')
  },
  computed: {
    ...mapGetters({
      movies: 'movies/getMovies'
    }),
  },
  components: {
    VHeroVue,VHeader,VSlidersList,VDropdown
  },
}
</script>

<style lang="scss" scoped></style>
