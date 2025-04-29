import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)
  const errorMessage = ref('')
  const router = useRouter()

  const errorCodes = {
    'auth/invalid-credential': 'Invalid User or Password',
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        authUser.value = user
        router.push('/admin/properties')

        errorMessage.value = ''
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code]
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null
        router.push('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    logout,
    hasError,
    errorMessage,
    isAuth,
  }
})
