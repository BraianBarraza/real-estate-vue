<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '../validation/loginSchema.js'
import { useAuthStore } from '../stores/auth.js'

const { handleSubmit } = useForm({ validationSchema })
const auth = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
  auth.login(values)
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
      class="text-h5 py-4">
      Login with your account
    </v-card-subtitle>

    <v-alert
      v-if="auth.hasError"
      class="my-5"
      color="error"
      icon="$error"
      :title="auth.errorMessage"
    ></v-alert>

    <v-form>
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value" />

      <v-text-field
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value" />

      <v-btn
        block
        color="pink accent-3"
        @click="submit">
        Login
      </v-btn>

    </v-form>
  </v-card>

</template>

<style scoped>

</style>
