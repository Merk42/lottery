<script setup lang="ts">
import { computed } from 'vue';

interface linkgroup {
    checkprev:string;
    checknext:string;
    enterprev: string;
    enternext: string;
    prevdate: string;
    nextdate: string;
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
        enternext: `/etc/lottery/enter/powerball/${next}`,
        prevdate: USDate(prev),
        nextdate: USDate(next)
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
        enternext: `/etc/lottery/enter/megamillions/${next}`,
        prevdate: USDate(prev),
        nextdate: USDate(next)
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

function USDate(date:string) {
    const TIME = `${date}T00:00:00`;
    return new Intl.DateTimeFormat("en-US").format( new Date(TIME))
}
</script>
<template>
    <section>
        <img src="/powerball.png"/>
        <div class="links">
            <h2>Previous Drawing: {{ powerballlinks.prevdate }}</h2>
            <RouterLink :to="{ path: powerballlinks.checkprev }">Check</RouterLink>    
            <RouterLink :to="{ path: powerballlinks.enterprev }">Enter</RouterLink>
            <h2>Upcoming Drawing: {{ powerballlinks.nextdate }}</h2>
            <RouterLink :to="{ path: powerballlinks.checknext }">Check</RouterLink>    
            <RouterLink :to="{ path: powerballlinks.enternext }">Enter</RouterLink>
        </div>
    </section>
    <section>
        <img src="/megamillions.png"/>
        <div class="links">
            <h2>Previous Drawing: {{ megamillionslinks.prevdate }}</h2>
            <RouterLink :to="{ path: megamillionslinks.checkprev }">Check</RouterLink>    
            <RouterLink :to="{ path: megamillionslinks.enterprev }">Enter</RouterLink>
            <h2>Upcoming Drawing: {{ megamillionslinks.nextdate }}</h2>
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
    margin-top:1rem;
}
.links h2 {
    grid-column: -1 / 1;
    margin: 0;
}
a {
    display: inline-block;
    border: .25rem solid canvasText;
    padding: .5rem 1rem;
    border-radius: 1rem;
    text-decoration: none;
    color: canvasText;
    font-weight: bold;
}
img{
    display:block;
    max-width: 250px;
    margin-inline:auto;
}
section {
    margin-bottom:2rem;
}
</style>
