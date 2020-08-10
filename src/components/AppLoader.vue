<template>
  <div class="mx-auto mt-32">
    <div class="h-12 w-12 flex items-center justify-center">
      <div class="loader w-full h-full bg-white" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.loader {
  position: relative;
}

.loader:before,
.loader:after {
  content: "";
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-color: #434343;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: loader 2s infinite ease-in-out;
}

.loader:after {
  animation-delay: -1s;
}

@keyframes loader {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
