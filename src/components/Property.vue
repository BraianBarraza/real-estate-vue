<script setup>
defineProps({
  property: {
    type: Object,
  }
})
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image" height="250" cover/>
      <v-card-title class="font-weight-bold">
        {{ property.title }}
      </v-card-title>
      <v-card-text class="text-truncate">
        {{property.description}}
      </v-card-text>
      <v-card-text class="text-h5">
        Price: {{ property.price }}
      </v-card-text>
    </v-card>
  </v-col>
</template>
