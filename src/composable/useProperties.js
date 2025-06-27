import { computed, reactive } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function useProperties() {
  const filters = reactive({
    pool: false,
    garden: false,
    basement: false,
  })
  const storage = useFirebaseStorage()
  const db = useFirestore()
  //properties = the name of the db in firestore
  const propertiesCollection = useCollection(collection(db, 'properties'))

  async function deleteItem(id, urlImage) {
    if (confirm('Are you sure you want to delete this item?')) {
      const docRef = doc(db, 'properties', id)
      const imageRef = storageRef(storage, urlImage)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])

      alert(`Item ${id} was successfully deleted`)
    }
  }

  const filteredItems = computed(() => {
    return propertiesCollection.value.filter((property) => {
      if (filters.pool && !property.pool) return false
      if (filters.garden && !property.garden) return false
      if (filters.basement && !property.basement) return false
      return true
    })
  })

  return {
    propertiesCollection,
    filteredItems,
    filters,
    deleteItem,
  }
}
