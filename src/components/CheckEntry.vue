<script setup lang="ts">
import type { DRAWING, PLAYER_ENTRIES } from '../types';
import Result from './Result.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const CURRENT_DRAWING:DRAWING = {
    name: "powerball",
    date: "2025-09-06",
    base: [11, 23, 44, 61, 62],
    extra: 17
};

const USDate = computed(() => {
    return new Intl.DateTimeFormat("en-US").format( new Date(CURRENT_DRAWING.date))
})

const DATE = computed<string>(() => {
    return route.query.date?.toString() ?? ''
})

const t = computed<PLAYER_ENTRIES|null>(() => {
    const LOCAL = localStorage.getItem(DATE.value)
    if (LOCAL) {
        return JSON.parse(LOCAL)
    }
    return null
})
</script>
<template>
    <h1>{{ CURRENT_DRAWING.name }}</h1>
    <p>{{ USDate }}</p>
    <div v-if="t">
        <template v-for="ENTRY in t.attempts">
            <Result :drawing="CURRENT_DRAWING" :attempt="ENTRY"/>
        </template>    
    </div>
    
</template>