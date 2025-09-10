<script setup lang="ts">
import { computed } from 'vue';

interface linkgroup {
    prev:string;
    next:string;
    check: string;
    enter: string;
}

const powerballlinks = computed<linkgroup>(() => {
    let prev = "";
    let next = "";
    const TODAY_DOW = new Date().getDay();
    switch (TODAY_DOW) {
        case 0:
        case 1:
            next = nextDrawingDate(1);
            prev = previousDrawingDate(6);
            break;
        case 2:
        case 3:
            next = nextDrawingDate(3);
            prev = previousDrawingDate(1);
            break;
        case 4:
        case 5:    
        case 6:
            next = nextDrawingDate(6);
            prev = previousDrawingDate(3);
            break;            
    }
    return {
        prev: prev,
        next: next,
        check: "/etc/lottery/powerball/check",
        enter: "/etc/lottery/powerball/enter"
    }
})

const megamillionslinks = computed<linkgroup>(() => {
    let prev = "";
    let next = "";
    const TODAY_DOW = new Date().getDay();
    switch (TODAY_DOW) {
        case 0:
        case 1:
        case 2:
        case 6:
            next = nextDrawingDate(2);
            prev = previousDrawingDate(5);
            break;
        case 3:
        case 4:
        case 5:
            next = nextDrawingDate(5);
            prev = previousDrawingDate(2);
            break;
    }

    return {
        prev: prev,
        next: next,
        check: "/etc/lottery/megamillions/check",
        enter: "/etc/lottery/megamillions/enter"
    }
})


function previousDrawingDate(target:number):string{
    let date = new Date();
    if (date.getDay() !== target) {
        date.setDate(date.getDate() - ( date.getDay() == target ? 7 : (date.getDay() + (7 - target)) % 7 ))
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
}
function nextDrawingDate(target:number):string{
    let date = new Date();
    if (date.getDay() !== target) {
        date.setDate(date.getDate() + ( date.getDay() == target ? 7 : (date.getDay() + (7 - target)) % 7 ))
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
}
</script>
<template>
    <section>
        <h2>Powerball</h2>
    
<pre>{{ powerballlinks.prev }}</pre>
<div class="links">
<RouterLink :to="{ path: powerballlinks.check, query: {'date': powerballlinks.prev}}" >Check</RouterLink>    
<RouterLink :to="{ path: powerballlinks.enter, query: {'date': powerballlinks.prev}}">Enter</RouterLink>
</div>
<pre>{{ powerballlinks.next }}</pre>
<div class="links">
<RouterLink :to="{ path: powerballlinks.check, query: {'date': powerballlinks.next}}">Check</RouterLink>    
<RouterLink :to="{ path: powerballlinks.enter, query: {'date': powerballlinks.next}}">Enter</RouterLink>
</div>
</section>
<section>
    <h2>Megamillions</h2>

<pre>{{ megamillionslinks.prev}}</pre>
<div class="links">
<RouterLink :to="{ path: megamillionslinks.check, query: {'date': megamillionslinks.prev}}">Check</RouterLink>    
<RouterLink :to="{ path: megamillionslinks.enter, query: {'date': megamillionslinks.prev}}">Enter</RouterLink>
</div>
<pre>{{ megamillionslinks.next }}</pre>
<div class="links">
<RouterLink :to="{ path: megamillionslinks.check, query: {'date': megamillionslinks.next}}">Check</RouterLink>    
<RouterLink :to="{ path: megamillionslinks.enter, query: {'date': megamillionslinks.next}}">Enter</RouterLink>
</div>
</section>
</template>

<style scoped>
.links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:1rem;
    margin-inline: auto;
    max-width: 600px;
}
a {
    display: inline-block;
    border: 1px solid black;
}
</style>
