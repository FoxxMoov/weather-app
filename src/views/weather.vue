<template>
  <div class="flex flex-col justify-center">
    <div class="flex-col items-center justify-center w-full">
      <div
        class="mx-auto w-full md:w-9/12 flex-col md:flex-row flex items-center"
      >
        <div
          class="w-9/12 xl:w-7/12 flex-col flex items-center justify-start mt-6"
        >
          <h1 class="text-gray-800 text-xl md:w-7/12">
            Cherchez une ville
          </h1>
          <div
            class="rounded-full h-10 text-base pl-4 w-10/12 md:w-7/12 flex items-center justify-between border"
          >
            <AppInput
              class="w-full"
              v-model="selected"
              type="text"
              placeholder="ex Paris"
            />
            <AppButton @click="weatherLauncher(cityName)">
              <Search class="w-6 mr-4 cursor-pointer text-blue-600" />
            </AppButton>
          </div>
        </div>
        <div class="text-base text-gray-light mt-6">
          OU
        </div>
        <div
          class="w-9/12 xl:w-7/12 flex-col flex items-center justify-start mt-6"
        >
          <h1 class="text-gray-800 text-xl md:w-7/12">
            Sélectionnez une ville
          </h1>
          <div
            class="rounded-full h-10 text-base pl-4 w-10/12 md:w-7/12 flex items-center justify-between border"
          >
            <select
              class="w-full mr-4 text-gray-800 bg-white"
              v-model="selected"
            >
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
      </div>
      <div v-if="error">
        {{ error.message }}
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="loading"
        key="loading"
        class="flex items-center justify-center h-full"
      >
        <AppLoader class="w-20 h-20 m-auto" />
      </div>
      <div
        v-else-if="resultActive"
        class="flex items-center justify-center mb-4"
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
import AppButton from "../components/AppButton";
import AppResult from "../components/AppResult";
import AppLoader from "../components/AppLoader";
import debounce from "lodash.debounce";
import { cities } from "../cities/cities.json";

export default {
  name: "weather",

  components: {
    Search,
    AppInput,
    AppButton,
    AppResult,
    AppLoader,
  },

  data() {
    return {
      cityName: "",
      selected: "",
      weather: {},
      resultActive: false,
      error: undefined,
      cities,
      loading: false,
    };
  },

  watch: {
    selected: {
      handler: debounce(async function() {
        this.loading = true;
        this.resultActive = false;
        this.error = undefined;
        await this.weatherLauncher(this.selected);
        this.loading = false;
      }, 1000),
    },
  },

  methods: {
    async weatherLauncher(name) {
      if (this.selected) {
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
