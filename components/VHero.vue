<template lang="pug">
section.hero 
    img(src="/images/blur.png", alt="Blur for bg" width="100%" height="100%").hero__blur
    img(:src="movie.bg_picture", alt="Background Image" width="100%" height="100%").hero__bg
    .hero__content 
        .hero__content-description
            .hero__content-description--rating
                p IBDb rating
                p {{ movie.imdb_rating }} 
                    span /10
            .hero__content-description--title
                h2 {{ movie.title }} 
                    span ({{ movie.release_year }})
            .hero__content-description--text 
                p {{ movie.description }} 
            .hero__content-description--generes 
                .hero__content-description--generes--genre
                    span(v-for="(genre,idx) in movie.genres" :key="idx") {{ genre.title }}
                        template(v-if="idx !== movie.genres.length - 1") , 
                img(src="/images/svg/line.svg", alt="Decoration line")
                span.hero__content-description--generes--rate {{ movie.mpa_rating }}
                img(src="/images/svg/line.svg", alt="Decoration line")
                span {{ formatDuration(movie.duration) }}
            .hero__content-description--button 
                VButton(isDesktop=true)
        .hero__content-people 
            .hero__content-people--wrapper 
                p.hero__content-people--director Director: 
                    span(v-for="(director ,idx) in movie.directors" :key="idx") {{ director.first_name }} {{ director.last_name }}
                        template(v-if="movie.directors.length > 1 && idx !== movie.directors.length - 1") , 
                p.hero__content-people--writers Writers: 
                    span(v-for="(writer ,idx) in movie.writers" :key="idx") {{ writer.first_name }} {{ writer.last_name }}
                        template(v-if="movie.writers.length > 1 && idx !== movie.writers.length - 1") , 
                p.hero__content-people--stars Stars: 
                    span(v-for="(star ,idx) in movie.stars" :key="idx") {{ star.first_name }} {{ star.last_name }}
                        template(v-if="movie.stars.length > 1 && idx !== movie.stars.length - 1") , 
    VSliderVue
</template>

<script>
import { mapGetters } from 'vuex';
import VSliderVue from './VSlider.vue';
import VButton from './VButton.vue';
export default {
    computed: {
        ...mapGetters({
            movie: 'movies/getActiveMovie'
        }),
    },
    mounted () {
        this.$store.commit('movies/setFirstMovie');
    },
    components: {
        VSliderVue,VButton
    },
    methods: {
        formatDuration(duration) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;

            return `${hours}h ${minutes}m`;
        },
    },
}
</script>

<style lang="scss" scoped>
.hero { 
    position: relative;
    padding: 64px;
    height: 100%;

    @media screen and (max-width: 1194px) {
        display: none;
    }
    &__blur { 
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 101%;
        z-index: 1;
    }
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    &__content { 
        display: flex;

        padding-top: 90px;

        position: relative;
        z-index: 2;

        @media screen and (min-width: 1512px) {
            padding-top: 240px;
        }
        &-description { 
            display: inline-flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            gap: 20px;
            width: 50%;
            max-height: 292px;

            &--rating { 
                display: flex;

                flex-direction: column;
                p { 
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 140%;

                    &:last-child { 
                        margin-top: 2px;
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
            &--title {
                
                h2 { 
                    font-family: "Krona One", sans-serif;
                    font-size: 40px;
                    font-weight: 400;
                    line-height: normal;

                    max-width: 334px;
                }
                span { 
                    font-family: "Rubik", serif;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 140%;
                }
            }
            &--text { 
                p { 
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.4;
                }
            }
            &--generes{ 
                display: flex;
                gap: 20px;

                span { 
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 140%;
                }
            }
        }
        &-people { 
            width: 50%;
            padding-top: 126px;

            display: flex;
            flex-direction: column;
            align-items: flex-end;

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

            &--wrapper  {
                width: 320px;
            }
        }
    }
}
</style>