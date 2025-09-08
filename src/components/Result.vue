<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  entry: number[],
  drawing: number[]
}>();
const display = computed(() => {
    return props.entry.map( num => {
        return {
            number: num,
            matched: props.drawing.includes(num)
        }
    })
})
</script>
<template>
    <div>
    <template v-for="number in display">
        <span :class="{'match': number.matched}" class="ball">{{ number.number }}</span>
    </template>
    </div>
</template>
<style scoped lang="css">
.ball{
    --_size:1.5rem;
    display: inline-block;
    width:var(--_size);
    height: var(--_size);
    line-height: var(--_size);
    padding: .5rem;
    text-align: center;
    border-radius: 100vw;
    border:2px solid canvasText;
}
.ball.match {
    border-color:red;
}
div {
    display:flex;
    gap:.25rem;
    margin-block:.5rem;
}
</style>