<script setup>
import useProperties from '@/composable/useProperties.js'
import PropertyCard from '@/components/Property-card.vue'
import { priceFormat } from '@/helpers/index.js'

const { filteredItems, filters } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Our properties</h1>

  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      <p>Filter:</p>
      <v-row>
        <v-checkbox label="Pool" v-model="filters.pool" />
        <v-checkbox label="Garden" v-model="filters.garden" />
        <v-checkbox label="Basement" v-model="filters.basement" />
      </v-row>
    </v-card-title>
    <v-row>
      <PropertyCard
        v-for="property in filteredItems"
        :key="property.id"
        :property="property"
        :price="priceFormat"
      />
    </v-row>
  </v-card>
</template>
