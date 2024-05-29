import { RefObject, useEffect, useState } from 'react'

function useIntersectionObserver(ref: RefObject<Element | null>, options: IntersectionObserverInit = { threshold: 0 }) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(setEntries, options)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return { isIntersecting: entries[0]?.isIntersecting }
}

export default useIntersectionObserver
