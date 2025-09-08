<script setup lang="ts">
import { computed } from 'vue';
import type { DRAWING, ATTEMPT } from '../types';
const props = defineProps<{
  drawing: DRAWING,
  attempt: ATTEMPT
}>();
const basematched = computed(() => {
    return props.attempt.base.map( num => {
        return {
            number: num,
            matched: props.drawing.base.includes(num)
        }
    })
})
</script>
<template>
    <div :class="drawing.name">
        <template v-for="number in basematched">
            <span :class="{'match': number.matched}" class="ball">{{ number.number }}</span>
        </template>
        <span :class="{'match': attempt.extra === drawing.extra}" class="ball extra">{{ attempt.extra }}</span>
    </div>
</template>
<style scoped lang="css">
.ball{
    --_size:1.5rem;
    --_color:canvasText;
    --_bg: canvas;
    --_border:canvasText;
    display: inline-block;
    width:var(--_size);
    height: var(--_size);
    line-height: var(--_size);
    padding: .5rem;
    text-align: center;
    border-radius: 100vw;
    border:2px solid var(--_color);
    background-color: var(--_bg);
    color:var(--_color)
}
.ball.match {
    outline: 2px solid blue;
}

.powerball .extra {
    --_bg:red;
    --_color:white;
}

.Megamillions .extra {
    --_bg:yellow;
}
div {
    display:flex;
    gap:.25rem;
    margin-block:.5rem;
    justify-content: center;
}

</style>