'use client'

import React, { useEffect, useState, useRef } from "react"

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
  mode?: "typing" | "blast"
}

// Deterministic radial sparks for blast detonation
const BLAST_SPARKS = [
  { tx: 55, ty: -40, delay: 0 },
  { tx: -60, ty: -35, delay: 20 },
  { tx: 65, ty: 30, delay: 40 },
  { tx: -55, ty: 35, delay: 10 },
  { tx: 0, ty: -65, delay: 30 },
  { tx: 0, ty: 60, delay: 50 },
  { tx: 70, ty: -10, delay: 10 },
  { tx: -70, ty: -10, delay: 30 },
  { tx: 40, ty: -55, delay: 20 },
  { tx: -40, ty: 50, delay: 40 },
  { tx: 25, ty: 65, delay: 15 },
  { tx: -25, ty: -60, delay: 35 },
]

export default function TypewriterText({
  text,
  words,
  speed = 50,
  deleteSpeed = 40,
  pause = 2000,
  delay = 150,
  className = "",
  tag: Tag = "span",
  showCursor = true,
  cursorColor = "text-brand-500",
  onDone,
  loop = true,
  mode = "typing",
}: TypewriterTextProps) {
  const wordList = words && words.length > 0 ? words : text ? [text] : [""]
  const [wordIndex, setWordIndex] = useState(0)
  const [started, setStarted] = useState(true)
  const ref = useRef<HTMLElement>(null)

  // ----------------------------------------------------
  // Classic Typing Mode State
  // ----------------------------------------------------
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // ----------------------------------------------------
  // Blast Mode State ("gather" -> "frozen" -> "tremor" -> "blast")
  // ----------------------------------------------------
  const [blastPhase, setBlastPhase] = useState<"gather" | "frozen" | "tremor" | "blast">("gather")

  // Intersection Observer for scroll activation
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

  // ====================================================
  // 1. CLASSIC TYPING ENGINE (mode === "typing")
  // ====================================================
  useEffect(() => {
    if (mode !== "typing" || !started) return

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
  }, [mode, started, displayed, isDeleting, isPaused, wordIndex, wordList, speed, deleteSpeed, pause, delay, loop, onDone])

  // ====================================================
  // 2. SMOKE GATHER & BLAST ENGINE (mode === "blast")
  // ====================================================
  useEffect(() => {
    if (mode !== "blast" || !started) return

    // PHASE 1: SMOKE GATHER (Smoke converges and gathers into the complete word)
    if (blastPhase === "gather") {
      const gatherTimer = setTimeout(() => {
        setBlastPhase("frozen")
      }, 780)
      return () => clearTimeout(gatherTimer)
    }

    // PHASE 2: FROZEN (freeze sharp, stable, and readable with crystal aura)
    if (blastPhase === "frozen") {
      if (wordList.length === 1 && !loop) {
        onDone?.()
        return
      }
      const freezeTimer = setTimeout(() => {
        setBlastPhase("tremor")
      }, pause)
      return () => clearTimeout(freezeTimer)
    }

    // PHASE 3: PRE-BLAST TREMOR (85ms micro-vibration tension before detonation)
    if (blastPhase === "tremor") {
      const tremorTimer = setTimeout(() => {
        setBlastPhase("blast")
      }, 85)
      return () => clearTimeout(tremorTimer)
    }

    // PHASE 4: BOMB BLAST (radial shrapnel explosion, double shockwave & sparks)
    if (blastPhase === "blast") {
      const blastTimer = setTimeout(() => {
        // Transition seamlessly to next word in an infinite loop
        setWordIndex((prev) => (prev + 1) % wordList.length)
        setBlastPhase("gather")
      }, 520)
      return () => clearTimeout(blastTimer)
    }
  }, [mode, started, blastPhase, wordIndex, wordList, pause, loop, onDone])

  // ====================================================
  // RENDER: CLASSIC MODE
  // ====================================================
  if (mode === "typing") {
    return (
      <Tag ref={ref as any} className={className}>
        <span>{displayed || "\u200B"}</span>
        {showCursor && (
          <span
            aria-hidden="true"
            className={`inline-block w-[2px] sm:w-[2.5px] h-[0.9em] bg-current ml-0.5 sm:ml-1 animate-pulse align-baseline ${cursorColor}`}
          />
        )}
      </Tag>
    )
  }

  // ====================================================
  // RENDER: BLAST MODE (Smoke Gather -> Freeze -> Bomb Blast -> Next Word, No Cursor)
  // ====================================================
  const currentWord = wordList[wordIndex % wordList.length]
  const totalChars = currentWord.length
  let globalCharIdx = 0

  return (
    <Tag ref={ref as any} className={`relative inline-block overflow-visible ${className}`}>
      {/* Smoky vapor puff mist converging inward during gather phase */}
      {blastPhase === "gather" && (
        <span
          key={`vapor-${wordIndex}`}
          aria-hidden="true"
          className="absolute -inset-x-8 -inset-y-4 pointer-events-none -z-10 rounded-full bg-gradient-to-r from-brand-400/25 via-accent-300/35 to-brand-500/25 dark:from-brand-500/20 dark:via-accent-400/30 dark:to-brand-500/20 blur-xl animate-smoke-converge"
        />
      )}

      <span
        className={`relative inline-block transition-all duration-200 ${
          blastPhase === "frozen"
            ? "freeze-aura"
            : blastPhase === "tremor"
            ? "animate-blast-tremor"
            : ""
        }`}
      >
        {/* Render characters grouped by words to preserve natural layout */}
        {currentWord.split(" ").map((singleWord, sIdx, allWords) => {
          const isLastWord = sIdx === allWords.length - 1
          const wordChars = singleWord.split("")

          const renderedWord = (
            <span key={sIdx} className="inline-block whitespace-nowrap">
              {wordChars.map((char) => {
                const charIdx = globalCharIdx++

                // Smoke gathering trajectory (inward from outside smoke cloud)
                const inAngle = (charIdx / Math.max(totalChars, 1)) * 2 * Math.PI + 0.4
                const inDist = 18 + ((charIdx * 17) % 24) // 18px to 42px dispersed
                const gx = Math.round(Math.cos(inAngle) * inDist)
                const gy = Math.round(Math.sin(inAngle) * inDist)
                const gr = (charIdx % 2 === 0 ? 1 : -1) * (6 + ((charIdx * 9) % 14))

                // Blast dispersion trajectory (outward shrapnel explosion)
                let blastStyle: React.CSSProperties = {
                  "--gx": `${gx}px`,
                  "--gy": `${gy}px`,
                  "--gr": `${gr}deg`,
                } as React.CSSProperties

                if (blastPhase === "blast") {
                  const angle =
                    (charIdx / Math.max(totalChars, 1)) * 2 * Math.PI -
                    Math.PI / 2 +
                    (((charIdx % 3) - 1) * 0.25)
                  const dist = 75 + ((charIdx * 47) % 85) // 75px to 160px spread
                  const tx = Math.round(Math.cos(angle) * dist)
                  const ty = Math.round(Math.sin(angle) * dist)
                  const rot =
                    (charIdx % 2 === 0 ? 1 : -1) * (110 + ((charIdx * 59) % 240))

                  blastStyle = {
                    ...blastStyle,
                    transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(0.12)`,
                    opacity: 0,
                    filter: "blur(6px)",
                    transition:
                      "transform 0.52s cubic-bezier(0.15, 0.85, 0.35, 1.15), opacity 0.45s ease-out, filter 0.45s ease-out",
                  }
                }

                return (
                  <span
                    key={`${wordIndex}-${charIdx}`}
                    style={blastStyle}
                    className={`inline-block ${
                      blastPhase === "gather" ? "animate-smoke-gather" : ""
                    }`}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
          )

          // Track space between words
          if (!isLastWord) {
            globalCharIdx++
            return (
              <React.Fragment key={sIdx}>
                {renderedWord}
                <span className="inline">&nbsp;</span>
              </React.Fragment>
            )
          }

          return renderedWord
        })}

        {/* Shockwave rings & Sparks on Bomb Detonation */}
        {blastPhase === "blast" && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0 overflow-visible"
          >
            {/* Primary Shockwave Ring */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-brand-400 dark:border-brand-300 animate-shockwave" />
            {/* Secondary Shockwave Ring */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-accent-400 dark:border-accent-300 animate-shockwave [animation-delay:60ms]" />
            {/* Core Flash */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-400/40 dark:bg-brand-300/40 blur-md animate-shockwave" />
            {/* Radial Spark Embers */}
            {BLAST_SPARKS.map((spark, sIdx) => (
              <span
                key={sIdx}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-brand-400 to-accent-400 shadow-sm animate-spark"
                style={
                  {
                    "--tx": `${spark.tx}px`,
                    "--ty": `${spark.ty}px`,
                    animationDelay: `${spark.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </span>
        )}
      </span>
    </Tag>
  )
}
