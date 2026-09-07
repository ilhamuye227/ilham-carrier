import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";

interface Certificate {
  title: string;
  issuer: string;
  period: string;
  url: string;
  accent: string;
}

const certificates: Certificate[] = [
  {
    title: "Basic Cyber Security",
    issuer: "Jagoan Cyber",
    period: "Feb 2026 — Present",
    url: "https://jagoansiber.codepolitan.com/certificate/CFD827489B",
    accent: "#ff79c6",
  },
  {
    title: "DevaHandal 2026",
    issuer: "Codepolitan",
    period: "Feb 2026 — Feb 2031",
    url: "https://app.codepolitan.com/certificate/3A5FF26947/dl",
    accent: "#bd93f9",
  },
  {
    title: "NanoConnect",
    issuer: "Codepolitan",
    period: "Feb 2026 — Feb 2029",
    url: "https://www.codepolitan.com/c/ZUNKQSX/",
    accent: "#8be9fd",
  },
  {
    title: "Bangun Website dengan AI Assist & Deploy di EdgeOne",
    issuer: "Codepolitan",
    period: "Jan 2026 — Jan 2029",
    url: "https://www.codepolitan.com/c/POZFGYD/",
    accent: "#50fa7b",
  },
  {
    title: "Literasi Financial",
    issuer: "Dicoding",
    period: "Jan 2026 — Jan 2029",
    url: "https://www.dicoding.com/certificates/L4PQ2NK8OZO1",
    accent: "#ffb86c",
  },
  {
    title: "JavaScript",
    issuer: "Dicoding",
    period: "Mar 2024 — Mar 2027",
    url: "https://www.dicoding.com/certificates/QLZ94M9EDP5D",
    accent: "#f1fa8c",
  },
  {
    title: "Front End Web Developer",
    issuer: "Dicoding",
    period: "Mar 2024 — Mar 2027",
    url: "https://www.dicoding.com/certificates/EYX40304WPDL",
    accent: "#bd93f9",
  },
];

function CertCard({ cert }: { cert: Certificate }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Scroll-scrubbed entrance: cards rise and tilt flat as they enter the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.45"],
  });
  const enterY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const enterOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const enterRotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ perspective: "1000px", y: enterY, opacity: enterOpacity, rotateX: enterRotateX }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className="group relative rounded-2xl overflow-hidden h-full"
        data-cursor-hover
        aria-label={cert.title}
      >
        {/* Border glow saat hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none z-10"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: `inset 0 0 0 1px ${cert.accent}50, 0 0 40px ${cert.accent}20`,
          }}
        />

        <div
          className="h-full p-6 flex flex-col"
          style={{
            background: "rgba(30, 32, 48, 0.7)",
            backdropFilter: "blur(12px)",
            border: `1px solid rgba(189,147,249,0.1)`,
            borderRadius: "1rem",
          }}
        >
          {/* Bar aksen atas */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)` }}
          />

          {/* Ikon + penerbit */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${cert.accent}15`,
                border: `1px solid ${cert.accent}25`,
                color: cert.accent,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <span
              className="text-xs font-mono tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: cert.accent }}
            >
              {cert.issuer}
            </span>
          </div>

          <h3
            className="text-base font-semibold text-[#f8f8f2] mb-2 leading-snug group-hover:text-white transition-colors"
            style={{ fontFamily: "'Sora', sans-serif", textShadow: hovered ? `0 0 20px ${cert.accent}40` : "none" }}
          >
            {cert.title}
          </h3>

          <p
            className="text-[10px] font-mono text-[#6272a4] mb-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {cert.period}
          </p>

          <a
            href={cert.url}
            className="flex items-center gap-1.5 text-xs font-medium text-[#f8f8f2] hover:text-white transition-colors mt-5 w-fit"
            target="_blank" rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Certificate
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });

  return (
    <section id="certificates" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f8f8f2]" style={{ fontFamily: "'Sora', sans-serif" }}>Certificates</h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
