import type { Ad, AdId } from '@/types/ad'
import { getJson } from '@/api/http'

/**
 * Fetches an ad by id.
 *
 * Default endpoint is same-origin: `/api/ads/:id`.
 * Adjust here if your backend uses a different path.
 */
export async function fetchAdById(id: AdId, signal?: AbortSignal): Promise<Ad> {
  const encodedId = encodeURIComponent(id)
  return await getJson<Ad>(`/api/ads/${encodedId}`, { signal })
}
