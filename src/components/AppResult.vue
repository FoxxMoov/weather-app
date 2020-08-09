<template>
  <div
    class="border rounded w-11/12 md:w-9/12 xl:w-7/12 m-auto shadow-lg bg-white mt-16"
  >
    <div class="flex justify-start p-2 md:p-8">
      <div class="flex-col items-center w-full">
        <h1 class="text-3xl text-gray-800">{{ city_name }}</h1>
        <p>{{ localtime }}</p>
        <p>{{ data[0].weather.description }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="icon" class="w-16 md:w-24 h-16 md:h-24" />
            <p class="pl-4 text-2xl md:text-4xl">{{ data[0].temp }}</p>
            <span class="mb-6">°C</span>
          </div>
          <div class="flex-col items-start md:w-4/12">
            <p class="text-xs md:text-lg text-gray-800">
              Precipitation : {{ data[0].pop }} %
            </p>
            <p class="text-xs md:text-lg text-gray-800">
              Humidité : {{ data[0].rh }} %
            </p>
            <p class="text-xs md:text-lg text-gray-800">
              Vent : {{ data[0].wind_spd }} m/S
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-y-hidden overflow-x-scroll whitespace-no-wrap py-8 md:p-8 m-auto mx-2 md:flex md:justify-around"
    >
      <AppCards
        v-for="(card, i) in data"
        :key="i"
        :data-weather="card"
        class="inline-block"
      />
    </div>
    <div class="w-full h-64">
      <AppMap :lattitude="lat" :longitude="lon" />
    </div>
  </div>
</template>

<script>
import AppMap from "../components/AppMap";
import AppCards from "../components/AppCards";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    city_name: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
  },

  components: {
    AppMap,
    AppCards,
  },

  computed: {
    icon() {
      return require(`../assets/weather/${this.data[0].weather.icon}.png`);
    },

    localtime() {
      return dayjs()
        .tz(this.timezone)
        .format("dddd");
    },
  },
};
</script>
