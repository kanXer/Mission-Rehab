"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Volume2, VolumeX, X, ExternalLink } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

interface Item {
  _id: string
  type: "image" | "video"
  url: string
  title?: string
  starred: boolean
}

const INTERVAL = 3000

export default function Gallery() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [idx, setIdx] = useState(0)
  const [sound, setSound] = useState(false)
  const [videoModal, setVideoModal] = useState<Item | null>(null)
  const loaded = useRef(false)
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    fetch("/api/gallery")
      .then(r => r.json())
      .then(d => {
        const all: Item[] = d.items || []
        setItems(all)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const photos = items.filter(i => i.type === "image" && i.starred)
  const displayVideos = items.filter(i => i.type === "video" && i.starred).slice(0, 4)
  const item = photos[idx]

  useEffect(() => {
    if (photos.length < 2) return
    timer.current = setInterval(() => setIdx(p => (p + 1) % photos.length), INTERVAL)
    return () => clearInterval(timer.current)
  }, [photos.length])

  function next() {
    if (photos.length < 2) return
    clearInterval(timer.current)
    setIdx(p => (p + 1) % photos.length)
    if (photos.length >= 2) timer.current = setInterval(() => setIdx(p => (p + 1) % photos.length), INTERVAL)
  }

  function playSound() {
    if (!sound) return
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800 + Math.random() * 400
      gain.gain.value = 0.1
      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } catch {}
  }

  function handlePress() {
    next()
    playSound()
  }

  function getYtId(url: string) {
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return m ? m[1] : null
  }

  if (loading) return (
    <section className="bg-white dark:bg-navy-900 py-20 flex items-center justify-center" id="gallery" style={{ minHeight: 400 }}>
      <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
    </section>
  )

  if (photos.length === 0 && displayVideos.length === 0) return null

  return (
    <section className="bg-white dark:bg-navy-900 overflow-hidden" id="gallery">
      <ScrollReveal>
        <div className="text-center pt-20 pb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient mb-3">Doctor&apos;s Work</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Tap the button to see patient recoveries, therapy sessions, and clinical moments.
          </p>
        </div>
      </ScrollReveal>

      {photos.length > 0 && (
        <div className="flex justify-center pb-16 px-4">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-700">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-b-xl z-10 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-16 h-1.5 rounded-full bg-slate-800" />
              </div>

              <div className="relative rounded-[1.8rem] overflow-hidden bg-black aspect-[9/16]">
                {photos.map((p, i) => (
                  <img key={p._id} src={p.url} alt={p.title || ""} loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      i === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    draggable={false} />
                ))}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {photos.map((_, i) => (
                    <div key={i} className={`rounded-full transition-all duration-300 ${
                      i === idx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                    }`} />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 px-2">
                <button onClick={() => setSound(s => !s)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                  title={sound ? "Mute" : "Sound on"}>
                  {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button onClick={handlePress}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-90 transition-all duration-150 flex items-center justify-center ring-4 ring-white/20 hover:ring-white/40">
                  <Play size={22} className="ml-0.5" />
                </button>

                <span className="text-xs text-slate-500 font-medium tabular-nums">
                  {idx + 1}/{photos.length}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 left-10 right-10 h-8 bg-brand-600/20 blur-2xl rounded-full" />
          </div>
        </div>
      )}

      {displayVideos.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pb-24">
          <ScrollReveal>
            <h3 className="text-xl font-bold text-navy-800 dark:text-white mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-600">Patient Videos</span>
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayVideos.map(v => {
              const ytId = getYtId(v.url)
              const ytThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null
              return (
                <ScrollReveal key={v._id}>
                  {ytId ? (
                    <div className="group relative rounded-2xl overflow-hidden bg-black shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                      onClick={() => setVideoModal(v)}>
                      <div className="aspect-video">
                        <img src={ytThumb!} alt={v.title || ""}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                          loading="lazy" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                            <Play size={26} className="text-brand-600 ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-8">
                        <span className="text-white text-sm font-medium">{v.title}</span>
                      </div>
                    </div>
                  ) : (
                    <a href={v.url} target="_blank" rel="noopener noreferrer"
                      className="group block relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-navy-900 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                      <div className="aspect-video flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all group-hover:scale-110">
                            <Play size={26} className="text-red-400 ml-0.5" />
                          </div>
                          <p className="text-white font-semibold">{v.title || "Video"}</p>
                          <div className="flex items-center justify-center gap-1 mt-2 text-white/50 text-xs">
                            <ExternalLink size={12} /> <span>Click to open</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center" onClick={() => setVideoModal(null)}>
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
          <button onClick={() => setVideoModal(null)}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white z-10 hover:bg-white/10 rounded-full transition-all">
            <X size={28} />
          </button>
          <div className="relative z-10 w-full max-w-4xl mx-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const ytId = getYtId(videoModal.url)
              const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` : null
              return embedUrl ? (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe src={embedUrl} title={videoModal.title || ""}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full" />
                </div>
              ) : (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <video src={videoModal.url} controls autoPlay className="w-full h-full" />
                </div>
              )
            })()}
            {videoModal.title && (
              <p className="mt-4 text-white/80 text-sm font-medium text-center">{videoModal.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
