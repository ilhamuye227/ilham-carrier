import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ilhamHvacVrv from "@/assets/ilham-hvac-vrv.jpeg";
import ilhamMekanikalAutomotivv from "@/assets/ilham-mekanikal-automotivv.jpeg";
import bookingOnlineService from "@/assets/booking-online-service.png";
import templateWedding from "@/assets/template-wedding.png";
import dinginMenggigil from "@/assets/dingin-menggigil.png";
import posingaing from "@/assets/posingaing.png";

interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  accent: string;
  Icon: React.ComponentType;
  image?: string;
  imagePosition?: string;
}

function CalendarIcon() {
  return (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </>
  );
}

function HeartIcon() {
  return (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  );
}

function CartIcon() {
  return (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>
  );
}

function SnowflakeIcon() {
  return (
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4" y1="7" x2="20" y2="17" />
      <line x1="20" y1="7" x2="4" y2="17" />
      <path d="M9 4l3 3 3-3" />
      <path d="M9 20l3-3 3 3" />
    </>
  );
}

function WindIcon() {
  return (
    <>
      <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
      <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
      <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
    </>
  );
}

function WrenchIcon() {
  return (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  );
}

const projects: Project[] = [
  {
    title: "Booking Online Service",
    description:
      "Web-based booking service that lets customers schedule appointments online with a simple and fast flow.",
    tags: ["React", "Tailwind CSS", "EdgeOne"],
    url: "https://booking-online-service.edgeone.dev/",
    accent: "#8be9fd",
    Icon: CalendarIcon,
    image: bookingOnlineService,
  },
  {
    title: "Template Wedding",
    description:
      "Elegant digital wedding invitation template with smooth animations, event details, and RSVP section.",
    tags: ["React", "Framer Motion", "EdgeOne"],
    url: "https://template-wedding.edgeone.dev/",
    accent: "#ff79c6",
    Icon: HeartIcon,
    image: templateWedding,
  },
  {
    title: "Dingin Mengigil",
    description:
      "Fun interactive web experience themed around freezing cold — playful UI experiments and animations.",
    tags: ["JavaScript", "CSS Animation", "EdgeOne"],
    url: "https://dingin-mengigil.edgeone.dev/",
    accent: "#bd93f9",
    Icon: SnowflakeIcon,
    image: dinginMenggigil,
  },
  {
    title: "Posingaing",
    description:
      "Smart POS cashier app for UMKM with fast checkout, product management, and sales tracking in one place.",
    tags: ["React", "Tailwind CSS", "Vercel"],
    url: "https://pos-ilham.vercel.app/",
    accent: "#50fa7b",
    Icon: CartIcon,
    image: posingaing,
  },
  {
    title: "HVAC & VRV",
    description:
      "Air conditioning and VRV system installation — professional HVAC work from planning to maintenance.",
    tags: ["HVAC", "VRV", "Instalasi"],
    url: "#projects",
    accent: "#8be9fd",
    Icon: WindIcon,
    image: ilhamHvacVrv,
    imagePosition: "top 15%",
  },
  {
    title: "Mekanikal Automotif",
    description:
      "Automotive mechanical service covering repair, maintenance, and restoration with reliable results.",
    tags: ["Automotif", "Mekanikal", "Servis"],
    url: "#projects",
    accent: "#ffb86c",
    Icon: WrenchIcon,
    image: ilhamMekanikalAutomotivv,
    imagePosition: "top 15%",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.45"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ y, opacity }}
      className="group relative rounded-2xl overflow-hidden block h-full"
      data-cursor-hover
      aria-label={project.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none z-10"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${project.accent}50, 0 0 40px ${project.accent}20`,
        }}
      />

      <div
        className="h-full p-6 flex flex-col transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: "rgba(30, 32, 48, 0.7)",
          backdropFilter: "blur(12px)",
          border: `1px solid rgba(189,147,249,0.1)`,
          borderRadius: "1rem",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Gambar project */}
        {project.image && (
          <div className="relative aspect-video mb-5 overflow-hidden rounded-xl border border-white/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: project.imagePosition || "center" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(30,32,48,0.6), transparent 55%)",
              }}
            />
          </div>
        )}

        {/* Icon sesuai judul project */}
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
          style={{
            background: `${project.accent}15`,
            border: `1px solid ${project.accent}25`,
            color: project.accent,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <project.Icon />
          </svg>
        </div>

        <h3
          className="text-lg font-semibold text-[#f8f8f2] mb-2 leading-snug"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-[#6272a4] leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-1 rounded-full"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: project.accent,
                background: `${project.accent}10`,
                border: `1px solid ${project.accent}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          className="flex items-center gap-1.5 text-xs font-medium text-[#f8f8f2] w-fit"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Visit Project
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span
            className="font-mono text-xs text-purple-400 tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            03.
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#f8f8f2]"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Projects
          </h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
