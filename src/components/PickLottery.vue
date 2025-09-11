<script setup lang="ts">
import { computed } from 'vue';

interface linkgroup {
    checkprev:string;
    checknext:string;
    enterprev: string;
    enternext: string;
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
        checkprev: `/etc/lottery/check/powerball/${prev}`,
        checknext: `/etc/lottery/check/powerball/${next}`,
        enterprev: `/etc/lottery/enter/powerball/${prev}`,
        enternext: `/etc/lottery/enter/powerball/${next}`
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
        checkprev: `/etc/lottery/check/megamillions/${prev}`,
        checknext: `/etc/lottery/check/megamillions/${next}`,
        enterprev: `/etc/lottery/enter/megamillions/${prev}`,
        enternext: `/etc/lottery/enter/megamillions/${next}`
    }
})


function previousDrawingDate(target:number):string{
    let date = new Date();
    if (date.getDay() !== target) {
        date.setDate(date.getDate() - ( date.getDay() + (7 - target)) % 7 )
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
}
function nextDrawingDate(target:number):string{
    let date = new Date();
    if (date.getDay() !== target) {
        date.setDate(date.getDate() + (((target - date.getDay()) + 7) % 7) )
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
}
</script>
<template>
    <section>
        <h2>Powerball</h2>
    

<div class="links">
<RouterLink :to="{ path: powerballlinks.checkprev }" >Check</RouterLink>    
<RouterLink :to="{ path: powerballlinks.enterprev }">Enter</RouterLink>
</div>

<div class="links">
<RouterLink :to="{ path: powerballlinks.checknext }">Check</RouterLink>    
<RouterLink :to="{ path: powerballlinks.enternext }">Enter</RouterLink>
</div>
</section>
<section>
    <h2>Megamillions</h2>


<div class="links">
<RouterLink :to="{ path: megamillionslinks.checkprev }">Check</RouterLink>    
<RouterLink :to="{ path: megamillionslinks.enterprev }">Enter</RouterLink>
</div>

<div class="links">
<RouterLink :to="{ path: megamillionslinks.checknext }">Check</RouterLink>    
<RouterLink :to="{ path: megamillionslinks.enternext }">Enter</RouterLink>
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
