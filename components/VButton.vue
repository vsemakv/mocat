<template lang="pug">
button.button(:class="{'ipad': !isDesktop}") 
    svg(xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 10 12" fill="none")
        path(d="M9.5 5.13398C10.1667 5.51888 10.1667 6.48113 9.5 6.86603L2 11.1962C1.33333 11.5811 0.5 11.0999 0.5 10.3301L0.500001 1.66987C0.500001 0.900072 1.33333 0.418947 2 0.803847L9.5 5.13398Z" fill="white") 
    | Watch trailer
</template>

<script>
    export default {
        props: {
            isDesktop: {
                type: Boolean,
                default: null
            },
        },
    }
</script>

<style lang="scss" scoped>
.button { 
    display: flex;
    padding: 13px 28px 12px 14px;
    align-items: flex-start;
    gap: 14px;

    color: #fff;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;

    border-radius: 2px;
    background: #DA1617;
    box-shadow: 2px 2px 4px 0px rgba(61, 61, 61, 0.05);
    cursor: pointer;
    transition: all .3s;

    &:hover { 
        transition: all .3s;
        background: #f02020;
    }
}
.ipad {
    padding: 16px 38px 15px 24px;
}
</style>