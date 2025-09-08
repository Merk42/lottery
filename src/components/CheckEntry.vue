<script setup lang="ts">
import type { DRAWING, PLAYER_ENTRIES } from '../types';
import Result from './Result.vue';
import { ref, computed } from 'vue';


const CURRENT_DRAWING:DRAWING = {
    name: "Powerball",
    date: "2025-09-06",
    base: [11, 23, 44, 61, 62],
    extra: 17
};

const HOPES: PLAYER_ENTRIES = {
    name: "Powerball",
    date: "2025-09-06",
    attempts: [
        {
            base: [5, 19 ,27, 36, 68],
            extra: 9
        },
        {
            base: [2, 15 ,59, 61, 69],
            extra: 18
        },
        {
            base: [9, 34, 57, 63, 68],
            extra: 18
        },
        {
            base: [25, 41, 49, 56, 67],
            extra: 9
        },
        {
            base: [4, 13 , 32, 34, 54],
            extra: 12
        }
    ]
}
const USDate = computed(() => {
    return new Intl.DateTimeFormat("en-US").format( new Date(CURRENT_DRAWING.date))
})
</script>
<template>
    <h1>{{ CURRENT_DRAWING.name }}</h1>
    <p>{{ USDate }}</p>
    <template v-for="ENTRY in HOPES.attempts">
        <Result :drawing="CURRENT_DRAWING" :attempt="ENTRY"/>
    </template>
</template>