<script setup>
import useProperties from '@/composable/useProperties.js'

const { propertiesCollection, priceFormat } = useProperties()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Administration Panel</h2>

  <v-btn color="blue" variant="flat" :to="{ name: 'new-property' }"> New Property</v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="180" :alt="property.title" :src="property.image" />
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ priceFormat(property.price) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn color="info" class="mr-2"> Edit </v-btn>

          <v-btn color="red-darken-3"> Delete </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
