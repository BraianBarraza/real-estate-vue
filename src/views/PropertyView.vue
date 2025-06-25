<script setup>
import { useRoute } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import { priceFormat } from '@/helpers/index.js'


const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
      {{ property?.title }}
    </v-card-title>

    <v-img :src="property?.image" height="550px" cover />

    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Price:
        <span class="font-weight-bold">{{ priceFormat(property?.price) }}</span>
      </v-card-text>
      <v-card-text>
        Bedrooms:
        <span class="font-weight-bold">{{ property?.bedrooms }}</span>
      </v-card-text>
      <v-card-text>
        WC:
        <span class="font-weight-bold">{{ property?.wc }}</span>
      </v-card-text>
      <v-card-text>
        Parking Spots:
        <span class="font-weight-bold">{{ property?.parkingSpots }}</span>
      </v-card-text>
    </div>
  </v-card>
</template>
