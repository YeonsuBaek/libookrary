import { RefObject, useEffect, useState } from 'react'

function useIntersectionObserver(ref: RefObject<Element | null>, options: IntersectionObserverInit = { threshold: 0 }) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
    }, options)

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

  return { isIntersecting: entry?.isIntersecting }
}

export default useIntersectionObserver
