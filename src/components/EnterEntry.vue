<script setup lang="ts">
import { computed, ref } from 'vue'

const HIGHEST = 69;
const BASELENGTH = 5;

const EXTRAHIGHEST = 26;
const EXTRALENGTH = 1;

const baseNumbers = ref<number[]>([]);
const extraNumber = ref<number[]>([]);
const maxNumbers = computed(() => {
    return baseNumbers.value.length >= BASELENGTH;
})
const maxExtra = computed(() => {
    return extraNumber.value.length >= EXTRALENGTH;
})
</script>
<template>
    <div class="base-grid">
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
    <hr></hr>
    <div>
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
        <pre>{{ baseNumbers }}</pre>

</template>

<style scoped lang="css">
div {
    display:grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: .25rem;
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
    border-color:gray
}
.ball:has(:checked) {
    border-color:red;
}
input[type="checkbox"] {
    clip-path: inset(100%); /* Hides the element by clipping it entirely */
}
</style>