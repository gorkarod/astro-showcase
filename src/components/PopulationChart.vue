<script setup lang="ts">
import {computed, ref} from 'vue'

type CityPopulationData = {
  [year: string]: number
}

type PopulationDataset = {
  [city: string]: CityPopulationData;
}

const props = defineProps<{ population: PopulationDataset }>()
const selection = ref('Hamburg')
const chartType = ref('abs')

const data = computed(() => {
  return props.population[selection.value] || []
})

const max = computed(() => {
  if (chartType.value === 'rel') {
    return Math.max(...Object.values(data.value))
  }
  let maxPerCity = []
  for (const city in props.population) {
    const arr = Object.values(props.population[city])
    maxPerCity.push(Math.max(...arr))
  }
  return Math.max(...maxPerCity)
})

const min = computed(() => {
  if (chartType.value === 'rel') {
    return Math.min(...Object.values(data.value))
  }
  let minPerCity = []
  for (const city in props.population) {
    const arr = Object.values(props.population[city])
    minPerCity.push(Math.min(...arr))
  }
  return Math.min(...minPerCity)
})

</script>

<template>
  <section>
    <h2>Bevölkerungsentwicklung</h2>

    <select v-model="selection">
      <option value="Hamburg">Hamburg</option>
      <option value="Heidelberg">Heidelberg</option>
      <option value="Darmstadt">Darmstadt</option>
    </select>

    <select v-model="chartType" style="margin-left: 4px">
      <option value="rel">relativ</option>
      <option value="abs">absolut</option>
    </select>

    <table>
      <tr v-for="(population, year) in data">
        <td>{{ year }}</td>
        <td>
          <div :style="{width: 1 + ((population - min) / (max - min)) * (100 - 1)+ '%'}">&nbsp;</div>
        </td>
        <td>{{ population.toLocaleString('de-DE') }}</td>
      </tr>
    </table>
  </section>
</template>

<style scoped>
table {
  width: 100%;
  margin-top: 8px;
}

td {
  &:first-child {
    width: 1%;
    text-align: center;
  }

  &:last-child {
    text-align: right;
    width: 90px;
  }

  &:not(:first-child, :last-child) div {
    background-color: green;
    height: 100%;
    transition: width 0.5s ease;
  }
}

</style>