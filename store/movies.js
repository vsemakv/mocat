import axios from "axios";

export const state = () => ({
    movies: [],
    hiddenMovies: [],
    currentMovies: [],
    activeMovie: {},
    currentIndex: 0,
    startSlice: 0,
    endSlice:6,
    lastEndSlice: null,
    lastStartSlice: null,
    btnMore: true
})

export const getters = {
    getMovies: state => {
        return state.movies
    }, 
    getCurrentMovies: state => {
        return state.currentMovies
    }, 
    getActiveMovie: state => {
        return state.activeMovie
    }, 
    getStartSlice: state => {
        return state.startSlice
    }, 
    getEndSlice: state => {
        return state.endSlice
    }, 
    getBtnMore: state => {
        return state.btnMore
    }, 
}

export const mutations = {
    setMovies(state, data) {
        state.movies = data;
    },
    setFirstMovie(state){
        state.activeMovie = state.movies[0]
    },
    chooseActiveMovie(state, data) {
        state.activeMovie = data;
        state.currentIndex = data.id - 1
    },
    showMoreMovies(state, data) {
        state.lastEndSlice = state.endSlice

        state.movies.slice(state.startSlice, state.endSlice)

        state.startSlice += 6
        state.endSlice += 6

        state.activeMovie = state.movies[state.startSlice]

        state.currentIndex = state.startSlice
        
        if(state.endSlice >  state.movies.length) { 
            state.btnMore = false
        }
    },
    setFirstMovies(state){
        state.currentMovies = state.movies.splice(0, 6)
    },
    setLastMovie(state, data){
        const lastMovie = state.movies.length
        console.log(lastMovie, state.currentIndex, data);
        if(state.currentIndex + 1 == lastMovie) { 
            state.startSlice = state.lastStartSlice
            state.endSlice = state.lastEndSlice
            state.btnMore = true
        }
    },
    nextMovie(state, data){
        if(state.currentIndex == 5) { 
            state.activeMovie = data[0]
            state.currentIndex = 0
        }else { 
            state.currentIndex = (state.currentIndex + 1) % data.length
            state.activeMovie = data[state.currentIndex]
        }
        
    },
    prevMovie(state, data){
        if(state.currentIndex <= 0) { 
            state.currentIndex = 5
            state.activeMovie = data[state.currentIndex]
        }else { 
            if(state.lastEndSlice + 1 > state.currentIndex) { 
                state.btnMore = true

                state.startSlice = state.lastStartSlice
                state.endSlice = state.lastEndSlice
            }
            if(state.currentIndex == 0) { 
                state.currentIndex = data.length - 1
                state.activeMovie = data[state.currentIndex]
            }else { 
                state.currentIndex = (state.currentIndex - 1) % data.length
                state.activeMovie = data[state.currentIndex]
            }
        }
        console.log("prev",state.currentIndex);
    },
}

export const actions = {
    async getMovies({ commit }) {
        return await this.$axios.get('https://live.mocat.amifactory.network/api/v1/movies/')
        .then(({data}) => {
            commit('setMovies', data.results)
        })
        .catch(error => {
            throw new Error(`${error}`)
        })
    },
    showMore({ commit, data }) {
        // console.log('action');
        commit('setMovies', data)
        commit('showMoreMovies', data);
    },

}


