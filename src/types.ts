export type Video = {
  url: string
  meta?: {
    "title": string
    "author_name": string
    "author_url": string
    "type": "video"
    "height": number,
    "width": number,
    "version": string
    "provider_name": "YouTube",
    "provider_url": string,
    "thumbnail_height": number,
    "thumbnail_width": number,
    "thumbnail_url": string,
    "html": string,
  }
}

export type GETVideoResponse = {
  videos: Video[]
}