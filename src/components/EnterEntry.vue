<script setup lang="ts">
import { computed, ref } from 'vue'
import Result from './Result.vue';
import type { ATTEMPT } from '../types';
import { useRoute } from 'vue-router'

const route = useRoute()

const BASELENGTH = 5;

const EXTRALENGTH = 1;

const baseNumbers = ref<number[]>([]);
const extraNumber = ref<number[]>([]);

const submitted = ref<boolean>(false);

const isWinning = computed(() => {
    return route.query.drawing === 'true';
})


const highest = computed<number>(() => {
    return TYPE.value === 'powerball' ? 69 : 70
})

const extrahighest = computed<number>(() => {
    return TYPE.value === 'powerball' ? 26 : 24
})

const maxNumbers = computed(() => {
    return baseNumbers.value.length >= BASELENGTH;
})
const maxExtra = computed(() => {
    return extraNumber.value.length >= EXTRALENGTH;
})

const preview = computed<ATTEMPT>(() => {
    return {
        base:baseNumbers.value,
        extra:extraNumber.value[0]
    }
})

const TYPE = computed<string>(() => {
    return route.params.lottery.toString()
})

const DATE = computed<string>(() => {
    return route.params.date.toString()
})

const DR = {
    name: TYPE.value,
    date: "",
    base: [],
    extra: 0
}

const title = computed(() => {
    return isWinning ? 'Winning Numbers' : 'Your Entry'
})

const otherlinks = computed(() => {
    return {
        enter: `/etc/lottery/enter/${TYPE}/${DATE}`,
        check: `/etc/lottery/check/${TYPE}/${DATE}`
    }
})

function saveEntry() {
    const local = localStorage.getItem(DATE.value);
    let data;
    if (local) {
        data = JSON.parse(local)
        data.attempts.push({
            base: baseNumbers.value,
            extra: extraNumber.value[0]
        })
    } else {
        data = {
            name: TYPE.value,
            date: DATE.value,
            attempts: [
                {
                    base: baseNumbers.value,
                    extra: extraNumber.value[0]
                }
            ]
        }
    }
    localStorage.setItem(DATE.value, JSON.stringify(data))
    submitted.value = true;
}

function saveDrawing() {
    let data = {
        name: TYPE.value,
        date: DATE.value,
        attempts: [
            {
                base: baseNumbers.value,
                extra: extraNumber.value[0]
            }
        ]
    }
    localStorage.setItem(`drawing-${DATE.value}`, JSON.stringify(data))
    submitted.value = true;
}

function save() {
    if (isWinning) {
        saveDrawing();
    } else {
        saveEntry();
    }
}

function reset() {
    baseNumbers.value = [];
    extraNumber.value = [];
    submitted.value = false;
}
</script>
<template>
    <div class="layout" :class="TYPE">
        <h1 class="allcolumns">{{ TYPE }}</h1>
        <p class="allcolumns">{{ DATE }}</p>
        <div class="base grid">
            <label class="ball" v-for="n in highest">
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
            <label class="ball" v-for="n in extrahighest">
                {{ n }}
                <input
                    type="checkbox"
                    :id="'id-'+n"
                    :value="n"
                    :disabled="maxExtra && !extraNumber.includes(n)"
                    v-model="extraNumber" />
            </label>
        </div>
        <p class="allcolumns">{{ title }}</p>
        <Result :drawing="DR" :attempt="preview" class="allcolumns"/>
        <div class="allcolumns" style="text-align: center;">
            <template v-if="!submitted">
                <button @click="save()" :disabled="!maxNumbers || !maxExtra">submit</button>
            </template>
            <template v-if="submitted">
                <template v-if="!isWinning">
                    <button @click="reset()">enter another try</button>
                </template>
                <template v-if="isWinning">
                    <RouterLink :to="{ path: otherlinks.check }">check drawing</RouterLink>
                    <RouterLink :to="{ path: otherlinks.enter }">enter tries</RouterLink>        
                </template>
            </template>
        </div>
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
.allcolumns{
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
.powerball .extra .ball {
    background-color: red;
    color:white
}
.megamillions .extra .ball {
    background-color: yellow;
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