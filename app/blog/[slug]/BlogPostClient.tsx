"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Loader } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

interface Post {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  youtubeUrl?: string
  createdAt: string
}

function getYoutubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match?.[1] ?? null
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.post) setPost(data.post)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-20 bg-slate-50 dark:bg-navy-900 min-h-[60vh] flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
        </main>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-20 bg-slate-50 dark:bg-navy-900 min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-lg">Post not found.</p>
          <Link
            href="/blog"
            className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            Back to all posts
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const youtubeId = post.youtubeUrl ? getYoutubeId(post.youtubeUrl) : null

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 md:pt-28 bg-slate-50 dark:bg-navy-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Top navigation */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-4 py-2 rounded-full bg-slate-200/60 dark:bg-navy-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>

          {/* Title Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 dark:text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {post.author && (
                <span className="flex items-center gap-2 bg-brand-50 dark:bg-navy-800 px-3 py-1.5 rounded-full">
                  <img
                    src="/doctor.jpg"
                    alt={post.author}
                    className="w-5 h-5 rounded-full object-cover ring-2 ring-white dark:ring-navy-600"
                  />
                  <span className="font-medium text-navy-800 dark:text-slate-200">
                    {post.author}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Embedded YouTube Player OR Featured Image */}
          {youtubeId ? (
            <div className="mb-10 w-full rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : post.image ? (
            <div className="mb-10 w-full max-h-[500px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}

          {/* Decorative Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-navy-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-50 dark:bg-navy-900 px-4 text-xs uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 font-semibold">
                Article
              </span>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="bg-white dark:bg-navy-800 rounded-3xl border border-slate-200 dark:border-navy-700 shadow-xl p-6 sm:p-10 lg:p-12 mb-12">
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-navy-800 dark:prose-headings:text-white prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-img:rounded-2xl prose-img:shadow-xl prose-blockquote:border-l-brand-500 prose-blockquote:bg-brand-50/50 dark:prose-blockquote:bg-brand-900/20 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-code:text-brand-700 dark:prose-code:text-brand-300 prose-code:bg-slate-100 dark:prose-code:bg-navy-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Card */}
          {post.author && (
            <ScrollReveal>
              <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-navy-800 dark:to-navy-800 rounded-3xl border border-slate-200 dark:border-navy-700 shadow-lg p-6 sm:p-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <img
                    src="/doctor.jpg"
                    alt={post.author}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white dark:ring-navy-700 shadow-xl"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 font-semibold mb-1">
                      Written by
                    </p>
                    <h3 className="text-xl font-bold text-navy-800 dark:text-white">
                      {post.author}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Expert in Neuro Rehabilitation & Physiotherapy
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
          }
