<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="icon"></use>
    </svg>
</template>
<script>
export default {
    props:['ico'],
    computed:{
        icon(){
            return `#${this.ico}`;
        }
    }
}
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>