import axios from 'axios'
import type { Ad, AdId } from '@/types/ad'


export async function fetchAdById(id: AdId, signal?: AbortSignal): Promise<Ad> {
  const response = await axios.get<Ad>(`${import.meta.env.VITE_API_BASE_URL}/view-ad/${id}`, {
    signal
  })
  return response.data
}
