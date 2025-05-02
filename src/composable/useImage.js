import { ref as storageRef } from 'firebase/storage'
import { useStorageFile, useFirebaseStorage } from 'vuefire'
import { uid } from 'uid'
import { computed } from 'vue'

export default function useImage() {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `/properties/${uid()}.jpg`)

  const {
    url,
    upload
  } = useStorageFile(storageRefPath)

  function uploadImage(e) {
    const data = e.target.files[0]
    if (data) {
      upload(data)
    }
  }

  const imagePreview = computed(()=>{
    return url.value ? url.value : null
  })

  return {
    url,
    uploadImage,
    imagePreview
  }
}
