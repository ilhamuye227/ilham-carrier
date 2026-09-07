import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const headerOffset = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#282a36]/80 backdrop-blur-xl border-b border-purple-900/20"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-semibold text-purple-300 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: "0 0 12px rgba(189,147,249,0.4)" }}
        >
          {"<Ilham />"}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm text-[#6272a4] hover:text-[#f8f8f2] transition-colors duration-200 font-medium relative group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/6283182610143"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full text-sm font-medium text-purple-300 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-200"
              style={{ boxShadow: "0 0 16px rgba(189,147,249,0.1)" }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col items-center gap-1.5 p-3 -mr-2 active:bg-purple-500/10 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 bg-[#f8f8f2] transition-all duration-300 ${
                i === 0 ? (menuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5") :
                i === 1 ? (menuOpen ? "opacity-0 w-5" : "w-4") :
                (menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-3")
              }`}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-purple-900/20"
            style={{ background: "rgba(30, 32, 48, 0.98)" }}
          >
            <ul className="flex flex-col py-4 px-6 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[#6272a4] active:text-[#bd93f9] text-base font-medium py-3 px-2 -mx-2 rounded-lg active:bg-purple-500/10 transition-colors duration-200"
                    style={{ touchAction: "manipulation" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/6283182610143"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center mt-2 px-4 py-2.5 rounded-full text-sm font-medium text-purple-300 border border-purple-500/40 active:bg-purple-500/10 transition-all duration-200"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
