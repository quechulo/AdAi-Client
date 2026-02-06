export type AdId = string

export interface Ad {
  id: AdId
  title: string
  description: string
  image_url: string
  keywords: string[]
}
