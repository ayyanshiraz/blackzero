'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'

// Lazy-load Spline only when the component enters the viewport
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Only start downloading the Spline runtime when the section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }   // start loading 200px before entering viewport
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              {/* Invisible placeholder — Preloader already handled the loading UX */}
            </div>
          }
        >
          <Spline scene={scene} className={className} />
        </Suspense>
      ) : (
        // Placeholder div keeps layout stable while scene is pending
        <div className="w-full h-full" />
      )}
    </div>
  )
}
