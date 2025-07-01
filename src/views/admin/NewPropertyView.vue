<script setup>
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { validationSchema, imageSchema } from '@/validation/propertySchema.js'
import useImage from '@/composable/useImage.js'
import useLocationMap from '@/composable/useLocationMap.js'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

const items = [1, 2, 3, 4, 5, 6]

const { url, uploadImage, imagePreview } = useImage()
const { zoom, center, pin } = useLocationMap()

const router = useRouter()
const db = useFirestore()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const bedrooms = useField('bedrooms')
const wc = useField('wc')
const parkingSpots = useField('parkingSpots')
const description = useField('description')

const pool = useField('pool', null, { initialValue: false })
const basement = useField('basement', null, { initialValue: false })
const garden = useField('garden', null, { initialValue: false })

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values
    const docRef = await addDoc(collection(db, 'properties'), {
      ...property,
      image: url.value,
      location: center.value
    });
    if (docRef.id) {
      await router.push({ name: `admin-properties` })
    }
})


</script>

<template>
  <v-card>
    <v-card-title class="text-h4 font-weight-bold" tag="h3"> New Property</v-card-title>
    <v-card-subtitle class="text-h5 py-4"> Add a new property</v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Property Title"
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
      />

      <v-file-input
        accept="image/jepg"
        label="Property Image"
        class="mb-5"
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        @change="uploadImage"
      />

      <div v-if="imagePreview" class="my-5">
        <p class="font-weight-bold">Property image:</p>
        <img class="w-50" :src="imagePreview" :alt="title.value.value" />
      </div>

      <v-text-field
        class="mb-5"
        label="Property Price"
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Bedrooms number"
            :items="items"
            v-model="bedrooms.value.value"
            :error-messages="bedrooms.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="WC number"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Parking Spots number"
            :items="items"
            v-model="parkingSpots.value.value"
            :error-messages="parkingSpots.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Property Description"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox label="Pool" v-model="pool.value.value" />
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox label="Basement" v-model="basement.value.value" />
        </v-col>
        <v-col cols="12" md="4">
          <v-checkbox label="Garden" v-model="garden.value.value" />
        </v-col>
      </v-row>

      <h2 class="font-weight-bold text-center my-5">House Location</h2>
      <div class="pb-10">
        <div style="height:600px">
          <LMap
            v-model:zoom="zoom"
            :center="center"
            :useGlobal-leaflet="false">

            <LMarker
              :lat-lng="center"
              draggable
              @moveend="pin"
            />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">Add property</v-btn>
    </v-form>
  </v-card>
</template>

<style scoped></style>
