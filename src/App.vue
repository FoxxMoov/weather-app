<template>
  <div id="app" class="flex flex-col h-screen">
    <Weather />
  </div>
</template>

<script>
import Weather from "@/views/weather";

export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style></style>
