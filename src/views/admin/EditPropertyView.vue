<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFirestore, useDocument } from 'vuefire'
import { updateDoc, doc } from 'firebase/firestore'
import { useField, useForm } from 'vee-validate'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import useImage from '@/composable/useImage.js'
import useLocationMap from '@/composable/useLocationMap.js'
import { validationSchema } from '@/validation/propertySchema.js'

// defines title, price, bedrooms, wc, parkingSpots, description :contentReference[oaicite:0]{index=0}
const items = [1, 2, 3, 4, 5]

const { url, uploadImage, imagePreview } = useImage()
const { zoom, center, pin } = useLocationMap()

const { handleSubmit } = useForm({ validationSchema })

const title = useField('title')
const image = useField('image')
const price = useField('price')
const bedrooms = useField('bedrooms')
const wc = useField('wc')
const parkingSpots = useField('parkingSpots')
const description = useField('description')
const pool = useField('pool')
const basement = useField('basement')
const garden = useField('garden')

const route = useRoute()
const router = useRouter()

//get the property to edit
const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const property = useDocument(docRef)

watch(property, (property) => {
  title.value.value = property.title
  price.value.value = property.price
  bedrooms.value.value = property.bedrooms
  wc.value.value = property.wc
  parkingSpots.value.value = property.parkingSpots
  pool.value.value = property.pool
  description.value.value = property.description
  basement.value.value = property.basement
  garden.value.value = property.garden
  center.value = property.location
})

const submit = handleSubmit(async (values) => {
  const { image, ...property } = values
  let imageUrl = property.imagePreview || url.value

  if (image.value) {
    uploadImage({ target: { files: [image.value] } })
    imageUrl = url.value
  }
  const data = {
    ...property,
    image: imageUrl,
    location: center.value,
  }

  await updateDoc(docRef, data)
  router.push({ name: 'admin-properties' })
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Edit Property</h1>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-h5">Edit the property details</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="title.value.value"
        :error-messages="title.errorMessage.value"
        label="Property Title"
        class="mb-5"
      />

      <v-file-input
        v-model="image.value.value"
        :error-messages="image.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Property Image"
        class="mb-5"
        @change="uploadImage"
      />

      <div class="my-5">
        <p class="font-weight-bold">Current Image:</p>

        <img v-if="imagePreview" class="w-50" :src="imagePreview" :alt="title.value.value" />

        <img v-else class="w-50" :src="property?.image" :alt="title.value.value" />
      </div>

      <v-text-field
        v-model="price.value.value"
        :error-messages="price.errorMessage.value"
        label="Property Price"
        class="mb-5"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Bedrooms"
            class="mb-5"
            :items="items"
            v-model="bedrooms.value.value"
            :error-messages="bedrooms.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="WC"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Parking Spots"
            class="mb-5"
            :items="items"
            v-model="parkingSpots.value.value"
            :error-messages="parkingSpots.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        label="Property Description"
        class="mb-5"
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
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :useGlobal-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit"> Save Changes</v-btn>
    </v-form>
  </v-card>
</template>

<style scoped></style>
