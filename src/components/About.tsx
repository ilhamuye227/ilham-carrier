import { motion, useInView, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import ilhamPhoto from "@/assets/ilham.jpg";

const skills = [
  { label: "IT Support", color: "#8be9fd" },
  { label: "Customer Service", color: "#bd93f9" },
  { label: "HVAC / AC", color: "#50fa7b" },
  { label: "Networking", color: "#ff79c6" },
  { label: "Linux", color: "#8be9fd" },
  { label: "Web Development", color: "#ffb86c" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const target = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) {
      count.set(0);
      return;
    }
    const controls = animate(count, target, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, count, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-2xl font-bold"
        style={{ fontFamily: "'Sora', sans-serif", color: "#bd93f9", textShadow: "0 0 20px rgba(189,147,249,0.4)" }}
      >
        {display}
      </motion.div>
      <div className="text-[10px] text-[#6272a4] uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
}

export default function About() {
  // Parallax: photo drifts up as the section scrolls through the viewport
  const photoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const blobY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section id="about" className="relative py-28 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Decorative parallax blob */}
      <motion.div
        style={{
          y: blobY,
          background: "radial-gradient(circle, rgba(255,121,198,0.05) 0%, transparent 70%)",
        }}
        className="absolute -right-24 top-24 w-96 h-96 rounded-full pointer-events-none"
      />

      <FadeIn>
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>01.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f8f8f2]" style={{ fontFamily: "'Sora', sans-serif" }}>About Me</h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Foto */}
        <FadeIn delay={0.1}>
          <motion.div ref={photoRef} style={{ y: photoY }} className="relative w-fit mx-auto md:mx-0">
            {/* Dekorasi sudut */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-purple-500/60" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-400/60" />

            <div
              className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #44475a 0%, #282a36 100%)",
                boxShadow: "0 0 40px rgba(189,147,249,0.15)",
                border: "1px solid rgba(189,147,249,0.2)",
              }}
            >
              <img
                src={ilhamPhoto}
                alt="Portrait of Ilham Supriadi"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(189,147,249,0.15) 0%, rgba(139,233,253,0.1) 100%)",
                }}
              />
            </div>

            {/* Badge status */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap"
              style={{
                background: "rgba(40, 42, 54, 0.9)",
                border: "1px solid rgba(80,250,123,0.3)",
                boxShadow: "0 0 16px rgba(80,250,123,0.15)",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#50fa7b",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </div>
          </motion.div>
        </FadeIn>

        {/* Teks */}
        <div className="space-y-6">
          <FadeIn delay={0.15}>
            <p className="text-[#6272a4] leading-relaxed text-base">
              Computer and Network Engineering (TKJ) graduate from{" "}
              <span className="text-[#f8f8f2] font-medium">SMKN 4 Padalarang</span> with solid
              skills in computer operations, administration, and customer service. Experienced in
              using computers to manage data and support day-to-day business operations.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-[#6272a4] leading-relaxed text-base">
              Known for being disciplined, honest, and responsible — equally effective working
              independently or as part of a team. Holds{" "}
              <span className="text-[#f8f8f2] font-medium">SIM A &amp; SIM C</span> driving licenses
              and is accustomed to operating company vehicles. Always eager to learn new things and
              contribute at full capacity in a fast-paced environment.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="pt-2">
              <p className="text-xs font-mono text-purple-400 tracking-widest mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {"// core strengths"}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="px-3 py-1 rounded-md text-xs font-mono font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: skill.color,
                      background: `${skill.color}12`,
                      border: `1px solid ${skill.color}30`,
                      boxShadow: `0 0 10px ${skill.color}10`,
                    }}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex gap-6 pt-2">
              {[
                { num: "3+", label: "Years Exp." },
                { num: "7", label: "Certificates" },
                { num: "5", label: "Companies" },
              ].map((stat) => (
                <StatCounter key={stat.label} value={stat.num} label={stat.label} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
