<script setup lang="ts">
import { computed } from 'vue';

interface linkgroup {
    prev:string;
    next:string;
    check: string;
    enter: string;
}

const powerballlinks = computed<linkgroup>(() => {
    const TODAY_DOW = new Date().getDay();
    const TODAY_DATE = new Date().getDate();

    console.log("TODAY", TODAY_DOW, TODAY_DATE)
    return {
        prev: "2025-09-06",
        next: "2025-09-10",
        check: "/etc/lottery/powerball/check",
        enter: "/etc/lottery/powerball/enter"
    }
})

const megamillionslinks = computed<linkgroup>(() => {
    const TODAY_DOW = new Date().getDay();
    const TODAY_DATE = new Date().getDate();

    console.log("TODAY", TODAY_DOW, TODAY_DATE)
    return {
        prev: "2025-09-06",
        next: "2025-09-10",
        check: "/etc/lottery/megamillions/check",
        enter: "/etc/lottery/megamillions/enter"
    }
})

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