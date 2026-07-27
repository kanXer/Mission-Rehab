"use client"

import { useCallback, useRef, useState } from "react"
import { useEditor, EditorContent, type Editor as TiptapEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import LinkExtension from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, AlignLeft, AlignCenter, AlignRight, ImageIcon,
  Link, Unlink, Undo, Redo, Loader
} from "lucide-react"

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function Toolbar({ editor }: { editor: TiptapEditor }) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const addImage = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return
    setUploading(true)
    try {
      const sigRes = await fetch("/api/upload")
      const sig = await sigRes.json()
      if (!sig.signature) throw new Error("No signature")

      const fd = new FormData()
      fd.append("file", file)
      fd.append("api_key", sig.api_key)
      fd.append("timestamp", String(sig.timestamp))
      fd.append("signature", sig.signature)
      fd.append("folder", sig.folder)

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`,
        { method: "POST", body: fd }
      )
      const data = await uploadRes.json()
      if (!data.secure_url) throw new Error("Upload failed")

      editor.chain().focus().setImage({ src: data.secure_url }).run()
    } catch {
      alert("Image upload failed")
    } finally {
      setUploading(false)
    }
  }, [editor])

  const setLink = useCallback(() => {
    const url = prompt("Enter URL:")
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive("underline"), label: "Underline" },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), label: "Strikethrough" },
    { type: "divider" as const },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), label: "Heading 1" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading 2" },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }), label: "Heading 3" },
    { type: "divider" as const },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet List" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Ordered List" },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote"), label: "Blockquote" },
    { type: "divider" as const },
    { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign("left").run(), active: editor.isActive({ textAlign: "left" }), label: "Align Left" },
    { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign("center").run(), active: editor.isActive({ textAlign: "center" }), label: "Align Center" },
    { icon: AlignRight, action: () => editor.chain().focus().setTextAlign("right").run(), active: editor.isActive({ textAlign: "right" }), label: "Align Right" },
    { type: "divider" as const },
    { icon: ImageIcon, action: () => fileRef.current?.click(), active: false, label: "Image" },
    { icon: Link, action: setLink, active: editor.isActive("link"), label: "Link" },
    { icon: Unlink, action: () => editor.chain().focus().unsetLink().run(), active: false, label: "Unlink" },
    { type: "divider" as const },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, label: "Undo" },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, label: "Redo" },
  ]

  return (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) addImage(f); e.target.value = "" }} />
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-900 rounded-t-xl">
        {buttons.map((btn, i) =>
          "type" in btn && btn.type === "divider" ? (
            <div key={i} className="w-px h-6 bg-slate-200 dark:bg-navy-700 mx-1 my-auto" />
          ) : (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); (btn as any).action() }}
              className={`p-1.5 rounded-md transition-colors ${
                (btn as any).active
                  ? "bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
              title={(btn as any).label}
            >
              {uploading && (btn as any).label === "Image" ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <btn.icon size={16} />
              )}
            </button>
          )
        )}
      </div>
    </>
  )
}

export default function Editor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageExtension.configure({ inline: false }),
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder || "Start writing..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-slate-800 dark:text-slate-200",
      },
    },
  })

  if (!editor) return null

  return (
    <div className="border border-slate-300 dark:border-navy-600 rounded-xl overflow-hidden bg-white dark:bg-navy-800 shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
