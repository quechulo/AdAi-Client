import axios from 'axios'

interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

interface PexelsSearchResponse {
  total_results: number
  page: number
  per_page: number
  photos: PexelsPhoto[]
  next_page?: string
}

export async function fetchPexelsImage(
  keywords: string[],
  signal?: AbortSignal
): Promise<string | null> {
  if (!keywords || keywords.length === 0) {
    return null
  }

  const query = keywords.join(', ')

  try {
    const apiKey = import.meta.env.VITE_PEXELS_API
    
    if (!apiKey) {
      console.warn('Pexels API key not found in environment variables')
      return null
    }

    const response = await axios.get<PexelsSearchResponse>(
      'https://api.pexels.com/v1/search',
      {
        params: {
          query,
          per_page: 1
        },
        headers: {
          Authorization: apiKey
        },
        signal
      }
    )

    // Return the original image URL if available
    if (response.data.photos && response.data.photos.length > 0) {
      const photo = response.data.photos[0]
      if (photo && photo.src && photo.src.original) {
        return photo.src.original
      }
    }

    return null
  } catch (error) {
    if (axios.isCancel(error)) {
      return null
    }
    
    console.error('Failed to fetch Pexels image:', error)
    return null
  }
}
