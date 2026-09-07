import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => {
      ringRef.current?.classList.add("scale-150", "opacity-50");
    };
    const onLeave = () => {
      ringRef.current?.classList.remove("scale-150", "opacity-50");
    };

    document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-purple-400 z-[9999] pointer-events-none mix-blend-screen transition-none"
        style={{ boxShadow: "0 0 8px #bd93f9, 0 0 16px #bd93f9" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-400/60 z-[9998] pointer-events-none transition-all duration-200"
        style={{ boxShadow: "0 0 12px rgba(189,147,249,0.2)" }}
      />
    </>
  );
}
