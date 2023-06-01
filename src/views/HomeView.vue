<template>
  <main class="font-['Sora'] text-sm container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        @input="getSearchResults"
        type="text"
        v-model="searchQuery"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-white focus:outline-none"
      />
      <ul
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py2 px-1 top-[66px]"
      >
        <p v-if="searchError">
          Uh-oh 😴 Something went wrong, please try again
        </p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          Uh oh! 🙈 No results found, try a different term
        </p>
        <template v-else>
          <li
            @click="previewCity(searchResult)"
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

//Lazy search
const getSearchResults = () => {
  clearTimeout(queryTimeout.value); // clear default timeout when user enter a letter to search bar and when user stop typing this won't run again then reach out to lazy location api
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
        // console.log(mapboxSearchResults.value);
      } catch {
        searchError.value = true;
      }
      return;
    }
    // This never gets executed if search is true
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<style lang="scss" scoped></style>
