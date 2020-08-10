<template>
  <iframe
    class="w-full h-64"
    frameborder="0"
    scrolling="yes"
    marginheight="0"
    marginwidth="0"
    :src="
      `https://www.google.com/maps/embed/v1/place?key=AIzaSyCojgQWwAeCIFNq95eePsAWEv0NJjNpCcQ&q=${lattitude},${longitude}`
    "
  >
  </iframe>
</template>

<script>
export default {
  props: {
    lattitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
};
</script>
