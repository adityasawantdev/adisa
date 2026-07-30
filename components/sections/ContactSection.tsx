"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Github, Instagram, Linkedin, Satellite, CheckCircle } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/adityasawant",
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/adityasawant",
    color: "#0077b5",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/adityasawant",
    color: "#e4405f",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:aditya@adisa.dev",
    color: "#00d4ff",
  },
];

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signalActive, setSignalActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSignalActive(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setSignalActive(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" ref={ref} className="section-base py-32">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-energy-blue text-sm tracking-[0.3em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Connect
          </span>
          <h2
            className="heading-section text-white mb-4"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Transmit Signal
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Ready to build something extraordinary? Send a signal through the cosmos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card glow-border p-8">
              {/* Satellite Animation */}
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  className="relative"
                  animate={signalActive ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: signalActive ? Infinity : 0 }}
                >
                  <Satellite className="w-12 h-12 text-energy-blue" />
                  {/* Signal waves */}
                  {signalActive && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-energy-blue/30"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border border-energy-blue/20"
                        animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </>
                  )}
                </motion.div>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle className="w-16 h-16 text-energy-blue mx-auto mb-4" />
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-space)" }}
                  >
                    Signal Received
                  </h3>
                  <p className="text-white/50">Your message has been transmitted successfully.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm text-white/50 mb-2"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-energy-blue/50 transition-colors"
                      placeholder="Your name"
                      style={{ fontFamily: "var(--font-space)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm text-white/50 mb-2"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-energy-blue/50 transition-colors"
                      placeholder="your@email.com"
                      style={{ fontFamily: "var(--font-space)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm text-white/50 mb-2"
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      Message
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-energy-blue/50 transition-colors resize-none"
                      placeholder="Your message..."
                      style={{ fontFamily: "var(--font-space)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full magnetic-btn justify-center gap-2 disabled:opacity-50"
                    data-hoverable
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Signal
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card glow-border p-8">
              <h3
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-space)" }}
              >
                Connect Across The Universe
              </h3>

              <div className="space-y-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                      whileHover={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: `${link.color}30`,
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      data-hoverable
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${link.color}15`,
                          border: `1px solid ${link.color}30`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      <div className="flex-1">
                        <span
                          className="text-white font-medium block"
                          style={{ fontFamily: "var(--font-space)" }}
                        >
                          {link.name}
                        </span>
                        <span className="text-white/30 text-sm">{link.url}</span>
                      </div>
                      <motion.div
                        className="text-white/20 group-hover:text-white/60 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quote */}
            <motion.div
              className="glass-card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <p className="text-white/40 text-lg italic leading-relaxed mb-4">
                "The future belongs to those who believe in the beauty of their dreams."
              </p>
              <p className="text-energy-blue text-sm" style={{ fontFamily: "var(--font-space)" }}>
                — Eleanor Roosevelt
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
