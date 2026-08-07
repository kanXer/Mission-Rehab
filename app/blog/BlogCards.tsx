"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Loader, Search, ChevronDown } from "lucide-react"
import Header from "@/components/Header"
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

export default function BlogCards() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedCat, setSelectedCat] = useState("")
  const [sort, setSort] = useState<SortMode>("newest")

  useEffect(() => {
    Promise.all([
      fetch("/api/blog").then(r => r.json()),
      fetch("/api/categories").then(r => r.json()),
    ])
      .then(([blogData, catData]) => {
        if (blogData.posts) setPosts(blogData.posts)
        const catNames = (catData.categories || []).map((c: { name: string }) => c.name)
        setCategories(catNames)
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
      <Header />
      <main id="main-content" className="pt-0">
        <section className="pt-16 md:pt-28 pb-12 md:pb-20 bg-slate-50 dark:bg-navy-900 overflow-hidden relative min-h-[60vh]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-700/40" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-brand-100/20 dark:from-brand-900/20 to-accent-100/10 dark:to-accent-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-accent-100/20 dark:from-accent-900/20 to-brand-100/10 dark:to-brand-900/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-3">
                  Our Blog
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-800 dark:text-white mb-4">
                  Neuro Rehab{" "}
                  <span className="text-gradient">Insights</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                  Expert tips, recovery stories, and guidance from Dr. Devejya Srivastava on neuro rehabilitation and physiotherapy.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative max-w-md mx-auto mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts by title, author..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                {categories.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedCat("")}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        !selectedCat
                          ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-md"
                          : "bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-700 hover:border-brand-300 dark:hover:border-brand-600"
                      }`}>
                      All
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                          selectedCat === cat
                            ? "bg-gradient-to-r from-brand-600 to-accent-600 text-white border-transparent shadow-md"
                            : "bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-700 hover:border-brand-300 dark:hover:border-brand-600"
                        }`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortMode)}
                    className="appearance-none pl-4 pr-9 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="az">A–Z</option>
                    <option value="za">Z–A</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                </div>
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                <p className="text-lg">No posts yet. Coming soon!</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400">
                <p className="text-lg">No posts match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((post) => (
                  <ScrollReveal key={post._id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-navy-700 overflow-hidden hover:shadow-2xl hover:shadow-brand-100/30 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </div>
                        {post.category && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 text-white text-[10px] font-semibold uppercase tracking-wider mb-2 shadow-sm">
                            {post.category}
                          </span>
                        )}
                        <h2 className="text-lg font-bold text-navy-800 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          {post.author ? (
                            <div className="flex items-center gap-2">
                              <img
                                src="/doctor.jpg"
                                alt={post.author}
                                loading="lazy"
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {post.author}
                              </span>
                            </div>
                          ) : (
                            <div />
                          )}
                          <div className="flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
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
