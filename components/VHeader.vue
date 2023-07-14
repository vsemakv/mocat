<template lang="pug">
header.header   
    p Popular 
        span serials
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.header { 
    padding: 13px 24px 12px 24px;

    @media screen and (min-width: 1194px){
        display: none;
    }
    @media (orientation: landscape) {
        display: none;
    }
    p { 
        font-size: 32px;
        font-weight: 700;
        line-height: normal;

        span { 
            color: #DA1617;
        }
    }
}
</style>