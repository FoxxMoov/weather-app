<template>
  <div class="border rounded w-11/12 md:w-7/12 m-auto shadow-lg bg-white mt-12">
    <div class="flex justify-start p-2 md:p-8">
      <div class="flex-col items-center w-full">
        <h1 class="text-3xl text-gray-800">
          {{ city.name }}, {{ city.country }}
        </h1>
        <p>{{ localtime }}</p>
        <p>{{ list[0].weather.description }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="icon" class="w-16 md:w-24 h-16 md:h-24" />
            <p class="pl-4 text-2xl md:text-4xl">{{ list[0].main.temp }}</p>
            <span class="mb-6">°C</span>
          </div>
          <div class="flex-col items-start md:w-4/12">
            <p class="text-xs md:text-lg text-gray-800">
              Ressentit : {{ list[0].main.feels_like }} °C
            </p>
            <p class="text-xs md:text-lg text-gray-800">
              Humidité : {{ list[0].humidity }} %
            </p>
            <p class="text-xs md:text-lg text-gray-800">
              Vent : {{ Math.ceil(list[0].wind.speed * 3.6) }} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-y-hidden overflow-x-scroll whitespace-no-wrap py-8 md:p-8 m-auto mx-2 md:flex md:justify-around"
    >
      <AppCards
        v-for="(card, i) in list"
        :key="i"
        :forecast="card"
        class="inline-block"
      />
    </div>
    <div class="w-full h-64">
      <AppMap :lattitude="city.coord.lat" :longitude="city.coord.lon" />
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
    city: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      require: true,
    },
  },

  components: {
    AppMap,
    AppCards,
  },

  created() {
    console.log(this.list);
  },

  computed: {
    icon() {
      return `http://openweathermap.org/img/wn/${this.list[0].weather[0].icon}@2x.png`;
    },

    localtime() {
      return dayjs()
        .tz(this.list.dt_txt)
        .format("dddd");
    },
  },
};
</script>
