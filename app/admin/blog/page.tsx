"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { FileText, Plus, Edit, Trash2, Loader, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ToastProvider"

interface Post {
  _id: string
  slug: string
  title: string
  createdAt: string
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  function fetchPosts() {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { if (data.posts) setPosts(data.posts) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { if (user) fetchPosts() }, [user])

  const filtered = posts.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()))

  async function deletePost(slug: string) {
    if (!confirm("Delete this post?")) return
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" })
    if (res.ok) { fetchPosts(); toast("Post deleted") }
  }

  if (authLoading) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-navy-800 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-600" /> Blog Posts
            </h1>
            <Link href="/admin/blog/new"
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all shrink-0">
              <Plus className="w-4 h-4" /> New Post
            </Link>
          </div>
          <input type="text" placeholder="Search by title..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full sm:max-w-xs mt-3 px-3 py-2 rounded-xl border border-slate-300 dark:border-navy-600 bg-slate-50 dark:bg-navy-900 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <p className="mb-4">No posts found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((post) => (
              <div key={post._id} className="bg-white dark:bg-navy-800 rounded-xl p-4 border border-slate-200 dark:border-navy-700 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-navy-800 dark:text-white text-sm">{post.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {post.slug} &middot; {new Date(post.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/blog/edit/${post.slug}`}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-700 text-slate-500 dark:text-slate-400 hover:text-brand-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button onClick={() => deletePost(post.slug)}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
