import { useEffect } from 'react'
import { siteMeta } from '../data/profile.js'

function setMeta(attr, key, value) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

/**
 * Per-route document title + description + Open Graph / Twitter tags.
 * Falls back to the site defaults (index.html) when no override is given.
 */
export default function usePageMeta({ title, description } = {}) {
  const finalTitle = title || siteMeta.title
  const finalDescription = description || siteMeta.description

  useEffect(() => {
    document.title = finalTitle
    setMeta('name', 'description', finalDescription)
    setMeta('property', 'og:title', finalTitle)
    setMeta('property', 'og:description', finalDescription)
    setMeta('name', 'twitter:title', finalTitle)
    setMeta('name', 'twitter:description', finalDescription)
  }, [finalTitle, finalDescription])
}
