export type AdId = string

export interface Ad {
  id: AdId
  title: string
  description: string
  imageUrl: string
  keywords: string[]
}
