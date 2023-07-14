<template lang="pug">
section.serials 
    .serials__list
        .serials__list-card(
            v-for="(slide,idx) of movies" :key="idx" 
            @click="chooseMovie(slide)" 
            :class="{ 'activeMovie': activeMovie.id  === slide.id }"
            ) 
            img(:src="slide.poster" width="100%" height="100%")
            p {{ slide.imdb_rating }} 
                span /10
            h2 {{ slide.title }}
    .serials__movie 
        .serials__movie-image
            img(src="/images/blur-ipad-landscape.png", alt="Decoration blur" width="100%" )
            img(:src="activeMovie.bg_picture", alt="Backgroun Image" width="100%" height="100%")
        .serials__movie-title
            h2 {{ activeMovie.title }}
                span ({{ activeMovie.release_year }})
            .serials__movie-title--button
                VButton(isDesktop=false)
        .serials__movie-description
            .serials__movie-description--wrapper
                .serials__movie-description--text 
                    p {{ activeMovie.description }} 
                .serials__movie-description--generes 
                    .serials__movie-description--generes--item
                        span(v-for="(genre,idx) in activeMovie.genres" :key="idx") {{ genre.title }}
                            template(v-if="idx !== activeMovie.genres.length - 1") , 
                    img(src="/images/svg/line.svg", alt="Decoration line")
                    span.hero__content-description--generes--rate {{ activeMovie.mpa_rating }}
                    img(src="/images/svg/line.svg", alt="Decoration line")
                    span {{ formatDuration(activeMovie.duration) }}
                .serials__movie-description--people 
                    .serials__movie-description--people--wrapper 
                        p.serials__movie-description--people--director Director: 
                            span(v-for="(director ,idx) in activeMovie.directors" :key="idx") {{ director.first_name }} {{ director.last_name }}
                                template(v-if="activeMovie.directors.length > 1 && idx !== activeMovie.directors.length - 1") , 
                        p.serials__movie-description--people--writers Writers: 
                            span(v-for="(writer ,idx) in activeMovie.writers" :key="idx") {{ writer.first_name }} {{ writer.last_name }}
                                template(v-if="activeMovie.writers.length > 1 && idx !== activeMovie.writers.length - 1") , 
                        p.serials__movie-description--people--stars Stars: 
                            span(v-for="(star ,idx) in activeMovie.stars" :key="idx") {{ star.first_name }} {{ star.last_name }}
                                template(v-if="activeMovie.stars.length > 1 && idx !== activeMovie.stars.length - 1") , 
            .serials__movie-description--rating
                p IBDb rating
                p {{ activeMovie.imdb_rating }} 
                    span /10
</template>

<script>
import { mapGetters } from 'vuex';
import VButton from './VButton.vue';
export default {
  computed: {
    ...mapGetters({
      movies: 'movies/getMovies',
      activeMovie: 'movies/getActiveMovie'
    }),
  },
  mounted () {
    // console.log(this.movies);
  },
  methods: {
    chooseMovie(movie){ 
        this.$store.commit('movies/chooseActiveMovie', movie);
        this.$store.commit('dropdown/openDropdown');
        // console.log(movie);

    },
    formatDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;

        return `${hours}h ${minutes}m`;
    },
  },
  components: {
    VButton,
  },
}
</script>

<style lang="scss" scoped>
.serials { 
    padding: 16px 24px;

    @media screen and (min-width: 1195px){
        display: none !important;
    }
    @media (orientation: landscape) {
        display: flex;
        padding-right: 0;
    }
    &__list { 
        display: grid;
        grid-template-columns: repeat(auto-fill, 188px);
        grid-gap: 11px;
        justify-content: space-between;

        @media (orientation: landscape) {
            width: 470px;
            grid-template-columns: repeat(auto-fill, 205px);
            max-height: 100vh;
            grid-gap: 12px;
            overflow-y: scroll;
            padding-right: 24px;
        }
        &-card { 
            width: 188px;
            height: 298px;
            margin-bottom: 24px;

            @media (orientation: landscape) {
                width: 205px;
            }
            img { 
                height: 215px;
                object-fit: cover;
            }
            p { 
                padding-left: 20px;
                margin-top: 14px;

                font-size: 16px;
                font-weight: 500;
                line-height: normal;

                position: relative;

                &::before { 
                    position: absolute;
                    content: "";
                    background: url("/images/svg/rating.svg");
                    background-size: cover;
                    background-repeat: no-repeat;
                    width: 16px;
                    height: 16px;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }

                span { 
                    font-size: 14px;
                    font-weight: 400;
                    line-height: normal;
                    color: #E2E2E2;
                }
            }
            h2 { 
                margin-top: 8px;
                
                font-size: 18px;
                font-weight: 500;
                line-height: normal;
            }
        }
    }
    &__movie { 
        padding-bottom: 38px;

        width: 724px;

        @media (orientation: portrait) {
            display: none;
        }
        &-image { 
            width: 724px;
            height: 382px;
            position: relative;

            img { 
                position: absolute;
                left: 0;
                top: 0;
                height: 382px;
                object-fit: cover;
                z-index: 1;

                &:first-child { 
                    z-index: 2;
                    height: 383px;
                }
            }
        }
        &-title { 
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 16px 24px;
        }
        &-description { 
            padding: 16px 24px;

            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            &--wrapper { 
                display: flex;
                flex-direction: column;
                gap: 24px;
                width: 517px;
            }
            &--generes { 
                display: flex;
                gap: 20px;

                span { 
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 140%;
                }
            }
            &--people { 
                display: flex;
                flex-direction: column;

                p { 
                    text-align: left;
                    margin-bottom: 8px;

                    font-size: 16px;
                    font-weight: 400;
                    line-height: 140%;
                    color: #E2E2E2;

                    span { 
                        font-weight: 500;
                    }
                }
            }
            &--rating { 
                display: flex;
                flex-direction: column;
                width: 103px;

                p { 
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 140%;

                    &:last-child { 
                        padding-left: 27px;
                        font-size: 28px;
                        position: relative;
                        line-height: normal;

                        &::before { 
                            position: absolute;
                            content: "";
                            background: url("/images/svg/rating.svg");
                            background-repeat: no-repeat;
                            background-size: cover;
                            width: 20px;
                            height: 20px;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
                span { 
                    color: #fff;
                    font-size: 16px;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>