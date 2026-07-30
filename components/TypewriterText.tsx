'use client'

import { useEffect, useState, useRef } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  tag?: "span" | "div"
  showCursor?: boolean  // explicitly control cursor visibility
  onDone?: () => void   // called when typing finishes
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 1,
  className = "",
  tag: Tag = "span",
  showCursor = true,
  onDone,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
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
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onDone?.()
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [started, text, speed, delay])

  // Cursor shows only while actively typing (first char shown, not yet done, showCursor allowed)
  const isCursorVisible = showCursor && started && displayed.length > 0 && !done

  return (
    <Tag ref={ref as any} className={className}>
      {displayed}
      {isCursorVisible && (
        <span className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 animate-blink align-baseline" />
      )}
    </Tag>
  )
}
