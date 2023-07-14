export const state = () => ({
    isOpen: false
})

export const getters = {
    getDropdown(state){
        return state.isOpen
    }
}

export const mutations = {
    openDropdown(state){
        state.isOpen = true;
    },
    closeDropdown(state){
        state.isOpen = false;
    }
}

