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
    role: "Air-Conditioner Technician",
    period: "Apr 2026 — Sep 2026",
    description: "Diagnose and repair indoor & outdoor AC unit failures while prioritizing workplace safety (K3) and clean documentation on every field job.",
    highlights: [
      "Diagnosed and resolved a wide range of AC faults — no cooling, refrigerant leaks, excessive noise, and complete shutdowns — quickly and efficiently",
      "Performed routine cleaning service, refrigerant recharge, and replacement of critical components, including electrical and drainage systems",
      "Applied strict K3 safety procedures on every field job with neat, consistent work documentation",
      "Advised customers on unit condition and provided maintenance consultation for long-term reliability",
    ],
    accent: "#bd93f9",
  },
  {
    company: "GIP",
    role: "Telesales Specialist",
    period: "Oct 2024 — Jan 2026",
    description: "Telesales specialist handling sales, confirmation, and closing of orders over the phone with a focus on transaction accuracy and customer satisfaction.",
    highlights: [
      "Sales, confirmation, and closing of customer orders via phone",
      "Verified website order data and managed end-to-end order flow in FFM and Pancake POS systems",
      "Focused on transaction accuracy and customer satisfaction",
    ],
    accent: "#50fa7b",
  },
  {
    company: "PT PPKM",
    role: "Training Coordinator",
    period: "May 2023 — Jul 2024",
    description: "Training coordinator managing participant recruitment through WhatsApp outreach, mentoring, and full administrative support until certification.",
    highlights: [
      "Ran WhatsApp broadcast campaigns to recruit training participants",
      "Provided full support and mentoring to participants through to certification",
      "Handled administration, data management, and accurate training documentation",
    ],
    accent: "#ff79c6",
  },
  {
    company: "PT Wastama",
    role: "Network Technician",
    period: "Feb 2023 — Apr 2023",
    description: "Network technician installing point-to-point links with tower climbing expertise and proactive monitoring and troubleshooting.",
    highlights: [
      "Installed point-to-point network links including tower climbing fieldwork",
      "Performed real-time monitoring and rapid troubleshooting to maintain system reliability",
      "Produced complete technical documentation while maintaining K3 compliance standards",
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
