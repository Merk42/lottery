<script setup lang="ts">
import { computed, ref } from 'vue'
import Result from './Result.vue';
import type { ATTEMPT } from '../types';

const HIGHEST = 69; // 70 for mega millions
const BASELENGTH = 5;

const EXTRAHIGHEST = 26; // 24 for mega millions
const EXTRALENGTH = 1;

const baseNumbers = ref<number[]>([]);
const extraNumber = ref<number[]>([]);
const maxNumbers = computed(() => {
    return baseNumbers.value.length >= BASELENGTH;
})
const maxExtra = computed(() => {
    return extraNumber.value.length >= EXTRALENGTH;
})

const preview = computed<ATTEMPT>(() => {
    return {
        base:baseNumbers.value.sort(),
        extra:extraNumber.value[0]
    }
})

const DR = {
    name:'powerball',
    date: "2025-09-06",
    base: [],
    extra: 0
}
</script>
<template>
    <div class="layout">
<div class="base grid">
        <label class="ball" v-for="n in HIGHEST">
            {{ n }}
            <input
                type="checkbox"
                :id="'id-'+n"
                :value="n"
                :disabled="maxNumbers && !baseNumbers.includes(n)"
                v-model="baseNumbers" />
        </label>
    </div>
    <div class="extra grid">
        <label class="ball" v-for="n in EXTRAHIGHEST">
            {{ n }}
            <input
                type="checkbox"
                :id="'id-'+n"
                :value="n"
                :disabled="maxExtra && !extraNumber.includes(n)"
                v-model="extraNumber" />
        </label>
    </div>

    <Result :drawing="DR" :attempt="preview"/>
    </div>
    

</template>

<style scoped lang="css">
.layout {
    display: inline-grid;
    
    gap:.5rem;
}


.grid {
    --_across:10;
    display:inline-grid;
    grid-template-columns: repeat(var(--_across), minmax(0, 1fr));
    gap: .25rem;
}
.grid+.grid+div{
    grid-column: -1 / 1;
}
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
.ball:not(:has(:disabled)) {
    cursor: pointer;
}
.ball:has(:disabled) {
    border-color:gray;
    color:gray;
}
.extra .ball {
    background-color: red;
    color:white
}

.ball:has(:checked) {
    outline:2px solid blue
}
input[type="checkbox"] {
    clip-path: inset(100%); /* Hides the element by clipping it entirely */
}

@media screen and (width <= 640px) {
    .ball{
        --_size:1rem;
    }
}
@media screen and (width > 768px) {
    .extra.grid{
         --_across:5;
    }
    .layout{
        grid-template-columns: 2fr 1fr;
    }
}
</style>