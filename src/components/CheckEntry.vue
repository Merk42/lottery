<script setup lang="ts">
import type { DRAWING, PLAYER_ENTRIES } from '../types';
import Result from './Result.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const USDate = computed(() => {
    return new Intl.DateTimeFormat("en-US").format( new Date(route.params.date?.toString() ?? ''))
})

const DATE = computed<string>(() => {
    return route.params.date?.toString() ?? ''
})

const t = computed<PLAYER_ENTRIES|null>(() => {
    const LOCAL = localStorage.getItem(DATE.value)
    if (LOCAL) {
        return JSON.parse(LOCAL)
    }
    return null
})

const CURRENT_DRAWING = computed<DRAWING|undefined>(() => {
    const STORAGE_STRING = `drawing-${DATE.value}`;
    const LOCAL_DATA = localStorage.getItem(STORAGE_STRING)
    if (!LOCAL_DATA) {
        return undefined
    }
    return JSON.parse(LOCAL_DATA);
})

const MANUAL_LINK = computed(() => {
    const LOTTERY = route.params.lottery;
    const DATE = route.params.date;
    return `/etc/lottery/enter/${LOTTERY}/${DATE}`
})
</script>
<template>
    <h1>{{ route.params.lottery }}</h1>
    <p>{{ USDate }}</p>
    <div v-if="!CURRENT_DRAWING">
        <p>No data for {{ USDate }}</p>
        <RouterLink :to="{ path: MANUAL_LINK, query:{'drawing':'true'} }">Enter Manually</RouterLink>
    </div>
    <div v-if="t && CURRENT_DRAWING">
        <template v-for="ENTRY in t.attempts">
            <Result :drawing="CURRENT_DRAWING" :attempt="ENTRY"/>
        </template>    
    </div>
    
</template>
