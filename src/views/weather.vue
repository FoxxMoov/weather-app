<template>
  <div class="h-screen flex-col items-center justify-center">
    <div class="flex-col items-center justify-center w-full">
      <div
        class="mx-auto w-9/12 xl:w-7/12 flex-col flex items-center justify-start"
      >
        <h1 class="text-gray-800 text-xl md:w-7/12">
          Cherchez une ville
        </h1>
        <div
          class="rounded-full h-10 text-base pl-4 w-10/12 md:w-7/12 flex items-center justify-between border"
        >
          <AppInput
            class="w-full"
            v-model="cityName"
            type="text"
            placeholder="ex Paris"
          />
          <Search
            class="w-6 mr-4 cursor-pointer text-blue-600"
            @click="weatherLauncher()"
          />
        </div>
      </div>
      <div
        class="mx-auto w-9/12 xl:w-7/12 flex-col flex items-center justify-start mt-6"
      >
        <h1 class="text-gray-800 text-xl md:w-7/12">
          Sélectionnez une ville
        </h1>
        <div
          class="rounded-full h-10 text-base pl-4 w-10/12 md:w-7/12 flex items-center justify-between border"
        >
          <select class="w-full mr-4 text-gray-800 bg-white" v-model="selected">
            <option
              v-for="(citie, i) in cities"
              :key="i"
              v-bind:value="citie.name"
            >
              {{ citie.name }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="error">
        {{ error.message }}
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="resultActive"
        class="flex items-center justify-center w-full mb-4"
      >
        <AppResult v-bind="weather" />
      </div>
    </transition>
  </div>
</template>

<script>
import Search from "../components/svg/search";
import { weatherData } from "../script/weather";
import AppInput from "../components/AppInput";
import AppResult from "../components/AppResult";
import debounce from "lodash.debounce";
import { cities } from "../cities/cities.json";

export default {
  name: "weather",

  components: {
    Search,
    AppInput,
    AppResult,
  },

  data() {
    return {
      cityName: "",
      weather: [],
      resultActive: false,
      error: undefined,
      cities,
      selected: "",
    };
  },

  watch: {
    cityName: {
      handler: debounce(async function() {
        this.resultActive = false;
        this.error = undefined;
        await this.weatherLauncher(this.cityName);
      }, 500),
    },

    selected: {
      handler: debounce(async function() {
        this.resultActive = false;
        this.error = undefined;
        await this.weatherLauncher(this.selected);
      }, 500),
    },
  },

  methods: {
    async weatherLauncher(name) {
      const response = await weatherData(name);
      if (response != undefined) {
        this.weather = response;
        this.resultActive = true;
      }
      if (response?.error) {
        this.error = {
          message: "Cette ville n'héxiste pas",
        };
      }
    },
  },
};
</script>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
