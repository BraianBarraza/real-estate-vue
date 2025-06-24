<script setup>
import useProperties from '@/composable/useProperties.js'
import Property from '@/components/Property.vue'

const {propertiesCollection} = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5"> Our properties</h1>

  <v-card flat class="py-10">
    <v-row>
      <Property
        v-for="property in propertiesCollection"
        :key="property.id"
        :property="property"
        :price="property.price"
      />
    </v-row>

  </v-card>
</template>
