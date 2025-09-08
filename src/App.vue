<script setup lang="ts">
import EnterEntry from './components/EnterEntry.vue';
import Result from './components/Result.vue';
const DRAWING = [11, 23, 44, 61, 62];
const ENTRY1 = [5, 19 ,27, 36, 68];
const ENTRY2 = [2, 15 ,59, 61, 69];
const ENTRY3 = [9, 34, 57, 63, 68];
const ENTRY4 = [25, 41, 49, 56, 67];
const ENTRY5 = [4, 13 , 32, 34, 54];
</script>

<template>
  <EnterEntry/>


  <Result :entry="ENTRY1" :drawing="DRAWING"  />
  <Result :entry="ENTRY2" :drawing="DRAWING"  />
  <Result :entry="ENTRY3" :drawing="DRAWING"  />
  <Result :entry="ENTRY4" :drawing="DRAWING"  />
  <Result :entry="ENTRY5" :drawing="DRAWING"  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
