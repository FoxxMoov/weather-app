<template>
  <component :is="is" v-bind="$attrs" v-on="$listeners">
    <slot />
  </component>
</template>

<script>
export default {
  computed: {
    is() {
      return this.$attrs.to ? "router-link" : "button";
    },
  },
};
</script>
