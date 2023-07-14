<template lang="pug">
.dropdown(:class="{'open': isOpenDropdown}") 
    .dropdown__preview 
        img(src="/images/blur-ipad.png", alt="Decoration blur" width="100%" )
        img(:src="movie.bg_picture", alt="Backgroun Image" width="100%" height="100%")
        img(src="/images/svg/arrow-close.svg", alt="Close" width="100%" height="100%" @click="closeDropdown").dropdown__preview-close
        .dropdown__preview-info(:class="{'show-info': isOpenDropdown}")  
            .dropdown__preview-info--title
                h2 {{ movie.title }} 
                    span ({{ movie.release_year }})
            .dropdown__preview-info--button
                VButton(isDesktop=false)
    .dropdown__description(:class="{'show-info': isOpenDropdown}")  
        .dropdown__description-wrapper
            .dropdown__description-text 
                p {{ movie.description }} 
            .dropdown__description-generes 
                .dropdown__description-generes--genre
                    span(v-for="(genre,idx) in movie.genres" :key="idx") {{ genre.title }}
                        template(v-if="idx !== movie.genres.length - 1") , 
                img(src="/images/svg/line.svg", alt="Decoration line")
                span.hero__content-description--generes--rate {{ movie.mpa_rating }}
                img(src="/images/svg/line.svg", alt="Decoration line")
                span {{ formatDuration(movie.duration) }}
            .dropdown__description-people 
                .dropdown__description-people--wrapper 
                    p.dropdown__description-people--director Director: 
                        span(v-for="(director ,idx) in movie.directors" :key="idx") {{ director.first_name }} {{ director.last_name }}
                            template(v-if="movie.directors.length > 1 && idx !== movie.directors.length - 1") , 
                    p.dropdown__description-people--writers Writers: 
                        span(v-for="(writer ,idx) in movie.writers" :key="idx") {{ writer.first_name }} {{ writer.last_name }}
                            template(v-if="movie.writers.length > 1 && idx !== movie.writers.length - 1") , 
                    p.dropdown__description-people--stars Stars: 
                        span(v-for="(star ,idx) in movie.stars" :key="idx") {{ star.first_name }} {{ star.last_name }}
                            template(v-if="movie.stars.length > 1 && idx !== movie.stars.length - 1") , 
        .dropdown__description-rating
            p IBDb rating
            p {{ movie.imdb_rating }} 
                span /10
</template>

<script>
import { mapGetters } from 'vuex';
import VButton from './VButton.vue';
export default {
    computed: {
        ...mapGetters({
            movie: 'movies/getActiveMovie',
            isOpenDropdown: 'dropdown/getDropdown'
        }),
    },
    components: {
        VButton,
    },
    methods: {
        formatDuration(duration) {
            const hours = Math.floor(duration / 60);
            const minutes = duration % 60;

            return `${hours}h ${minutes}m`;
        },
        closeDropdown() { 
            this.$store.commit('dropdown/closeDropdown');
        }
    },
}
</script>

<style lang="scss" scoped>
.dropdown{ 
    height: 100vh;
    width: 0%;
    overflow: hidden;
    background-color: #161616;

    position: fixed;
    top: 0;
    left: 0;

    transition: all .3s;

    @media screen and (min-width: 1194px) {
        display: none;
    }
    @media (orientation: landscape) {
        display: none;
    }
    &__preview { 
        height: 785px;
        padding: 16px 24px; 

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        img { 
            &:nth-child(-n+2){ 
                position: absolute;
                left: 0;
                top: 0;
                height: 785px;
                object-fit: cover;
                z-index: 1;
            }
            &:first-child { 
                z-index: 2;
            }
        }
        &-close{ 
            position: relative;
            width: 15px;
            height: 27px;
            z-index: 3;
        }
        &-info { 
            position: relative;
            z-index: 3;

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;

            opacity: 0;
            transition: all .5s;


            &--title { 
                // max-width: 268px;
                // width: fit-content;
                h2 { 
                    font-family: Krona One;
                    font-size: 32px;
                    font-weight: 400;
                    line-height: normal;
                }
                span { 
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 140%;
                }
            }
        }
    }
    &__description { 
        padding: 16px 24px;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;


        opacity: 0;
        transition: all .5s;

        &-wrapper { 
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 517px;
        }
        &-text { 
            p { 
                font-size: 16px;
                font-weight: 400;
                line-height: 140%;
                width: 100%;
            }
        }
        &-generes { 
            display: flex;
            gap: 20px;

            span { 
                font-size: 16px;
                font-weight: 500;
                line-height: 140%;
            }
        }
        &-people { 
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
        &-rating { 
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
.open { 
    width: 100%;
    transition: all .3s;
}
.show-info { 
    opacity: 1;
    transition: all .5s;
}
</style>