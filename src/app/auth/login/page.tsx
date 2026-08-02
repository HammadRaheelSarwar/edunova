"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles,
  Check, AlertCircle, Brain, BarChart3, Users, BookOpen,
  GraduationCap, Shield, Globe, Star
} from "lucide-react";

// ─── Auth Layout ───────────────────────────────────────────────────────────────
const showcaseSlides = [
  {
    icon: Brain,
    title: "AI Tutor for Every Student",
    desc: "Personalized learning powered by GPT-4o and Claude — available 24/7.",
    color: "#2563EB",
    bg: "from-blue-600/20 to-violet-600/10",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "Identify at-risk students before it's too late with AI-powered insights.",
    color: "#22C55E",
    bg: "from-green-600/20 to-emerald-600/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "RBAC, 2FA, SOC 2 Type II, and GDPR compliant by default.",
    color: "#7C3AED",
    bg: "from-violet-600/20 to-purple-600/10",
  },
];

const testimonialQuote = {
  text: "EduNova AI reduced our administrative workload by 70% and improved student satisfaction scores to an all-time high.",
  name: "Dr. Sarah Mitchell",
  role: "Provost, Pacific Valley University",
  stars: 5,
};

function AuthLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = showcaseSlides[slideIndex];

  return (
    <div className="min-h-screen flex" style={{ background: "#020617" }}>
      {/* Left Showcase Panel */}
      <div className="hidden lg:flex flex-col w-[55%] relative overflow-hidden p-12">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #020617 0%, #0F172A 60%, #1E3A5F 100%)" }}
        />
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />

        {/* Gradient blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #2563EB, #7C3AED)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #22C55E, transparent)" }} />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-lg" style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
              <span className="text-white font-bold text-xl font-mono">N</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white leading-none">EduNova</span>
              <span className="font-display font-bold text-xl gradient-text leading-none"> AI</span>
            </div>
          </Link>

          {/* Feature slide */}
          <div className="flex-1 flex flex-col justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 self-start`} style={{ background: `${slide.color}20`, border: `1px solid ${slide.color}30` }}>
              <slide.icon size={15} style={{ color: slide.color }} />
              <span className="text-sm font-medium" style={{ color: slide.color }}>Platform Feature</span>
            </div>

            <h2 className="heading-1 text-white mb-4">{slide.title}</h2>
            <p className="body-lg mb-12" style={{ color: "#94A3B8" }}>{slide.desc}</p>

            {/* Slide indicators */}
            <div className="flex gap-2 mb-12">
              {showcaseSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className="h-1 rounded-full transition-all"
                  style={{ width: i === slideIndex ? "32px" : "8px", background: i === slideIndex ? slide.color : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {[
                { value: "50M+", label: "Students" },
                { value: "10K+", label: "Institutions" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-2xl font-bold gradient-text mb-1">{stat.value}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonialQuote.stars }).map((_, i) => (
                  <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#CBD5E1" }}>
                &ldquo;{testimonialQuote.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-xs font-bold text-white">
                  SM
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonialQuote.name}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{testimonialQuote.role}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs mt-8" style={{ color: "#334155" }}>
            © 2026 Nexvora Dev Pvt Ltd · EduNova AI
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12" style={{ background: "#F8FAFC" }}>
        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold font-mono">N</span>
          </div>
          <span className="font-display font-bold text-lg text-[var(--text-primary)]">EduNova AI</span>
        </Link>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Login Page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setError("Invalid credentials. Try demo@edunova.ai / password123");
  };

  return (
    <AuthLayout title="Sign In">
      <div className="animate-fade-up">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-2 text-[var(--text-primary)] mb-2">Welcome back</h1>
          <p className="body-sm text-[var(--text-secondary)]">
            Sign in to your EduNova AI account
          </p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="btn btn-outline gap-2 text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="btn btn-outline gap-2 text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path fill="#0078D4" d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z"/>
            </svg>
            Microsoft
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          <span className="text-xs text-[var(--text-muted)]">or continue with email</span>
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl mb-5 text-sm" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <AlertCircle size={16} className="text-[var(--danger-red)] flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
            <span className="text-[#DC2626]">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="input-floating-wrap">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="email"
                placeholder=" "
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-floating pl-10"
                required
              />
              <label className="input-label" style={{ left: "40px" }}>Email address</label>
            </div>
          </div>

          {/* Password */}
          <div className="input-floating-wrap">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="input-floating pl-10 pr-10"
                required
              />
              <label className="input-label" style={{ left: "40px" }}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setForm({ ...form, remember: !form.remember })}
                className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${form.remember ? "bg-[var(--brand-primary)]" : "border-2 border-[var(--border-medium)]"}`}
              >
                {form.remember && <Check size={10} className="text-white" />}
              </div>
              <span className="text-sm text-[var(--text-secondary)]">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-[var(--brand-primary)] hover:text-[var(--brand-deep)] font-medium">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-gradient btn-lg w-full mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>Sign In <ArrowRight size={17} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[var(--brand-primary)] font-semibold hover:underline">
            Start free trial
          </Link>
        </p>

        {/* Role demo links */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
          <p className="text-xs text-center text-[var(--text-muted)] mb-3">Demo accounts</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { role: "Student", icon: GraduationCap, email: "student@demo.com" },
              { role: "Teacher", icon: BookOpen, email: "teacher@demo.com" },
              { role: "Admin", icon: Shield, email: "admin@demo.com" },
              { role: "Parent", icon: Users, email: "parent@demo.com" },
            ].map((d) => (
              <button
                key={d.role}
                onClick={() => setForm({ ...form, email: d.email, password: "demo123" })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-subtle)" }}
              >
                <d.icon size={13} />
                {d.role} Demo
              </button>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
