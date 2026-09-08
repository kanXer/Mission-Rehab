'use client'

import { useEffect, useState, useRef } from "react"

interface TypewriterTextProps {
  text?: string
  words?: string[]
  speed?: number
  deleteSpeed?: number
  pause?: number
  delay?: number
  className?: string
  tag?: "span" | "div" | "h1" | "h2" | "h3" | "p"
  showCursor?: boolean
  cursorColor?: string
  onDone?: () => void
  loop?: boolean
}

export default function TypewriterText({
  text,
  words,
  speed = 70,
  deleteSpeed = 40,
  pause = 2200,
  delay = 150,
  className = "",
  tag: Tag = "span",
  showCursor = true,
  cursorColor = "text-brand-500",
  onDone,
  loop = true,
}: TypewriterTextProps) {
  const wordList = words && words.length > 0 ? words : text ? [text] : [""]
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const currentWord = wordList[wordIndex % wordList.length]

    // Initial delay before start
    if (displayed === "" && !isDeleting && wordIndex === 0 && !isPaused) {
      const startTimeout = setTimeout(() => {
        setDisplayed(currentWord.slice(0, 1))
      }, delay)
      return () => clearTimeout(startTimeout)
    }

    // When typing reaches full word, pause before deleting
    if (!isDeleting && displayed === currentWord) {
      if (wordList.length === 1 && !loop) {
        onDone?.()
        return
      }
      setIsPaused(true)
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        if (wordList.length > 1 || loop) {
          setIsDeleting(true)
        }
      }, pause)
      return () => clearTimeout(pauseTimer)
    }

    // When word is fully deleted, move to next word
    if (isDeleting && displayed === "") {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % wordList.length)
      return
    }

    // Normal typing or deleting step
    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
        } else {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
        }
      },
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timer)
  }, [started, displayed, isDeleting, isPaused, wordIndex, wordList, speed, deleteSpeed, pause, delay, loop, onDone])

  return (
    <Tag ref={ref as any} className={className}>
      <span>{displayed}</span>
      {showCursor && (
        <span
          className={`inline-block w-[2.5px] h-[0.9em] bg-current ml-1 animate-pulse align-baseline ${cursorColor}`}
        />
      )}
    </Tag>
  )
}
