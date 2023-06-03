<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p class="text-white p-4 text-center">Loading 😴💤</p>
      </template>
    </Suspense>
  </div>
</template>
