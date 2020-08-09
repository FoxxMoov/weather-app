<template>
  <iframe
    class="w-full h-64"
    frameborder="0"
    scrolling="yes"
    marginheight="0"
    marginwidth="0"
    :src="
      `https://maps.google.com/maps?q=${lattitude},${longitude}&hl=fr&z=14&amp;output=embed`
    "
  >
  </iframe>
</template>

<script>
export default {
  props: {
    lattitude: {
      type: String,
      required: false,
      default: "",
    },
    longitude: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>
