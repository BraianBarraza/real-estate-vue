import { collection } from 'firebase/firestore'
import {useFirestore, useCollection} from 'vuefire'
import { computed } from 'vue'

export default function useProperties() {

  const db = useFirestore()
  //properties = the name of the db in firestore
  const propertiesCollection = useCollection(collection(db, 'properties'))

  const priceFormat = computed(() =>{
    return(price) =>
      Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
  })

  return{
    propertiesCollection,
    priceFormat
  }

}
