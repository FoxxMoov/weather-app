<template>
  <div class="flex-col items-center justify-center p-2 xl:w-20">
    <p>{{ localtime }}</p>
    <img :src="icon" class="w-12 h-12 m-auto" />
    <div class="flex items-center justify-between w-full">
      <p class="text-sm text-gray-600">
        {{ Math.ceil(dataWeather.max_temp) }}°
      </p>
      <p class="text-sm text-gray-500">
        {{ Math.ceil(dataWeather.min_temp) }}°
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  props: {
    dataWeather: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return require(`../assets/weather/${this.dataWeather.weather.icon}.png`);
    },

    localtime() {
      return dayjs(this.dataWeather.datetime).format("ddd");
    },
  },
};
</script>
