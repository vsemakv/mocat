<template lang="pug">
.slider     
    .slider__wrapper
        .slider__wrapper-card(
            v-for="(slide,idx) of moviesList.slice(startSlice, endSlice)" :key="idx" 
            @click="chooseMovie(slide)" 
            :class="{ 'activeMovie': activeMovie.id  === slide.id }"
            ) 
            img(:src="slide.poster" width="130px" height="195px")
            p {{ slide.imdb_rating }} 
                span /10
            h2 {{ slide.title }}
        .slider__wrapper-card.view(@click="showMore(moviesList)" v-if="btnMore") 
            img(src="/images/svg/view.svg", alt="View more" width="24" height="24")
            p View more
        .slider__wrapper-button(@click="nextMovie(moviesList, activeMovie.id)")
        .slider__wrapper-button(@click="prevMovie(moviesList)")
</template>

<script>
import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                moviesList: 'movies/getMovies',
                activeMovie: 'movies/getActiveMovie',
                startSlice: 'movies/getStartSlice',
                endSlice: 'movies/getEndSlice',
                btnMore: 'movies/getBtnMore',
            }),
        },
        mounted () {
        },
        methods: {
            showMore(moviesList) {
                this.$store.commit('movies/showMoreMovies', moviesList);
                this.$store.commit('movies/setMovies', moviesList);

            },
            chooseMovie(movie){ 
                this.$store.commit('movies/chooseActiveMovie', movie);
            },
            prevMovie(idx){
                this.$store.commit('movies/prevMovie', idx); 
            },
            nextMovie(idx, movie){
                this.$store.commit('movies/setLastMovie', movie); 
                this.$store.commit('movies/nextMovie', idx, movie); 
            }
        },
    }
</script>

<style lang="scss" scoped>
.slider { 
    margin-top: 32px;
    position: relative;
    z-index: 3;

    &__wrapper { 
        justify-content: center;
        align-items: center;
        max-height: 286px;
        display: flex;
        gap: 16px;

        position: relative;
        height: 290px;
        &-card { 
            width: 130px;
            height: 260px;
            cursor: pointer;
            padding-top: 11px;
            
            @media screen and (min-width: 1512px) {
                width: 155px;
            }
            img { 
                transition: all 0.3s;
                object-fit: cover;
                @media screen and (min-width: 1512px) {
                    width: 155px;
                    object-fit: cover;
                }
            }
            p { 

                &:not(:last-child){
                    padding-left: 20px;
                    margin-top: 6px;
                    position: relative;

                    font-size: 14px;
                    font-weight: 500;
                    line-height: normal;

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
                }
                
                span { 
                    font-size: 12px;
                    font-weight: 400;
                    line-height: normal;
                    color: #E2E2E2;
                }
            }
            h2 { 
                margin-top: 4px;
                font-size: 16px;
                font-weight: 500;
                line-height: normal;
            }
        }
        &-button { 
            position: absolute;

            width: 34px;
            height: 34px;
            right: 0;

            cursor: pointer;

            background-color: rgba(255, 255, 255, 0.10);
            backdrop-filter: blur(47px);
            border-radius: 50%;
            background-image: url("/images/svg/arrow.svg");
            background-size: 20px 20px;
            background-repeat: no-repeat;
            background-position: center;

            &:last-child { 
                left: 0;
                transform: rotate(180deg);
            }
        }
    }
}

.view { 
    height: 235px;
    margin-top: 25px;
    margin-right: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    
    img { 
        @media screen and (min-width: 1512px) {
            width: 24px;
        }
    }
}
.activeMovie { 
    overflow: hidden;
    height: fit-content;
    @media screen and (min-width: 1512px) {
        width: 155px;
    }
    img { 
        object-fit: cover;
        height: 230px;
        transition: all 0.3s;
        @media screen and (min-width: 1512px) {
            width: 155px;
        }
    }
}
</style>