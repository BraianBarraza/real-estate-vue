<script setup>
import useProperties from '@/composable/useProperties.js'
import PropertyCard from '@/components/Property-card.vue'
import { priceFormat } from '@/helpers/index.js'

const {propertiesCollection } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5"> Our properties</h1>

  <v-card flat class="py-10">
    <v-row>
      <PropertyCard
        v-for="property in propertiesCollection"
        :key="property.id"
        :property="property"
        :price="priceFormat"
      />
    </v-row>

  </v-card>
</template>
