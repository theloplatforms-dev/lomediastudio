"use client";

// Loaded on demand the first time someone opens search, so it costs nothing on initial page load.
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Book, Video, PenTool, Mail, Camera, type LucideIcon } from "lucide-react";
import { allBlogPosts } from "@/data/blogs";

const services: { title: string; slug: string; icon: LucideIcon; category: string; shortDesc: string }[] = [
  { title: "Media Content Creation", slug: "media-content-creation", icon: PenTool, category: "Media Content Creation", shortDesc: "Drive engagement, build authority & convert your audience with strategic media content that performs." },
  { title: "Digital Marketing", slug: "digital-marketing", icon: ArrowRight, category: "Digital Marketing", shortDesc: "Data-driven digital marketing solutions designed to deliver measurable results and grow your brand." },
  { title: "Email Marketing", slug: "email-marketing", icon: Mail, category: "Email Marketing", shortDesc: "Build meaningful relationships with your audience through strategic, data-driven email campaigns." },
  { title: "Photography", slug: "photography", icon: Camera, category: "Photography", shortDesc: "Professional photography that captures your brand's essence and elevates your visual identity." },
  { title: "Storytelling", slug: "storytelling", icon: Book, category: "Storytelling", shortDesc: "Transform your message into meaningful stories that connect, inspire, and drive action." },
  { title: "Video Production", slug: "video-production", icon: Video, category: "Video Production", shortDesc: "Professional video content that captivates audiences and converts viewers into customers." },
  { title: "Visual Brand Development", slug: "visual-brand-development", icon: PenTool, category: "Visual Brand Development", shortDesc: "Create a powerful, strategic visual identity that positions your brand for visibility and growth." },
  { title: "Creative Direction", slug: "creative-direction", icon: ArrowRight, category: "Creative Direction", shortDesc: "Expert creative guidance to elevate your brand and ensure consistent, impactful messaging." },
];

interface SearchItem {
  title: string;
  href: string;
  type: "Blog Post" | "Service" | "Page";
  excerpt?: string;
  category?: string;
  date?: string;
  author?: string;
  image?: string;
  icon?: LucideIcon;
}

const allContent: SearchItem[] = [
  ...allBlogPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    type: "Blog Post" as const,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    author: post.author,
    image: post.image,
  })),
  ...services.map((service) => ({
    title: service.title,
    href: `/services/${service.slug}`,
    type: "Service" as const,
    excerpt: service.shortDesc,
    category: service.category,
    icon: service.icon,
  })),
  ...[
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Work", href: "/work" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
  ].map((p) => ({ ...p, type: "Page" as const })),
];

const typeStyles: Record<SearchItem["type"], string> = {
  "Blog Post": "bg-purple-100 text-purple-800",
  Service: "bg-blue-100 text-blue-800",
  Page: "bg-gray-100 text-gray-800",
};

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allContent
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.author?.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              aria-label="Search blogs, services and pages"
              placeholder="Search blogs, services, pages…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-12 py-5 text-black text-lg outline-none border-b border-gray-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {query.trim() === "" ? (
              <div className="p-8 text-center text-gray-600">
                <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" aria-hidden="true" />
                <p className="text-lg">Search blogs, services, and more</p>
                <p className="text-sm mt-1">Try searching for &quot;marketing&quot; or &quot;video&quot;</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {["Email Marketing", "Video Production", "Branding"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                <p className="text-lg">No results found for &quot;{query}&quot;</p>
                <p className="text-sm mt-1">Try different keywords</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {results.map((result) => (
                  <li key={result.href}>
                    <button
                      type="button"
                      onClick={() => go(result.href)}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50 transition group"
                    >
                      <div className="flex items-start gap-4">
                        {result.image && (
                          <Image
                            src={result.image}
                            alt=""
                            width={80}
                            height={80}
                            sizes="80px"
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        {!result.image && result.icon && (
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-purple-50 flex items-center justify-center">
                            <result.icon className="w-6 h-6 text-purple-600" aria-hidden="true" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-black font-medium group-hover:text-purple-700 transition line-clamp-1 mb-1">
                            {result.title}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
                            <span className={`px-2 py-0.5 rounded-full ${typeStyles[result.type]}`}>{result.type}</span>
                            {result.category && <span>• {result.category}</span>}
                            {result.date && <span>• {result.date}</span>}
                          </div>
                          {result.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-1">{result.excerpt}</p>}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600 flex justify-between items-center">
            <span>Press ESC to close</span>
            <span aria-live="polite">{results.length} results found</span>
          </div>
        </div>
      </div>
    </>
  );
}
