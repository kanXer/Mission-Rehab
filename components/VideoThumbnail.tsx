'use client'

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

export default function VideoThumbnail({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [thumb, setThumb] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!ready) return
    const v = videoRef.current
    const c = canvasRef.current
    if (!v || !c) return

    let cancelled = false

    v.addEventListener("loadeddata", function capture() {
      v.removeEventListener("loadeddata", capture)
      v.currentTime = 0.5
    })

    v.addEventListener("seeked", function draw() {
      v.removeEventListener("seeked", draw)
      if (cancelled) return
      try {
        c.width = v.videoWidth || 320
        c.height = v.videoHeight || 240
        c.getContext("2d")?.drawImage(v, 0, 0, c.width, c.height)
        const dataUrl = c.toDataURL("image/jpeg", 0.5)
        if (!cancelled) setThumb(dataUrl)
      } catch { /* fallback */ }
    })

    v.addEventListener("error", () => {})

    return () => { cancelled = true }
  }, [ready, src])

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0">
      {ready && (
        <>
          <video ref={videoRef} src={src} preload="metadata" muted playsInline className="hidden" />
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
      {thumb ? (
        <img src={thumb} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-all">
          <Play size={24} className="text-brand-600 ml-0.5" />
        </div>
      </div>
    </div>
  )
}
