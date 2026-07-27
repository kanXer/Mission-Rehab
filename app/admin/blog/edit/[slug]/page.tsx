"use client"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import Link from "next/link"
import { Loader, Save, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ToastProvider"
import Editor from "@/components/Editor"

interface Cat { _id: string; name: string }

export default function EditBlogPost() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [keywords, setKeywords] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams()
  const originalSlug = params.slug as string

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) router.push("/admin/login")
  }, [user, authLoading, router])

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(d => {
      if (d.categories) setCategories(d.categories.map((c: Cat) => c.name))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!user || !originalSlug) return
    fetch(`/api/blog/${originalSlug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.post) {
          setTitle(data.post.title)
          setSlug(data.post.slug)
          setExcerpt(data.post.excerpt || "")
          setContent(data.post.content || "")
          setImage(data.post.image || "")
          setYoutubeUrl(data.post.youtubeUrl || "")
          setCategory(data.post.category || "")
          setKeywords(data.post.keywords || "")
          setAuthor(data.post.author || "")
        }
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setFetching(false))
  }, [user, originalSlug])

  async function uploadImage(): Promise<string> {
    if (!imageFile) return image
    const sigRes = await fetch("/api/upload")
    const sig = await sigRes.json()
    if (!sig.signature) throw new Error("Failed to get upload signature")

    const fd = new FormData()
    fd.append("file", imageFile)
    fd.append("api_key", sig.api_key)
    fd.append("timestamp", String(sig.timestamp))
    fd.append("signature", sig.signature)
    fd.append("folder", sig.folder)

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`,
      { method: "POST", body: fd }
    )
    const uploadData = await uploadRes.json()
    if (!uploadData.secure_url) throw new Error("Upload failed")
    return uploadData.secure_url
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    let imgUrl = image
    if (imageFile) {
      setUploading(true)
      try {
        imgUrl = await uploadImage()
      } catch {
        setError("Image upload failed")
        setLoading(false)
        setUploading(false)
        return
      }
      setUploading(false)
    }

    const res = await fetch(`/api/blog/${originalSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, excerpt, content, image: imgUrl, youtubeUrl, category, keywords, author }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || "Failed to update"); return }
    toast("Post updated")
    router.push("/admin/blog")
  }

  if (authLoading || fetching) return <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex items-center justify-center"><Loader className="w-8 h-8 animate-spin text-brand-600" /></div>
  if (!user || !user.isAdmin) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-navy-800 dark:text-white mb-6">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-slate-200 dark:border-navy-700 shadow-xl space-y-4">
          {error && <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Slug</label>
              <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Excerpt</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Dr. Devejya Srivastava"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Cover Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-brand-50 dark:file:bg-brand-900/30 file:text-brand-700 dark:file:text-brand-300 file:font-semibold file:cursor-pointer" />
              {image && <p className="text-xs text-slate-400 mt-1 truncate">Current: {image}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">YouTube URL</label>
              <input type="url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-800 dark:text-white mb-1">Keywords</label>
              <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="comma, separated, keywords"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-navy-600 bg-white dark:bg-navy-800 text-navy-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-800 dark:text-white mb-2">Content</label>
            <Editor value={content} onChange={setContent} placeholder="Edit your blog post content..." />
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60">
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : uploading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {uploading ? "Uploading image..." : loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  )
}
