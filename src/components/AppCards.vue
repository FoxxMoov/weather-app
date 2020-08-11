<template>
  <div class="flex-col items-center justify-center p-2 xl:w-20">
    <p>{{ localtime }}h</p>
    <img :src="icon" class="w-12 h-12 m-auto" />
    <div class="flex items-center justify-between w-full">
      <p class="text-sm text-gray-600">
        {{ Math.ceil(forecast.main.temp_max) }}°
      </p>
      <p class="text-sm text-gray-500">
        {{ Math.ceil(forecast.main.temp_min) }}°
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
    forecast: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return `http://openweathermap.org/img/wn/${this.forecast.weather[0].icon}@2x.png`;
    },

    localtime() {
      return dayjs(this.forecast.dt_txt).format("ddd HH");
    },
  },
};
</script>
