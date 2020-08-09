<template>
  <input
    v-bind="$attrs"
    class="font-medium text-black outline-none"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    underline: {
      type: Boolean,
      required: false,
      default: false,
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
