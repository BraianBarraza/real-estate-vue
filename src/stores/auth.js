import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore
  = defineStore('auth', () => {

  const auth = useFirebaseAuth()
  const errorMessage = ref('')

  const errorCodes = {
    'auth/invalid-credential': 'Invalid User or Password'
  }

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials)
        errorMessage.value = ''
      })
      .catch(error => {
        errorMessage.value = errorCodes[error.code]
      })

  }

  const hasError = computed(() =>{
    return errorMessage.value
  })

  return {
    login,
    hasError,
    errorMessage,
  }
})
