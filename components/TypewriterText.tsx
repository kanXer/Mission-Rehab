'use client'

import { useEffect, useState, useRef } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  tag?: "span" | "div"
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 1,
  className = "",
  tag: Tag = "span",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [started, text, speed, delay])

  return (
    <Tag ref={ref as any} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 animate-blink align-baseline" />
      )}
    </Tag>
  )
}
