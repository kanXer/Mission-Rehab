'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoadingBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <div
        className={`h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-300 ease-out ${
          loading ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  )
}
