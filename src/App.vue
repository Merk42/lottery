<script setup lang="ts">
import CheckEntry from './components/CheckEntry.vue';
import EnterEntry from './components/EnterEntry.vue';
</script>

<template>
  <EnterEntry/>

  <CheckEntry/>

<!--
  <Result :entry="ENTRY1" :drawing="DRAWING"  />
  <Result :entry="ENTRY2" :drawing="DRAWING"  />
  <Result :entry="ENTRY3" :drawing="DRAWING"  />
  <Result :entry="ENTRY4" :drawing="DRAWING"  />
  <Result :entry="ENTRY5" :drawing="DRAWING"  />
  -->
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
