'use client'

export default function myImageLoader({ src, width, quality }) {
    return `${process.env.apiHost}${src}?w=${width}&q=${quality || 75}`
}