import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
  color: string;
  level: number;
}

const skillGroups: { label: string; skills: Skill[] }[] = [
  {
    label: "Technology & IT",
    skills: [
      { name: "IT Technical Support", icon: "🛠", color: "#8be9fd", level: 85 },
      { name: "Linux", icon: "🐧", color: "#bd93f9", level: 75 },
      { name: "Web Development", icon: "</>", color: "#50fa7b", level: 78 },
      { name: "Microsoft Office", icon: "📄", color: "#ff79c6", level: 88 },
      { name: "CRM (FFM · Pancake POS)", icon: "▤", color: "#ffb86c", level: 85 },
    ],
  },
  {
    label: "Field & Technical",
    skills: [
      { name: "HVAC / AC Technician", icon: "❄", color: "#8be9fd", level: 88 },
      { name: "Copper Welding", icon: "🔥", color: "#ff5555", level: 85 },
      { name: "Network Installation", icon: "⇌", color: "#bd93f9", level: 80 },
      { name: "Troubleshooting", icon: "⚡", color: "#50fa7b", level: 85 },
      { name: "Workplace Safety (K3)", icon: "⚠", color: "#f1fa8c", level: 90 },
      { name: "Driving (SIM A & C)", icon: "⛟", color: "#ff79c6", level: 90 },
    ],
  },
  {
    label: "Soft Skills",
    skills: [
      { name: "Customer Service", icon: "☎", color: "#bd93f9", level: 92 },
      { name: "Communication", icon: "◈", color: "#8be9fd", level: 88 },
      { name: "Teamwork", icon: "⧉", color: "#50fa7b", level: 90 },
    ],
  },
];

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-4 rounded-xl transition-all duration-300"
      style={{
        background: "rgba(30, 32, 48, 0.5)",
        border: "1px solid rgba(189,147,249,0.08)",
      }}
      whileHover={{
        scale: 1.04,
        borderColor: `${skill.color}40`,
        boxShadow: `0 0 24px ${skill.color}20`,
      }}
      data-cursor-hover
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-mono font-bold mb-3 transition-all duration-300"
        style={{
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}25`,
          color: skill.color,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <span style={{ fontSize: skill.icon.length > 2 ? "0.65rem" : "1rem" }}>{skill.icon}</span>
      </div>

      {/* Name */}
      <p className="text-[#f8f8f2] text-sm font-medium mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
        {skill.name}
      </p>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-[#44475a]/40 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: "0%" }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
            boxShadow: `0 0 6px ${skill.color}60`,
          }}
        />
      </div>
      <p className="text-[10px] text-[#6272a4] mt-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {skill.level}%
      </p>
    </motion.div>
  );
}

function SkillGroup({
  group,
  index,
}: {
  group: { label: string; skills: Skill[] };
  index: number;
}) {
  const ref = useRef(null);

  // Layered scroll parallax — deeper groups start further away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60 + index * 35, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      <p
        className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {"// "}{group.label}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {group.skills.map((skill, si) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            delay={index * 0.05 + si * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });

  // Parallax glow
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [140, -140]);

  return (
    <section ref={sectionRef} id="skills" className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        style={{
          y: glowY,
          background: "radial-gradient(circle, rgba(139,233,253,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>04.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f8f8f2]" style={{ fontFamily: "'Sora', sans-serif" }}>Skills</h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div>

        <div className="space-y-12">
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.label} group={group} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}
