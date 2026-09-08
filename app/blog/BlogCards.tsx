"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Loader, Search, ChevronDown, Clock, BookOpen, ShieldCheck } from "lucide-react"
import Header from "@/components/Header"
import TopBar from "@/components/TopBar"
import Footer from "@/components/Footer"
import ScrollReveal from "@/components/ScrollReveal"

interface Post {
  _id: string
  slug: string
  title: string
  excerpt: string
  image: string
  author: string
  category: string
  createdAt: string
}

type SortMode = "newest" | "oldest" | "az" | "za"

interface BlogCardsProps {
  initialPosts?: Post[]
  initialCategories?: string[]
}

export default function BlogCards({ initialPosts = [], initialCategories = [] }: BlogCardsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [loading, setLoading] = useState<boolean>(initialPosts.length === 0)
  const [search, setSearch] = useState("")
  const [selectedCat, setSelectedCat] = useState("")
  const [sort, setSort] = useState<SortMode>("newest")

  useEffect(() => {
    Promise.all([
      fetch("/api/blog").then(r => r.json()),
      fetch("/api/categories").then(r => r.json()),
    ])
      .then(([blogData, catData]) => {
        if (blogData.posts && Array.isArray(blogData.posts) && blogData.posts.length > 0) {
          setPosts(blogData.posts)
        }
        if (catData.categories && Array.isArray(catData.categories) && catData.categories.length > 0) {
          const catNames = catData.categories.map((c: { name: string }) => c.name)
          setCategories(catNames)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = posts
    .filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
          !p.excerpt.toLowerCase().includes(search.toLowerCase()) &&
          !(p.author && p.author.toLowerCase().includes(search.toLowerCase()))) {
        return false
      }
      if (selectedCat && p.category !== selectedCat) return false
      return true
    })
    .sort((a, b) => {
      switch (sort) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "az": return a.title.localeCompare(b.title)
        case "za": return b.title.localeCompare(a.title)
        default: return 0
      }
    })

  return (
    <>
      <TopBar />
      <Header />
      <main id="main-content" className="pt-0 min-h-screen bg-slate-50/60 dark:bg-navy-950">
        <section className="pt-12 md:pt-20 pb-16 md:pb-24 overflow-hidden relative">
          {/* Ambient Glow Lights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-96 bg-gradient-to-r from-brand-400/10 via-accent-400/10 to-brand-400/5 blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800/60 mb-3 shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                  Clinical Knowledge Base
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-navy-950 dark:text-white tracking-tight mb-4 leading-tight">
                  Neuro Rehabilitation{" "}
                  <span className="text-gradient">Insights</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  Evidence-based recovery guides, patient care strategies, and clinical insights from <strong>Dr. Devejya Srivastava (PT)</strong>, Divyaman Hospital, Gorakhpur.
                </p>
              </div>
            </ScrollReveal>

            {/* Search and Category Filter Toolbar */}
            <ScrollReveal>
              <div className="max-w-4xl mx-auto space-y-4 mb-12">
                <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search guides by condition, topic, or keyword..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-navy-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs transition-shadow"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setSelectedCat("")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      !selectedCat
                        ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-md shadow-brand-600/20"
                        : "bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-700 hover:border-brand-400"
                    }`}
                  >
                    All Topics ({posts.length})
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                        selectedCat === cat
                          ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-md shadow-brand-600/20"
                          : "bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-700 hover:border-brand-400"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                  <div className="relative ml-1">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortMode)}
                      className="appearance-none pl-3.5 pr-8 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="az">A–Z</option>
                      <option value="za">Z–A</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
                <p className="text-xs text-slate-400 font-medium">Loading clinical insights...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                <p className="text-base font-semibold">No articles published yet. Stay tuned!</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400 space-y-2">
                <p className="text-base font-bold text-navy-900 dark:text-white">No articles matched your search.</p>
                <p className="text-xs">Try searching for &quot;Stroke&quot;, &quot;Paralysis&quot;, or clearing the filters.</p>
                <button
                  onClick={() => { setSearch(""); setSelectedCat("") }}
                  className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-navy-800 dark:text-brand-400 transition-colors"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((post) => (
                  <ScrollReveal key={post._id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-white dark:bg-navy-900 rounded-3xl border border-slate-200/90 dark:border-navy-800 overflow-hidden hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1.5 transition-all duration-300"
                    >
                      {/* Image Thumbnail */}
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-navy-800 relative">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-600 via-brand-700 to-accent-600 flex items-center justify-center text-white">
                            <BookOpen className="w-10 h-10 opacity-70" />
                          </div>
                        )}

                        {post.category && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-navy-950/80 text-white backdrop-blur-md border border-white/20 shadow-xs">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Details */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-brand-500" />
                              Guide
                            </span>
                          </div>

                          <h2 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h2>

                          {post.excerpt && (
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Doctor Byline Footer */}
                        <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src="/doctor.jpg"
                              alt={post.author || "Dr. Devejya Srivastava (PT)"}
                              className="w-6 h-6 rounded-full object-cover ring-1 ring-brand-500/30"
                            />
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold truncate max-w-[130px]">
                              {post.author || "Dr. Devejya"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:gap-1.5 transition-all">
                            <span>Read Guide</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

