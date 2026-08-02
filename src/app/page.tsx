"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu, X, ChevronDown, Sparkles, Globe, Moon, Sun,
  ArrowRight, Play, BookOpen, Users, BarChart3, Brain,
  Shield, Zap, Award, MessageSquare, Calendar, CreditCard,
  GraduationCap, Building2, Star, Check, ChevronRight,
  ChevronUp, Mail, GitBranch, Share2,
  Layers, Settings, Bell, Search, Target, TrendingUp,
  FileText, Video, Clock, MapPin, Phone
} from "lucide-react";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
const navItems = [
  {
    label: "Features",
    megaMenu: [
      { icon: Brain, label: "AI Tutor", desc: "Personalized AI learning assistant" },
      { icon: BarChart3, label: "Analytics", desc: "Deep learning insights & reports" },
      { icon: Users, label: "Student Portal", desc: "Complete student management" },
      { icon: BookOpen, label: "Course Builder", desc: "AI-powered curriculum tools" },
      { icon: Shield, label: "Admin Suite", desc: "Institution-grade control center" },
      { icon: Zap, label: "Automation", desc: "Smart workflows & triggers" },
    ],
  },
  {
    label: "Solutions",
    megaMenu: [
      { icon: Building2, label: "K-12 Schools", desc: "Complete school management" },
      { icon: GraduationCap, label: "Universities", desc: "Higher education platform" },
      { icon: Award, label: "Training Centers", desc: "Professional development LMS" },
      { icon: Globe, label: "Online Academies", desc: "Virtual learning environments" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    megaMenu: [
      { icon: FileText, label: "Documentation", desc: "API & integration guides" },
      { icon: Video, label: "Video Tutorials", desc: "Step-by-step walkthroughs" },
      { icon: MessageSquare, label: "Blog", desc: "EdTech insights & news" },
      { icon: Users, label: "Community", desc: "Join 50,000+ educators" },
    ],
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-lg" : "bg-transparent"
      }`}
      style={{ height: "var(--topbar-height)" }}
    >
      <div className="container-wide h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
            style={{ boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)" }}
          >
            <span className="text-white font-bold text-lg font-mono">N</span>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-[var(--text-primary)] leading-none">
              EduNova
            </span>
            <span
              className="gradient-text font-bold text-lg leading-none"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {" "}AI
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.megaMenu && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-all"
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-all">
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>
              )}

              {/* Mega Menu */}
              {item.megaMenu && activeMenu === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] card-static p-4 rounded-2xl shadow-xl animate-fade-down">
                  <div className="grid grid-cols-2 gap-1">
                    {item.megaMenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href="#"
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-subtle)] transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[rgba(37,99,235,0.08)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(37,99,235,0.12)] transition-colors">
                          <sub.icon size={18} className="text-[var(--brand-primary)]" />
                        </div>
                        <div>
                          <p className="text-sm font-600 text-[var(--text-primary)] font-semibold">{sub.label}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-all"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link
            href="/auth/login"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-lg transition-all"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="btn btn-gradient btn-sm"
          >
            Start Free Trial
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--bg-subtle)] transition-all"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass-nav border-t border-[var(--border-subtle)] p-4 animate-fade-down">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href || "#"}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-all"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <Link href="/auth/login" className="btn btn-outline w-full">Sign In</Link>
            <Link href="/auth/register" className="btn btn-gradient w-full">Start Free Trial</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg-page)]">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <ParticleField />

      {/* Gradient blobs */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7C3AED, #2563EB)",
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: "transform 0.3s ease",
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2563EB, #22C55E)",
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 0.3s ease",
        }}
      />

      <div className="container-wide relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-[var(--border-subtle)] text-sm font-medium text-[var(--brand-primary)]">
              <Sparkles size={14} className="animate-pulse" />
              Introducing EduNova AI 2.0 — Now with GPT-4o
              <ChevronRight size={14} />
            </div>

            {/* Headline */}
            <h1 className="display-xl text-[var(--text-primary)] mb-6">
              Transform{" "}
              <span className="gradient-text">Education</span>
              <br />
              with the Power of AI
            </h1>

            {/* Subheadline */}
            <p className="body-lg text-[var(--text-secondary)] mb-10 max-w-xl leading-relaxed">
              EduNova AI is the all-in-one intelligent platform designed for schools,
              colleges, universities, and training institutes. Automate administration.
              Personalize learning. Unlock insights.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/auth/register"
                className="btn btn-gradient btn-lg group"
              >
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#demo"
                className="btn btn-outline btn-lg"
              >
                Book a Demo
              </Link>
              <button className="btn btn-ghost btn-lg gap-2 text-[var(--text-secondary)]">
                <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center shadow-md flex-shrink-0">
                  <Play size={14} className="text-white ml-0.5" />
                </div>
                Watch 2-min Video
              </button>
            </div>

            {/* Stats pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Satisfaction Rate", value: "98%" },
                { label: "Institutions", value: "10K+" },
                { label: "Students Worldwide", value: "50M+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border-subtle)]"
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse-ring" style={{ background: "#22C55E" }} />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{stat.value}</span>
                  <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div
            className="relative animate-fade-up delay-200 hidden lg:block"
            style={{ animationDelay: "200ms" }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)" }}
            />

            {/* Main dashboard card */}
            <div
              className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl animate-float"
              style={{
                background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
                transform: `perspective(1000px) rotateY(${(mousePos.x - 0.5) * -6}deg) rotateX(${(mousePos.y - 0.5) * 4}deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#E2E8F0] border-b border-[#CBD5E1]">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-[var(--text-muted)] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full gradient-hero" />
                  app.edunova.ai/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-5">
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Good morning</p>
                    <p className="font-semibold text-[var(--text-primary)]">Sarah Johnson 👋</p>
                  </div>
                  <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold">
                    SJ
                  </div>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: "Courses", value: "8", color: "#2563EB" },
                    { label: "Assignments", value: "3", color: "#F59E0B" },
                    { label: "AI Score", value: "94%", color: "#22C55E" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white rounded-xl p-3 border border-[#E2E8F0]">
                      <p className="text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                      <p className="text-xs text-[var(--text-muted)]">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] mb-2">
                  <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Course Progress</p>
                  {[
                    { name: "Advanced Mathematics", progress: 78, color: "#2563EB" },
                    { name: "Computer Science", progress: 65, color: "#7C3AED" },
                    { name: "Physics", progress: 92, color: "#22C55E" },
                  ].map((c) => (
                    <div key={c.name} className="mb-2 last:mb-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--text-secondary)]">{c.name}</span>
                        <span className="font-medium" style={{ color: c.color }}>{c.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#F1F5F9] rounded-full">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${c.progress}%`, background: c.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Tutor prompt */}
                <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
                    <Brain size={14} className="text-white" />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] flex-1">Ask AI Tutor anything...</p>
                  <Sparkles size={14} className="text-[var(--brand-primary)]" />
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-3 shadow-lg border border-[var(--border-subtle)] animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
                  <TrendingUp size={16} className="text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">+23%</p>
                  <p className="text-xs text-[var(--text-muted)]">This month</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border border-[var(--border-subtle)] animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                  <Brain size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">AI Tutor</p>
                  <p className="text-xs text-[#22C55E]">● Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1000ms" }}>
        <p className="text-xs text-[var(--text-muted)]">Scroll to explore</p>
        <div className="w-6 h-10 rounded-full border-2 border-[var(--border-medium)] flex items-start justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ──────────────────────────────────────────────────────────────
const logos = [
  "Stanford University", "MIT", "Oxford", "Harvard", "Cambridge",
  "Yale University", "Princeton", "Columbia", "UC Berkeley", "NYU",
];

function SocialProofBar() {
  return (
    <section className="py-12 border-y border-[var(--border-subtle)] bg-[var(--bg-subtle)] overflow-hidden">
      <div className="container-normal mb-6 text-center">
        <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider label">
          Trusted by 10,000+ educational institutions worldwide
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-12 animate-[scroll_20s_linear_infinite]" style={{
          animation: "scroll 20s linear infinite",
          width: "max-content",
        }}>
          {[...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-lg gradient-hero flex items-center justify-center">
                <GraduationCap size={12} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">{name}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────────
const stats = [
  { value: 50, suffix: "M+", label: "Students Enrolled", desc: "Across all platforms", icon: Users, color: "#2563EB" },
  { value: 10, suffix: "K+", label: "Institutions", desc: "Schools, colleges & universities", icon: Building2, color: "#7C3AED" },
  { value: 150, suffix: "+", label: "Countries", desc: "Global reach and impact", icon: Globe, color: "#22C55E" },
  { value: 99, suffix: ".9%", label: "Uptime SLA", desc: "Enterprise reliability", icon: Shield, color: "#F59E0B" },
];

function StatsSection() {
  return (
    <section className="section-padding bg-[var(--bg-page)]">
      <div className="container-normal">
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">Platform Scale</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            Numbers That Speak for Themselves
          </h2>
          <p className="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            EduNova AI is trusted by millions of students and thousands of institutions
            across every corner of the globe.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card text-center group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <p className="text-4xl font-bold font-display mb-1" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-semibold text-[var(--text-primary)] mb-1">{stat.label}</p>
              <p className="text-sm text-[var(--text-muted)]">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Grid ─────────────────────────────────────────────────────────────
const features = [
  { icon: Brain, label: "AI Tutor", desc: "Personalized AI that adapts to each student's learning style and pace.", gradient: "from-blue-500 to-violet-600", featured: true },
  { icon: BarChart3, label: "Predictive Analytics", desc: "ML-powered insights to identify at-risk students before it's too late.", gradient: "from-violet-500 to-pink-500", featured: true },
  { icon: Zap, label: "Smart Admissions", desc: "AI-scored applications with automated pipeline and admission letters.", gradient: "from-green-400 to-cyan-500", featured: true },
  { icon: BookOpen, label: "Course Builder", desc: "Drag-and-drop curriculum builder with video, quizzes, and live classes.", gradient: "from-orange-400 to-red-500", featured: false },
  { icon: Users, label: "Student Information System", desc: "Complete student profiles, academic history, and communication logs.", gradient: "from-blue-400 to-cyan-500", featured: false },
  { icon: CreditCard, label: "Finance & Billing", desc: "Fee collection, invoicing, scholarships, and payroll in one place.", gradient: "from-green-500 to-emerald-600", featured: false },
  { icon: Calendar, label: "Smart Scheduling", desc: "AI-powered timetable builder with conflict detection.", gradient: "from-purple-500 to-indigo-600", featured: false },
  { icon: MessageSquare, label: "Communication Hub", desc: "SMS, email, push, and in-app messaging with delivery analytics.", gradient: "from-pink-500 to-rose-500", featured: false },
  { icon: Shield, label: "Enterprise Security", desc: "RBAC, 2FA, audit logs, and GDPR-compliant data handling.", gradient: "from-slate-500 to-gray-700", featured: false },
  { icon: Globe, label: "Multi-language", desc: "5 languages with full RTL support for Arabic and Urdu.", gradient: "from-teal-500 to-cyan-600", featured: false },
  { icon: Layers, label: "Multi-tenancy", desc: "Custom subdomains and branding for every institution.", gradient: "from-amber-400 to-orange-500", featured: false },
  { icon: Target, label: "Learning Goals", desc: "Set, track, and celebrate student achievement milestones.", gradient: "from-red-400 to-pink-500", featured: false },
];

function FeaturesGrid() {
  return (
    <section className="section-padding bg-[var(--bg-subtle)]" id="features">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">Platform Features</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            Everything Your Institution Needs
            <br />
            <span className="gradient-text">In One Platform</span>
          </h2>
          <p className="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            From admissions to graduation — every workflow, every role, every insight
            unified in a single intelligent platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.label}
              className={`card p-6 group cursor-pointer ${
                feature.featured ? "ring-2 ring-[rgba(37,99,235,0.15)]" : ""
              }`}
            >
              {feature.featured && (
                <div className="mb-3">
                  <span className="badge badge-blue text-xs">AI-Powered</span>
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
              >
                <feature.icon size={22} className="text-white" />
              </div>
              <h3 className="heading-4 text-[var(--text-primary)] mb-2">{feature.label}</h3>
              <p className="body-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{feature.desc}</p>
              <button className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Showcase ───────────────────────────────────────────────────────────────
const aiMessages = [
  { role: "user", text: "Can you explain quantum entanglement in simple terms?" },
  { role: "ai", text: "Quantum entanglement is like having a pair of magical dice 🎲 — no matter how far apart they are, when you roll one, the other instantly shows the matching number. Einstein called it 'spooky action at a distance'! Want me to go deeper?" },
  { role: "user", text: "Yes! And can you create a quiz for me on this topic?" },
  { role: "ai", text: "Absolutely! I've generated a 5-question adaptive quiz on quantum entanglement. Starting with conceptual questions and working up to problem-solving. Ready to begin? 🚀" },
];

function AIShowcase() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const showNext = () => {
      if (i >= aiMessages.length) return;
      if (aiMessages[i].role === "ai") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(prev => prev + 1);
          i++;
          setTimeout(showNext, 1500);
        }, 1500);
      } else {
        setVisibleMessages(prev => prev + 1);
        i++;
        setTimeout(showNext, 1200);
      }
    };
    const t = setTimeout(showNext, 500);
    return () => clearTimeout(t);
  }, [isVisible]);

  return (
    <section className="section-padding overflow-hidden" style={{ background: "linear-gradient(180deg, #020617 0%, #0F172A 100%)" }}>
      <div className="container-wide" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="badge badge-blue mb-4">AI-First Platform</span>
            <h2 className="heading-1 text-white mb-6">
              Meet Your Students'
              <br />
              <span className="gradient-text">Personal AI Tutor</span>
            </h2>
            <p className="body-lg mb-8" style={{ color: "#94A3B8" }}>
              Powered by GPT-4o and Claude, our AI tutor understands every student's
              learning style and adapts in real time. From homework help to exam prep,
              it never sleeps.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Brain, label: "Concept Explainer", desc: "Multi-level explanations from ELI5 to expert" },
                { icon: Target, label: "Adaptive Quizzes", desc: "Questions that match the student's current level" },
                { icon: FileText, label: "Essay Coach", desc: "Outline → Draft → Refine → Proofread pipeline" },
                { icon: BookOpen, label: "PDF Q&A", desc: "Upload any document and ask questions about it" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(37,99,235,0.15)] flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-0.5">{item.label}</p>
                    <p className="text-sm" style={{ color: "#94A3B8" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-4 h-4 rounded bg-[#10A37F] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-xs text-[#94A3B8] font-medium">GPT-4o</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-4 h-4 rounded bg-[#CC785C] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-xs text-[#94A3B8] font-medium">Claude 3.5</span>
              </div>
            </div>
          </div>

          {/* Right — Chat UI */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{ background: "#0F172A", borderColor: "rgba(255,255,255,0.08)" }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                  <Brain size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">AI Tutor</p>
                  <p className="text-xs" style={{ color: "#22C55E" }}>● Online — Ready to help</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[320px]">
                {aiMessages.slice(0, visibleMessages).map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
                    {msg.role === "ai" && (
                      <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                        <Brain size={13} className="text-white" />
                      </div>
                    )}
                    <div
                      className="max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? { background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)", color: "white", borderRadius: "18px 18px 4px 18px" }
                          : { background: "rgba(255,255,255,0.06)", color: "#E2E8F0", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px 18px 18px 4px" }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0 mr-2">
                      <Brain size={13} className="text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl flex items-center gap-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "#94A3B8",
                            animation: `typing 1.4s ease-in-out infinite`,
                            animationDelay: `${i * 0.16}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-[#475569] outline-none"
                  />
                  <button className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview Tabs ────────────────────────────────────────────────────
const dashboardTabs = [
  { label: "Student", icon: GraduationCap },
  { label: "Teacher", icon: BookOpen },
  { label: "Admin", icon: Settings },
  { label: "Parent", icon: Users },
];

const dashboardContent = {
  Student: {
    title: "Student Learning Dashboard",
    desc: "Everything a student needs to thrive — courses, AI tutor, assignments, analytics, and more.",
    color: "#2563EB",
    items: ["AI-powered learning paths", "Attendance heatmap", "Assignment tracker", "Performance analytics", "Gamification & leaderboards"],
  },
  Teacher: {
    title: "Teacher Command Center",
    desc: "Powerful tools for educators to create, teach, grade, and improve at scale.",
    color: "#7C3AED",
    items: ["AI lesson & quiz generator", "Gradebook spreadsheet", "Student insight engine", "Live class manager", "Course builder wizard"],
  },
  Admin: {
    title: "Administrative Control Panel",
    desc: "Full institutional oversight — students, staff, finance, admissions, and compliance.",
    color: "#22C55E",
    items: ["Real-time KPI dashboard", "Student information system", "Finance & payroll module", "Admissions pipeline (Kanban)", "Audit logs & compliance"],
  },
  Parent: {
    title: "Parent Engagement Portal",
    desc: "Parents stay informed and connected with transparent, real-time updates on their child.",
    color: "#F59E0B",
    items: ["Multi-child overview", "AI monthly progress report", "Fee payment with Stripe", "Direct teacher messaging", "School event calendar"],
  },
};

function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("Student");
  const content = dashboardContent[activeTab as keyof typeof dashboardContent];

  return (
    <section className="section-padding bg-[var(--bg-page)]">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">Role-Based Portals</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            A Tailored Experience
            <br />
            <span className="gradient-text">for Every Stakeholder</span>
          </h2>
          <p className="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Four purpose-built portals, each optimized for its users' exact workflow and goals.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl gap-1" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)" }}>
            {dashboardTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.label
                    ? "bg-[var(--bg-card)] text-[var(--brand-primary)] shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${content.color}15` }}
            >
              {dashboardTabs.find(t => t.label === activeTab)?.icon &&
                (() => {
                  const Icon = dashboardTabs.find(t => t.label === activeTab)!.icon;
                  return <Icon size={26} style={{ color: content.color }} />;
                })()
              }
            </div>
            <h3 className="heading-2 text-[var(--text-primary)] mb-4">{content.title}</h3>
            <p className="body-lg text-[var(--text-secondary)] mb-8">{content.desc}</p>
            <ul className="space-y-3">
              {content.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${content.color}15` }}
                  >
                    <Check size={11} style={{ color: content.color }} />
                  </div>
                  <span className="body-sm text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-10">
              <Link href="/auth/register" className="btn btn-primary">
                Explore {activeTab} Portal
              </Link>
              <Link href="#" className="btn btn-ghost">
                See Demo →
              </Link>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-subtle)] border-b border-[var(--border-subtle)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              <div className="text-xs text-[var(--text-muted)] ml-3">app.edunova.ai/{activeTab.toLowerCase()}/dashboard</div>
            </div>
            <div className="p-6 bg-[var(--bg-subtle)] min-h-[320px] flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card-static p-4 rounded-xl">
                    <div className="skeleton h-3 w-16 rounded mb-2" />
                    <div className="skeleton h-6 w-24 rounded" />
                  </div>
                ))}
              </div>
              <div className="card-static p-4 rounded-xl mb-3">
                <div className="skeleton h-3 w-32 rounded mb-3" />
                <div className="h-28 rounded-xl flex items-end gap-1 px-2">
                  {[60, 80, 45, 90, 70, 85, 55].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md transition-all"
                      style={{ height: `${h}%`, background: `${content.color}${i % 2 === 0 ? "80" : "40"}` }}
                    />
                  ))}
                </div>
              </div>
              <div className="card-static p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl skeleton" />
                  <div className="flex-1">
                    <div className="skeleton h-3 w-28 rounded mb-1.5" />
                    <div className="skeleton h-2 w-20 rounded" />
                  </div>
                  <div className="skeleton h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { quote: "EduNova AI completely transformed how we manage our 5,000-student college. The AI insights alone saved us 3 months of manual analysis.", name: "Dr. Sarah Mitchell", role: "Provost", institution: "Pacific Valley University", stars: 5, featured: true },
  { quote: "The AI Tutor reduced our student dropout rate by 34% in one semester. Nothing short of remarkable.", name: "Prof. James Chen", role: "Dean of Academics", institution: "Westbrook Institute", stars: 5, featured: false },
  { quote: "As a parent, I finally feel in the loop. The real-time updates and AI reports are game-changing.", name: "Maria Rodriguez", role: "Parent", institution: "Lincoln High School", stars: 5, featured: false },
  { quote: "The admin portal replaced 4 different software tools. Our IT costs dropped by 60%.", name: "David Thompson", role: "IT Director", institution: "Meridian School District", stars: 5, featured: true },
  { quote: "Our teachers save 8+ hours per week on administrative tasks. They're more engaged, students are too.", name: "Emma Watson", role: "Principal", institution: "Brighton Academy", stars: 5, featured: false },
  { quote: "The Stripe integration for fee collection is seamless. We went from 67% to 94% on-time payment rate.", name: "Robert Kim", role: "CFO", institution: "Horizon University", stars: 5, featured: false },
];

function Testimonials() {
  return (
    <section className="section-padding bg-[var(--bg-subtle)]">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="badge badge-green mb-4">Customer Stories</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            Loved by Educators
            <br />
            <span className="gradient-text">Around the World</span>
          </h2>
          <p className="body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Real results from real institutions that made the switch to EduNova AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`card p-6 ${t.featured ? "ring-2 ring-[rgba(37,99,235,0.2)]" : ""}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={15} className="fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <blockquote className="text-[var(--text-primary)] font-medium leading-relaxed mb-6 text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `hsl(${(i * 47) % 360}, 70%, 50%)` }}
                >
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t.role} · {t.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: { monthly: 49, annual: 34 },
    students: "Up to 500 students",
    color: "#475569",
    popular: false,
    features: [
      "Student & Teacher Portals",
      "Basic AI Tutor (50 queries/day)",
      "Course Builder",
      "Attendance Management",
      "Basic Analytics",
      "Email Support",
      "2 Admin Users",
    ],
  },
  {
    name: "Professional",
    price: { monthly: 149, annual: 104 },
    students: "Up to 5,000 students",
    color: "#2563EB",
    popular: true,
    features: [
      "Everything in Starter",
      "Unlimited AI Tutor Access",
      "Parent Portal",
      "Finance & Fee Management",
      "Advanced Analytics & AI Insights",
      "Admissions Pipeline",
      "Priority Support + SLA",
      "10 Admin Users",
      "Custom Branding",
      "API Access",
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: 0, annual: 0 },
    students: "Unlimited students",
    color: "#7C3AED",
    popular: false,
    features: [
      "Everything in Professional",
      "Custom AI Model Training",
      "Multi-Campus / Multi-Tenant",
      "SCORM & xAPI Integration",
      "SSO (SAML 2.0, Azure AD)",
      "Dedicated Success Manager",
      "99.99% Uptime SLA",
      "On-premise Deployment Option",
      "Custom Integrations",
      "Unlimited Admins",
    ],
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="section-padding bg-[var(--bg-page)]" id="pricing">
      <div className="container-normal">
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">Simple Pricing</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            Invest in Your Institution's
            <br />
            <span className="gradient-text">Future</span>
          </h2>
          <p className="body-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            No hidden fees. No per-student charges on higher tiers. Transparent, predictable pricing.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className={`text-sm font-medium ${!annual ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-[var(--brand-primary)]" : "bg-[var(--border-medium)]"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${annual ? "left-7" : "left-1"}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
              Annual
              <span className="ml-2 badge badge-green">Save 30%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-8 relative ${plan.popular ? "ring-2 ring-[var(--brand-primary)] scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--brand-primary)] text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <p className="heading-3 text-[var(--text-primary)] mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  {plan.price.monthly === 0 ? (
                    <span className="text-4xl font-bold font-display" style={{ color: plan.color }}>Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold font-display" style={{ color: plan.color }}>
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-sm text-[var(--text-muted)] mb-1">/month</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-[var(--text-muted)]">{plan.students}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${plan.color}15` }}
                    >
                      <Check size={11} style={{ color: plan.color }} />
                    </div>
                    <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                  </li>
                ))}
              </ul>

              {plan.price.monthly === 0 ? (
                <Link href="#" className="btn btn-outline w-full justify-center">Contact Sales</Link>
              ) : (
                <Link
                  href="/auth/register"
                  className={`btn w-full justify-center ${plan.popular ? "btn-gradient" : "btn-outline"}`}
                >
                  {plan.popular ? "Get Started — Free Trial" : "Start Free Trial"}
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-[var(--text-muted)]">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "Is there a free trial available?", a: "Yes! Every plan comes with a 14-day free trial with no credit card required. You get full access to all features during your trial period." },
  { q: "How does multi-tenancy work?", a: "Each institution gets its own isolated data environment, custom subdomain (yourschool.edunova.ai), and custom branding. Data is never shared between institutions." },
  { q: "What AI models power EduNova AI?", a: "We support OpenAI GPT-4o and Anthropic Claude 3.5 Sonnet, configurable per institution. Enterprise customers can also use their own API keys." },
  { q: "Is EduNova AI GDPR compliant?", a: "Yes. We are fully GDPR compliant with data processing agreements, right to erasure, data export, and consent management built in." },
  { q: "Can we integrate with our existing tools?", a: "Absolutely. We support Zoom, Google Meet, Google Classroom, Stripe, PayPal, Mailgun, Twilio, AWS S3, Google Calendar, and more via our REST API." },
  { q: "What's the uptime guarantee?", a: "Our Professional tier guarantees 99.9% uptime and Enterprise guarantees 99.99% uptime, both with financial compensation for any breach." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[var(--bg-subtle)]">
      <div className="container-normal">
        <div className="text-center mb-12">
          <span className="badge badge-blue mb-4">FAQ</span>
          <h2 className="heading-1 text-[var(--text-primary)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="body-lg text-[var(--text-secondary)]">
            Everything you need to know about EduNova AI.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-static rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-[var(--text-primary)]">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[var(--text-muted)] transition-transform flex-shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 animate-fade-up">
                  <p className="body-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: "linear-gradient(135deg, #2563EB, #7C3AED, #2563EB)",
          backgroundSize: "300% 300%",
        }}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />

      {/* Floating orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #fff, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #22C55E, transparent)" }} />

      <div className="container-normal relative z-10 text-center text-white">
        <h2 className="heading-1 mb-4">
          Ready to Transform
          <br />
          Your Institution?
        </h2>
        <p className="body-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
          Join 10,000+ schools and universities already using EduNova AI to
          deliver better education outcomes at scale.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/auth/register"
            className="btn btn-lg bg-white text-[var(--brand-primary)] hover:bg-[var(--bg-subtle)] shadow-xl"
          >
            Start Free 14-Day Trial
            <ArrowRight size={18} />
          </Link>
          <Link
            href="#"
            className="btn btn-lg"
            style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)" }}
          >
            Schedule a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0F172A" }}>
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
                <span className="text-white font-bold text-lg font-mono">N</span>
              </div>
              <span className="font-display font-bold text-lg text-white">EduNova AI</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>
              Empowering Education Through Artificial Intelligence. The operating system for modern educational institutions.
            </p>
            <p className="text-xs mb-4" style={{ color: "#475569" }}>Nexvora Dev Pvt Ltd</p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: "#" },
                { icon: Share2, href: "#" },
                { icon: GitBranch, href: "#" },
                { icon: Video, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,99,235,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                  <Icon size={15} style={{ color: "#94A3B8" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Platform</p>
            <ul className="space-y-2.5">
              {["Student Portal", "Teacher Portal", "Admin Dashboard", "Parent Portal", "AI Tutor", "Analytics", "Finance Module", "Admissions"].map(l => (
                <li key={l}>
                  <Link href="#" className="text-sm transition-colors" style={{ color: "#64748B" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
                  >{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Company</p>
            <ul className="space-y-2.5">
              {["About Nexvora", "Careers", "Blog", "Press", "Partners", "Security", "Privacy Policy", "Terms of Service"].map(l => (
                <li key={l}>
                  <Link href="#" className="text-sm transition-colors" style={{ color: "#64748B" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#94A3B8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
                  >{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Stay Updated</p>
            <p className="text-sm mb-4" style={{ color: "#64748B" }}>
              Get the latest EdTech insights, product updates, and AI trends delivered weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
              />
              <button className="btn btn-primary btn-sm px-3 flex-shrink-0">
                <ArrowRight size={15} />
              </button>
            </div>
            <div className="mt-6">
              <p className="text-xs mb-3" style={{ color: "#475569" }}>Contact Us</p>
              <div className="space-y-2">
                <a href="mailto:hello@edunova.ai" className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
                  <Mail size={13} /> hello@edunova.ai
                </a>
                <a href="tel:+1800EDUNOVA" className="flex items-center gap-2 text-sm" style={{ color: "#64748B" }}>
                  <Phone size={13} /> +1 800 EDU-NOVA
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#475569" }}>
            © 2026 Nexvora Dev Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Status", "Sitemap"].map(l => (
              <Link key={l} href="#" className="text-xs" style={{ color: "#475569" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <StatsSection />
      <FeaturesGrid />
      <AIShowcase />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
