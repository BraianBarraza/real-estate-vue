<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '@/loginSchema.js'

const { handleSubmit } = useForm({ validationSchema })
const email = useField('email')
const password = useField('password')

const submit = handleSubmit(() =>{
  console.log('submitting ...')
})


</script>

<template>

  <v-card
    flat
    max-width="600"
    class="mx-auto my-10">
    <v-card-title
      class="text-h4 font-weight-bold"
      tag="h3">
      Login
    </v-card-title>
    <v-card-subtitle
      class="text-h5">
      Login with your account
    </v-card-subtitle>

    <v-form>
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value" />

      <v-text-field
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value" />

      <v-btn
        block
        color="pink accent-3">
        Login
      </v-btn>

    </v-form>
  </v-card>

</template>

<style scoped>

</style>
