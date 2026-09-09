"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft, Calendar, Clock, Heart, MessageCircle, Share2,
  Trash2, Send, Check, Copy, AlertCircle, ShieldCheck,
  User as UserIcon, BookOpen, Loader2,
  Stethoscope, ListOrdered, ChevronDown, ChevronUp,
  Type, ArrowRight, Phone, MessageSquare
} from "lucide-react"
import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa"
import Header from "@/components/Header"
import TopBar from "@/components/TopBar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"
import { useAuth } from "@/components/AuthProvider"
import { useToast } from "@/components/ToastProvider"

interface Comment {
  _id: string
  userId: string
  userName: string
  userEmail: string
  userPhoto?: string
  content: string
  createdAt: string
}

interface Post {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image?: string
  author?: string
  category?: string
  youtubeUrl?: string
  createdAt: string
  likes?: string[]
  comments?: Comment[]
}

interface TocItem {
  id: string
  text: string
  level: number
}

// Fail-proof YouTube ID extraction
function getYoutubeId(url?: string): string | null {
  if (!url || typeof url !== "string") return null
  const cleanUrl = url.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl
  try {
    const parsed = new URL(cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`)
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0] || null
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] || null
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] || null
      }
      return parsed.searchParams.get("v")
    }
  } catch {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = cleanUrl.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }
  return null
}

export default function BlogPostClient({ slug, initialPost }: { slug: string; initialPost?: Post | null }) {
  const [post, setPost] = useState<Post | null>(initialPost || null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(!initialPost)
  const [likes, setLikes] = useState<string[]>(Array.isArray(initialPost?.likes) ? initialPost.likes : [])
  const [comments, setComments] = useState<Comment[]>(Array.isArray(initialPost?.comments) ? initialPost.comments : [])
  const [commentInput, setCommentInput] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null)
  const [liking, setLiking] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isLargeFont, setIsLargeFont] = useState(false)
  const [showToc, setShowToc] = useState(false)
  const [activeHeadingId, setActiveHeadingId] = useState("")

  const { user, getIdToken } = useAuth()
  const { toast } = useToast()
  const commentSectionRef = useRef<HTMLDivElement>(null)
  const articleBodyRef = useRef<HTMLDivElement>(null)

  // Fetch Current Article & Related Posts
  useEffect(() => {
    let isMounted = true
    if (!initialPost) {
      setLoading(true)
    }

    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.post) {
          setPost(data.post)
          setLikes(Array.isArray(data.post.likes) ? data.post.likes : [])
          setComments(Array.isArray(data.post.comments) ? data.post.comments : [])
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted && data.posts && Array.isArray(data.posts)) {
          setRelatedPosts(
            data.posts.filter((p: Post) => p.slug !== slug).slice(0, 3)
          )
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [slug])

  // Track Reading Progress
  const handleScrollProgress = useCallback(() => {
    if (!articleBodyRef.current) return
    const rect = articleBodyRef.current.getBoundingClientRect()
    const elementTop = rect.top
    const elementHeight = rect.height
    const windowHeight = window.innerHeight

    if (elementHeight <= 0) return

    const scrolled = windowHeight - elementTop
    const total = elementHeight + windowHeight
    const percent = Math.min(100, Math.max(0, Math.round((scrolled / total) * 100)))
    setReadingProgress(percent)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScrollProgress, { passive: true })
    handleScrollProgress()
    return () => window.removeEventListener("scroll", handleScrollProgress)
  }, [handleScrollProgress])

  // Calculated reading time
  const readingTime = useMemo(() => {
    if (!post?.content) return "3 min read"
    const textOnly = post.content.replace(/<[^>]*>/g, "")
    const words = textOnly.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${Math.max(1, minutes)} min read`
  }, [post?.content])

  // Generate Table of Contents from h2 & h3 tags
  const { tocItems, processedContent } = useMemo(() => {
    if (!post?.content) return { tocItems: [], processedContent: "" }

    const items: TocItem[] = []
    let counter = 0

    const updatedHtml = post.content.replace(
      /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
      (match, levelStr, attrs, text) => {
        const level = parseInt(levelStr, 10)
        const cleanText = text.replace(/<[^>]*>/g, "").trim()
        if (!cleanText) return match

        const headingId = `section-${counter++}-${cleanText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`

        items.push({ id: headingId, text: cleanText, level })

        if (/id=["'][^"']+["']/.test(attrs)) {
          return match
        }
        return `<h${level} id="${headingId}" ${attrs}>${text}</h${level}>`
      }
    )

    return { tocItems: items, processedContent: updatedHtml }
  }, [post?.content])

  // Smooth scroll to a TOC heading
  const scrollToHeading = (id: string) => {
    setActiveHeadingId(id)
    setShowToc(false)
    const element = document.getElementById(id)
    if (element) {
      const topOffset = 110
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const userEmail = user?.email?.toLowerCase()
  const hasLiked = userEmail ? likes.includes(userEmail) : false

  // Protected Like Handler
  async function handleLikeToggle() {
    if (!user) {
      toast("Please sign in to like this post")
      return
    }
    if (liking) return

    setLiking(true)
    const token = await getIdToken()
    if (!token) {
      toast("Login session expired. Please sign in again.")
      setLiking(false)
      return
    }

    const previousLikes = [...likes]
    if (hasLiked) {
      setLikes(likes.filter((e) => e !== userEmail))
    } else if (userEmail) {
      setLikes([...likes, userEmail])
    }

    try {
      const res = await fetch(`/api/blog/${slug}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (!res.ok) {
        setLikes(previousLikes)
        toast(data.error || "Failed to update like")
      } else {
        toast(data.liked ? "Liked! ❤️" : "Unliked")
      }
    } catch {
      setLikes(previousLikes)
      toast("Failed to update like. Please try again.")
    } finally {
      setLiking(false)
    }
  }

  // Protected Comment Submission
  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    if (!user) {
      toast("Please sign in to comment")
      return
    }
    if (!commentInput.trim() || submittingComment) return

    setSubmittingComment(true)
    const token = await getIdToken()
    if (!token) {
      toast("Login session expired. Please sign in again.")
      setSubmittingComment(false)
      return
    }

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentInput }),
      })
      const data = await res.json()
      if (res.ok && data.comment) {
        setComments((prev) => [...prev, data.comment])
        setCommentInput("")
        toast("Comment published successfully!")
      } else {
        toast(data.error || "Failed to post comment")
      }
    } catch {
      toast("Error publishing comment")
    } finally {
      setSubmittingComment(false)
    }
  }

  // Protected Comment Deletion
  async function handleDeleteComment(commentId: string) {
    if (!confirm("Are you sure you want to delete this comment?")) return
    const token = await getIdToken()
    if (!token) {
      toast("Unauthorized. Please log in.")
      return
    }

    setDeletingCommentId(commentId)
    try {
      const res = await fetch(`/api/blog/${slug}/comments?id=${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== commentId))
        toast("Comment deleted")
      } else {
        const data = await res.json()
        toast(data.error || "Could not delete comment")
      }
    } catch {
      toast("Failed to delete comment")
    } finally {
      setDeletingCommentId(null)
    }
  }

  // Share Actions
  function copyShareLink() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast("Article link copied!")
      setTimeout(() => setCopied(false), 2500)
    }
  }

  function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share && post) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt || "Read this article from Gorakhpur Mission Rehab",
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      copyShareLink()
    }
  }

  if (loading) {
    return (
      <>
        <TopBar />
        <Header />
        <main className="pt-28 pb-20 bg-white dark:bg-navy-950 min-h-[65vh] flex flex-col items-center justify-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-3 border-brand-200 dark:border-brand-900/60 border-t-brand-600 animate-spin" />
            <Stethoscope className="w-5 h-5 text-brand-600 absolute" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-navy-900 dark:text-white font-bold text-sm">Opening Clinical Guide</p>
            <p className="text-slate-400 text-xs">Curating evidence-based neuro insights...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <TopBar />
        <Header />
        <main className="pt-28 pb-20 bg-white dark:bg-navy-950 min-h-[65vh] flex flex-col items-center justify-center gap-5 text-center px-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center ring-1 ring-rose-200 dark:ring-rose-900/50">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md">
            <h1 className="text-2xl font-extrabold text-navy-900 dark:text-white">Article Not Found</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              The clinical article you are looking for may have been updated or moved.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Explore All Clinical Insights
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const youtubeId = getYoutubeId(post.youtubeUrl)
  const [currentUrl, setCurrentUrl] = useState(`https://gorakhpurmission.in/blog/${post.slug}`)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  return (
    <>
      {/* Pinned Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-brand-500 via-accent-500 to-emerald-400 transition-all duration-150 ease-out shadow-xs shadow-brand-500/50"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <TopBar />
      <Header />

      {/* ========================================================================= */}
      {/* FLOATING ACTION ISLAND (High-Visibility Theme-Matched Dock)                */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-auto">
        <nav
          aria-label="Article Actions"
          className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-2xl border-2 border-brand-500/80 dark:border-brand-400 text-navy-950 dark:text-white shadow-[0_12px_40px_rgba(14,165,233,0.35)] dark:shadow-[0_12px_40px_rgba(14,165,233,0.4)]"
        >
          {/* Like Button */}
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer font-bold ${
              hasLiked
                ? "bg-rose-500 text-white scale-105 shadow-md shadow-rose-500/30"
                : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40"
            }`}
            title="Like this article"
          >
            <Heart className={`w-4 h-4 ${hasLiked ? "fill-current text-white" : "fill-current"}`} />
            <span className="text-xs font-mono">{likes.length}</span>
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-navy-700" />

          {/* Jump to Comments */}
          <button
            type="button"
            onClick={() => commentSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors cursor-pointer font-bold"
            title="Comments discussion"
          >
            <MessageCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-mono">{comments.length}</span>
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-navy-700" />

          {/* 1-Click WhatsApp Share */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all"
            title="Share on WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={copyShareLink}
            className="p-2 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors cursor-pointer"
            title="Copy link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-navy-700 hidden sm:block" />

          {/* Book Consult CTA Shortcut */}
          <Link
            href="/book-appointment"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white text-xs font-black shadow-md shadow-brand-600/25 hover:scale-102 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Consult Doctor</span>
          </Link>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* MAIN EDITORIAL CANVAS (Centered, Unified, Beautiful Typography)           */}
      {/* ========================================================================= */}
      <main id="main-content" className="pt-6 sm:pt-10 pb-28 min-h-screen bg-white dark:bg-navy-950">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Utility Strip: Back Link + Category + Controls */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-navy-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Articles</span>
              </Link>

              <div className="flex items-center gap-2.5">
                {post.category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    {post.category}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {readingTime}
                </span>

                {/* Font Size Toggle */}
                <button
                  type="button"
                  onClick={() => setIsLargeFont(!isLargeFont)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700 transition-colors cursor-pointer"
                  title="Toggle font size"
                >
                  <span className="font-serif">{isLargeFont ? "A−" : "A+"}</span>
                </button>
              </div>
            </div>

            {/* Headline Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 dark:text-white tracking-tight leading-[1.15] break-words">
              {post.title}
            </h1>

            {/* Editorial Excerpt Box */}
            {post.excerpt && (
              <div className="relative my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-50/70 via-slate-50/80 to-transparent dark:from-navy-900/90 dark:via-navy-900/60 dark:to-transparent border-l-4 border-brand-500 border-y border-r border-slate-200/80 dark:border-navy-700/80 shadow-xs">
                <div className="flex items-center gap-1.5 mb-2.5 text-brand-600 dark:text-brand-400">
                  <BookOpen className="w-4 h-4 text-brand-500" />
                  <span className="text-[11px] font-black uppercase tracking-wider">
                    Article Summary & Key Insight
                  </span>
                </div>
                <p className="text-base sm:text-lg italic font-serif text-slate-800 dark:text-slate-100 leading-relaxed antialiased">
                  &ldquo;{post.excerpt}&rdquo;
                </p>
              </div>
            )}

            {/* Doctor Byline Passport Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/doctor.jpg"
                    alt={post.author || "Dr. Devejya Srivastava (PT)"}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/30 shadow-xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-navy-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-navy-950 dark:text-white">
                      {post.author || "Dr. Devejya Srivastava (PT)"}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    BPT (Physiotherapy) • Neuro Rehab Specialist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span className="text-brand-600 dark:text-brand-400 font-semibold">
                  Divyaman Hospital
                </span>
              </div>
            </div>

            {/* Cover Image */}
            {post.image && (
              <div className="mt-6 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-navy-800 bg-slate-900 group">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[460px] object-cover transition-transform duration-700 group-hover:scale-101"
                />
              </div>
            )}
          </header>

          {/* Quick Table of Contents (Modern Collapsible Accordion) */}
          {tocItems.length > 0 && (
            <div className="mt-8 rounded-2xl bg-slate-50 dark:bg-navy-900/80 border border-slate-200/80 dark:border-navy-800 p-4 transition-all">
              <button
                type="button"
                onClick={() => setShowToc(!showToc)}
                className="w-full flex items-center justify-between text-left font-bold text-xs text-navy-900 dark:text-white cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-brand-600" />
                  <span>Topics Covered in This Guide ({tocItems.length})</span>
                </span>
                {showToc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showToc && (
                <ul className="mt-3 pt-3 border-t border-slate-200/60 dark:border-navy-800 space-y-1.5">
                  {tocItems.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                      <button
                        type="button"
                        onClick={() => scrollToHeading(item.id)}
                        className={`text-xs text-left block w-full py-1 transition-colors cursor-pointer ${
                          activeHeadingId === item.id
                            ? "text-brand-600 dark:text-brand-400 font-bold"
                            : "text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-white font-medium"
                        }`}
                      >
                        • {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* YouTube Video Section if available */}
          {youtubeId && (
            <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 dark:border-navy-800 shadow-lg bg-black">
              <div className="bg-navy-950 text-white px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-xs font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Clinical Video Demonstration
                </span>
                <span className="text-[10.5px] text-slate-400 font-mono">HD</span>
              </div>
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Key Clinical Takeaway Brief */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-brand-50/80 via-accent-50/50 to-white dark:from-brand-950/40 dark:via-navy-900 dark:to-navy-900 border border-brand-200/80 dark:border-brand-800/50">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-brand-600 text-white shadow-xs shrink-0 mt-0.5">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  Doctor&apos;s Clinical Takeaway
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Neuro rehabilitation produces the highest neuroplastic gains when started early. Consistency, biomechanical accuracy, and guided therapy lead to lasting mobility restoration.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ARTICLE PROSE CONTENT                                                     */}
          {/* ========================================================================= */}
          <div
            ref={articleBodyRef}
            className={`mt-10 blog-content-prose prose max-w-full dark:prose-invert ${
              isLargeFont ? "prose-lg sm:prose-xl" : "prose-base sm:prose-lg"
            } prose-headings:text-navy-950 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:break-words prose-p:leading-[1.8] prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:break-words prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:font-bold prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl prose-img:max-w-full prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-navy-900/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200 prose-code:text-brand-700 dark:prose-code:text-brand-300 prose-code:bg-slate-100 dark:prose-code:bg-navy-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded`}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* High-Converting In-Article Doctor Consultation Banner */}
          <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-brand-700 via-brand-800 to-navy-950 dark:from-navy-900 dark:via-brand-950 dark:to-navy-950 text-white shadow-2xl relative overflow-hidden border-2 border-brand-400/40">
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-navy-950 text-xs font-black shadow-md uppercase tracking-wider">
                <Stethoscope className="w-4 h-4 text-navy-950" /> Doctor Consultation Available
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white drop-shadow-xs tracking-tight">
                Suffering from Stroke, Paralysis, or Chronic Nerve Pain?
              </h3>
              <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-2xl drop-shadow-xs">
                Get personally evaluated by <strong className="text-amber-300 font-extrabold underline decoration-amber-400 underline-offset-2">Dr. Devejya Srivastava (PT)</strong> at Divyaman Hospital, Gorakhpur. Evidence-based neuro therapy designed specifically for your recovery phase.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="tel:+919616962072"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-navy-950 font-black text-xs sm:text-sm shadow-xl hover:bg-slate-100 hover:scale-102 transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-600" />
                  <span>Call Doctor (+91 9616962072)</span>
                </a>
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/20 hover:scale-102 transition-all active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-navy-950" />
                  <span>Book Clinic Slot</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Author Clinical Profile Card */}
          <div className="mt-10 rounded-3xl p-6 sm:p-7 bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <img
                  src="/doctor.jpg"
                  alt={post.author || "Dr. Devejya Srivastava (PT)"}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-brand-500/20 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-brand-600 text-white text-[8.5px] font-black uppercase tracking-wider">
                  BPT
                </span>
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                    {post.author || "Dr. Devejya Srivastava (PT)"}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    10+ Yrs Exp • 500+ Patients
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Consultant Neuro Rehab Physiotherapist (BPT) at <strong>Divyaman Hospital, Bargadwa Bypass, Gorakhpur</strong>. Former clinical experience at Dr. Ram Manohar Lohia Hospital, Lucknow and Yashoda Hospital, Ghaziabad.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline pt-1"
                >
                  <span>Learn about Dr. Devejya</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COMMENTS & DISCUSSION SECTION                                             */}
          {/* ========================================================================= */}
          <div ref={commentSectionRef} className="mt-14 pt-8 border-t border-slate-100 dark:border-navy-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-brand-600" />
                <span>Discussion & Queries</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  {comments.length}
                </span>
              </h2>
            </div>

            {/* Comment Form */}
            <div className="bg-slate-50 dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-navy-800 p-4 sm:p-5 mb-6">
              {user ? (
                <form onSubmit={handleAddComment} className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-bold text-navy-950 dark:text-white">{user.name}</span>
                  </div>

                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Ask a question or share feedback on this article..."
                    rows={3}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    required
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submittingComment || !commentInput.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {submittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{submittingComment ? "Posting..." : "Post Comment"}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-navy-900 dark:text-white">
                    Have a rehabilitation query or thoughts on this article?
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sign in to join the discussion or ask Dr. Devejya a clinical question.
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/login?redirect=${encodeURIComponent(`/blog/${slug}`)}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20"
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>Sign In to Comment</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Stream */}
            {comments.length === 0 ? (
              <p className="text-center py-6 text-xs text-slate-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              <div className="space-y-3">
                {comments.map((c) => {
                  const canDelete =
                    user &&
                    (user.isAdmin ||
                      c.userId === user.id ||
                      c.userEmail.toLowerCase() === user.email.toLowerCase())

                  return (
                    <div
                      key={c._id}
                      className="bg-slate-50/60 dark:bg-navy-900/60 rounded-2xl border border-slate-200/60 dark:border-navy-800 p-3.5 sm:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-navy-800 text-brand-700 dark:text-brand-300 text-[10px] font-bold flex items-center justify-center">
                            {c.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-navy-900 dark:text-white block leading-tight">
                              {c.userName}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(c.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(c._id)}
                            disabled={deletingCommentId === c._id}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            {deletingCommentId === c._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                        {c.content}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RELATED CLINICAL ARTICLES SECTION                                         */}
          {/* ========================================================================= */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-100 dark:border-navy-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-black text-navy-950 dark:text-white">
                  More From Dr. Devejya
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>All Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost._id}
                    href={`/blog/${rPost.slug}`}
                    className="group rounded-2xl bg-slate-50 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {rPost.image ? (
                      <div className="w-full h-32 overflow-hidden bg-slate-100 dark:bg-navy-800">
                        <img
                          src={rPost.image}
                          alt={rPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-white">
                        <BookOpen className="w-6 h-6 opacity-70" />
                      </div>
                    )}

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <h4 className="font-bold text-xs sm:text-sm text-navy-950 dark:text-white line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {rPost.title}
                      </h4>
                      <span className="text-[10.5px] text-slate-400 block font-medium">
                        {new Date(rPost.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>
      <Footer />
    </>
  )
}


