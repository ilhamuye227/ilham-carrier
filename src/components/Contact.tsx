import { useRef, useState, FormEvent } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// All contact-form submissions are directed to these channels
const MY_EMAIL = "ilhamsupriadi447@gmail.com";
const MY_WHATSAPP_NUMBER = "6283182610143";
const WHATSAPP_URL = `https://wa.me/${MY_WHATSAPP_NUMBER}`;

const CONTACT_LINKS = [
  {
    name: MY_EMAIL,
    href: `mailto:${MY_EMAIL}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "#ff79c6",
  },
  {
    name: "+62 831 8261 0143",
    href: WHATSAPP_URL,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    color: "#50fa7b",
  },
  {
    name: "ilham-supriadi.edgeone.dev",
    href: "https://ilham-supriadi.edgeone.dev/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    color: "#bd93f9",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });

  // Parallax glow
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSending(true);
    // Open WhatsApp with the message pre-filled, addressed to MY_WHATSAPP_NUMBER
    const text = encodeURIComponent(
      `Hello Ilham! I'm ${form.name} (${form.email}).\n\n${form.message}`
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-6 relative overflow-hidden">
      <motion.div
        style={{
          y: glowY,
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(189,147,249,0.06) 0%, transparent 70%)",
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-purple-400 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>06.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f8f8f2]" style={{ fontFamily: "'Sora', sans-serif" }}>Contact</h2>
          <span className="flex-1 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3
              className="text-2xl font-semibold text-[#f8f8f2] mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Let's work together —{" "}
              <span style={{ color: "#bd93f9", textShadow: "0 0 16px rgba(189,147,249,0.4)" }}>get in touch</span>
            </h3>
            <p className="text-[#6272a4] leading-relaxed mb-6 text-base">
              I'm open to full-time roles and contract opportunities. Have a question or an offer?
              Feel free to reach out through any channel below — I respond quickly.
            </p>

            <p className="text-xs font-mono text-[#6272a4] tracking-wide mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              📍 West Bandung Regency, West Java, Indonesia
            </p>

            <div className="space-y-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group text-sm text-[#6272a4] hover:text-[#f8f8f2] transition-colors duration-200"
                  data-cursor-hover
                >
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: `${link.color}10`,
                      border: `1px solid ${link.color}20`,
                      color: link.color,
                    }}
                  >
                    {link.icon}
                  </span>
                  {link.name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {sent ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ background: "rgba(80,250,123,0.06)", border: "1px solid rgba(80,250,123,0.2)" }}
              >
                <div className="text-3xl mb-3">✓</div>
                <h4 className="text-[#50fa7b] font-semibold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Message sent!
                </h4>
                <p className="text-[#6272a4] text-sm">
                  WhatsApp will open in a new tab with your message pre-filled, addressed to{" "}
                  <span style={{ color: "#f8f8f2" }}>+62 831 8261 0143</span>.
                </p>                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs text-[#6272a4] hover:text-[#f8f8f2] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs font-mono text-[#6272a4] mb-2 tracking-wide"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={form[field.id as "name" | "email"]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#f8f8f2] placeholder:text-[#44475a] outline-none transition-all duration-200 focus:border-purple-500/60"
                      style={{
                        background: "rgba(30, 32, 48, 0.7)",
                        border: "1px solid rgba(189,147,249,0.15)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(189,147,249,0.2)")}
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-[#6272a4] mb-2 tracking-wide"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#f8f8f2] placeholder:text-[#44475a] outline-none resize-none transition-all duration-200"
                    style={{
                      background: "rgba(30, 32, 48, 0.7)",
                      border: "1px solid rgba(189,147,249,0.15)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(189,147,249,0.2)")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>

                {error && (
                  <p className="text-xs text-pink-400 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    ✗ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 relative overflow-hidden group disabled:opacity-70"
                  style={{
                    background: "linear-gradient(135deg, #bd93f9, #ff79c6)",
                    boxShadow: "0 0 24px rgba(189,147,249,0.3)",
                    fontFamily: "'Inter', sans-serif",
                    color: "#282a36",
                  }}
                  data-cursor-hover
                >
                  <span className="relative z-10">
                    {sending ? "Sending..." : "Send Message"}
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
