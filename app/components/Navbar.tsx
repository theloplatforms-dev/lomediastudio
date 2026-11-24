"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

// Search UI and its data only download when search is first opened.
const SearchModal = dynamic(() => import("./SearchModal"), { ssr: false });

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      <nav aria-label="Main" className="nav-drop fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="relative backdrop-blur-xl bg-white/20 rounded-full shadow-2xl border border-white/30 px-4 py-2">
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              aria-label="LO Media Studio home"
              className="flex items-center text-xl md:text-2xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Image src="/logo.png" alt="" width={42} height={42} sizes="42px" className="inline-block mr-2" />
              Lo<span className="bg-gradient-to-r from-purple-900 to-red-600 bg-clip-text text-transparent">Media</span>Studio
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the site"
                className="px-3 py-2 rounded-full text-gray-700 hover:text-purple-700 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Search className="w-5 h-5" />
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group relative px-4 py-2 rounded-full font-medium text-black hover:text-purple-700 hover:bg-red-500/15 transition-all duration-300 hover:scale-105"
                >
                  {item.name}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-900 rounded-full scale-0 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-1 text-gray-700 hover:text-purple-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="nav-drop fixed top-24 left-4 right-4 z-40 md:hidden">
          <div className="backdrop-blur-2xl bg-white/90 rounded-2xl shadow-2xl border border-white/20 p-4">
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-900 transition-colors rounded-lg hover:bg-purple-50"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Search blogs &amp; services…
              </button>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="px-4 py-3 text-gray-700 hover:text-purple-900 hover:bg-red-50 hover:translate-x-2 transition-all rounded-lg"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {searchOpen && <SearchModal onClose={closeSearch} />}
    </>
  );
}
