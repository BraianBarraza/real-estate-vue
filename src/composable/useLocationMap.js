import { ref } from 'vue'

export default function useLocationMap() {

  const zoom = ref(12)
  const center = ref([50.3558488,7.5891372])

  function pin (e) {
    const marker = e.target.getLatLng()
    center.value =  [marker.lat, marker.lng]
  }

  return{
    zoom,
    center,
    pin
  }
}
