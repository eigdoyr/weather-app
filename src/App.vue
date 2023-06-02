<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-Soro bg-weather-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<style lang="scss"></style>
