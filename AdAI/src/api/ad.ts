import axios from 'axios'
import type { Ad, AdId } from '@/types/ad'


export async function fetchAdById(id: AdId, signal?: AbortSignal): Promise<Ad> {
  const response = await axios.get<Ad>(`http://localhost:8000/api/v1/view-ad/${id}`, {
    signal
  })
  return response.data
}
