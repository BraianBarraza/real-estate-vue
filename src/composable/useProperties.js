import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

export default function useProperties() {
  const db = useFirestore()
  //properties = the name of the db in firestore
  const propertiesCollection = useCollection(collection(db, 'properties'))

  return {
    propertiesCollection,
  }
}
