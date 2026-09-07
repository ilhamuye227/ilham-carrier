import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";

interface Particle {
  x: number; y: number; size: number; color: string;
  vx: number; vy: number; life: number; maxLife: number;
}

const NEON_COLORS = ["#bd93f9", "#ff79c6", "#8be9fd", "#50fa7b"];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based parallax layers (content, orb & background move at different speeds)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const orbScrollY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const orbX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const ring1X = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const ring1Y = useTransform(springY, [-0.5, 0.5], [15, -15]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const r = 60 + Math.random() * 40;
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;
      particlesRef.current.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        size: 1 + Math.random() * 2.5,
        color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.5 - Math.random() * 1.2,
        life: 0,
        maxLife: 80 + Math.random() * 80,
      });
    };

    let frame = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      if (frame % 4 === 0) spawnParticle();
      frame++;

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      for (const p of particlesRef.current) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        const alpha = t < 0.1 ? t / 0.1 : t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
        ctx.save();
        ctx.globalAlpha = alpha * 0.8;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background noise/grid — slowest layer */}
      <motion.div
        className="absolute -inset-y-24 inset-x-0 opacity-[0.03]"
        style={{
          y: gridY,
          backgroundImage: `linear-gradient(rgba(189,147,249,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(189,147,249,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow bg */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(189,147,249,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating 3D orb group — scroll layer wraps mouse-parallax layer */}
      <motion.div style={{ y: orbScrollY, scale: orbScale }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none"
        animate={{ y: ["-20px", "20px", "-20px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-16 rounded-full border border-purple-500/10"
          style={{
            x: ring1X,
            y: ring1Y,
            background: "radial-gradient(circle, transparent 40%, rgba(189,147,249,0.03) 100%)",
          }}
        />

        {/* Main orb */}
        <div
          className="w-48 h-48 md:w-72 md:h-72 rounded-full relative"
          style={{
            background: "radial-gradient(circle at 35% 35%, rgba(139,233,253,0.5) 0%, rgba(189,147,249,0.6) 40%, rgba(255,121,198,0.3) 70%, transparent 100%)",
            boxShadow: "0 0 60px rgba(189,147,249,0.4), 0 0 120px rgba(189,147,249,0.15), 0 0 200px rgba(139,233,253,0.08), inset 0 0 40px rgba(255,255,255,0.05)",
            filter: "blur(1px)",
          }}
        />

        {/* Inner bright core */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(139,233,253,0.6) 40%, transparent 70%)",
            boxShadow: "0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(139,233,253,0.3)",
          }}
        />

        {/* Orbit ring */}
        <motion.div
          className="absolute -inset-8 rounded-full border border-cyan-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ borderStyle: "dashed" }}
        />
        {/* Orbit dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-cyan-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            top: "calc(50% - 40px)",
            left: "50%",
            transformOrigin: "0 40px",
            boxShadow: "0 0 8px #8be9fd",
          }}
        />
      </motion.div>
      </motion.div>

      {/* Hero text — fastest layer */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase font-mono text-purple-400 mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: "0 0 12px rgba(189,147,249,0.4)" }}
        >
          {"// hello, world —"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          <span className="text-[#f8f8f2]">Ilham</span>{" "}
          <span
            className="gradient-text"
            style={{
              background: "linear-gradient(135deg, #bd93f9 0%, #ff79c6 50%, #8be9fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Supriadi
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
          <p
            className="text-[#6272a4] text-base md:text-lg font-mono tracking-wide"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            IT Support{" "}
            <span className="text-pink-400">&</span>{" "}
            Network Technician
          </p>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="text-[#6272a4] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Computer &amp; Network Engineering graduate with hands-on experience across IT
          support, administration, customer service, and field technical work — disciplined,
          dependable, and ready to deliver from day one.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#experience"
            onClick={(e) => { e.preventDefault(); document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative px-8 py-3.5 rounded-full font-medium text-sm overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #bd93f9, #ff79c6)",
              boxShadow: "0 0 30px rgba(189,147,249,0.35)",
              fontFamily: "'Inter', sans-serif",
              color: "#282a36",
            }}
          >
            <span className="relative z-10">View My Experience</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3.5 rounded-full font-medium text-sm border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Scroll indicator — fades out almost immediately */}
        <motion.div style={{ opacity: hintOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#6272a4] font-mono">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-purple-500/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
