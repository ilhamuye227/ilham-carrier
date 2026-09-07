import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  accent: string;
}

const jobs: Job[] = [
  {
    company: "Esembe Amreta Mulia",
    role: "HVAC Technician",
    period: "Apr 2026 — Present",
    description: "Diagnose, repair, and maintain indoor & outdoor AC units while applying strict workplace safety (K3) procedures on every job.",
    highlights: [
      "Diagnosed and repaired unit failures: no cooling, refrigerant leaks, excessive noise, and complete shutdowns",
      "Performed scheduled maintenance (AC cleaning), refrigerant recharge, and component replacement (compressor, capacitor, PCB, fan motor)",
      "Inspected electrical systems and piping/drainage; produced work documentation for every service",
      "Advised customers on unit condition and proper maintenance practices",
    ],
    accent: "#bd93f9",
  },
  {
    company: "Family Business",
    role: "Mobile Clothing Sales",
    period: "Feb 2026 — Mar 2026",
    description: "Supported mobile clothing sales operations using a pickup truck across residential areas and multiple locations.",
    highlights: [
      "Drove the pickup truck; handled loading/unloading and merchandising display for easy access during sales",
      "Sold products directly to customers and provided product information on site",
      "Ran routine stock checks and record-keeping; reported sales results and stock conditions regularly to the owner",
    ],
    accent: "#8be9fd",
  },
  {
    company: "GIP",
    role: "Telesales",
    period: "Oct 2024 — Jan 2026",
    description: "Drove phone-based sales and order confirmation workflows supported by online ordering systems.",
    highlights: [
      "Closed sales and confirmed customer orders over the phone",
      "Verified incoming order data from the website",
      "Managed end-to-end orders using FFM and Pancake POS systems",
    ],
    accent: "#50fa7b",
  },
  {
    company: "PT PPKM",
    role: "Administrative Staff",
    period: "May 2023 — Jul 2024",
    description: "Managed training participant administration from first outreach through final certification.",
    highlights: [
      "Ran WhatsApp broadcast campaigns to prospect databases",
      "Accompanied participants throughout training programs until certification",
      "Maintained participant records and administrative data",
    ],
    accent: "#ff79c6",
  },
  {
    company: "PT Wastama",
    role: "Network Technician",
    period: "Feb 2023 — Apr 2023",
    description: "Installed and maintained point-to-point network links, including tower climbing fieldwork.",
    highlights: [
      "Installed point-to-point network links including tower climbing work",
      "Monitored network performance and performed troubleshooting",
      "Prepared technical installation reports",
    ],
    accent: "#ffb86c",
  },
];

const education = {
  school: "SMKN 4 Padalarang",
  major: "Computer and Network Engineering (TKJ)",
  period: "Feb 2021 — Apr 2023",
  points: [
    "Hands-on LAN network installation practice",
    "Team projects and technical report writing",
    "Computer assembly and practice documentation",
  ],
};

function TimelineItem({ job }: { job: Job }) {
  const ref = useRef(null);

  // Scrubbed entrance: progress is tied directly to scroll position,
  // so items ease in/out as you scroll through the section.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.25, 1], [0, 1]);
  const dotScale = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      {/* Vertical line — grows downward with scroll */}
      <motion.div
        className="absolute left-[13px] top-8 bottom-0 w-px origin-top"
        style={{
          scaleY: lineScale,
          background: "linear-gradient(to bottom, rgba(189,147,249,0.3), rgba(189,147,249,0.05))",
        }}
      />

      {/* Dot — pops in as it enters view */}
      <motion.div
        className="timeline-dot absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          scale: dotScale,
          background: `${job.accent}15`,
          border: `1.5px solid ${job.accent}60`,
          boxShadow: `0 0 16px ${job.accent}30`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: job.accent, boxShadow: `0 0 8px ${job.accent}` }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="rounded-xl p-5 transition-all duration-300 hover:border-opacity-30"
        style={{
          background: "rgba(30, 32, 48, 0.5)",
          border: `1px solid rgba(189,147,249,0.08)`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
          <div>
            <h3
              className="font-semibold text-[#f8f8f2] text-base"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {job.role}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: job.accent }}
            >
              {job.company}
            </p>
          </div>
          <span
            className="text-xs font-mono text-[#6272a4] whitespace-nowrap mt-1 sm:mt-0.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {job.period}
          </span>
        </div>

        <p className="text-[#6272a4] text-sm leading-relaxed mb-3">{job.description}</p>

        <ul className="space-y-1.5">
          {job.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-[#6272a4]">
              <span style={{ color: job.accent, marginTop: "2px" }}>›</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });

  // Parallax glow
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  return (
    <section id="experience" className="py-28 px-6 relative overflow-hidden">
      <motion.div
        style={{
          y: glowY,
          background: "radial-gradient(circle, rgba(189,147,249,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>05.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f8f8f2]" style={{ fontFamily: "'Sora', sans-serif" }}>Experience</h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div>

        <div>
          {jobs.map((job) => (
            <TimelineItem key={job.company} job={job} />
          ))}
        </div>

        {/* Pendidikan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <p
            className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {"// education"}
          </p>
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(30, 32, 48, 0.5)",
              border: "1px solid rgba(139,233,253,0.12)",
              boxShadow: "0 0 24px rgba(139,233,253,0.05)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="font-semibold text-[#f8f8f2] text-base" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {education.school}
                </h3>
                <p className="text-sm font-medium text-cyan-400">{education.major}</p>
              </div>
              <span
                className="text-xs font-mono text-[#6272a4] whitespace-nowrap mt-1 sm:mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {education.period}
              </span>
            </div>
            <ul className="space-y-1.5">
              {education.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-[#6272a4]">
                  <span style={{ color: "#8be9fd", marginTop: "2px" }}>›</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
