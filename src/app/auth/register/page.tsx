"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Check, Eye, EyeOff,
  Mail, Lock, User, Building2, Phone, GraduationCap,
  Globe, CheckCircle2
} from "lucide-react";

type Step = "account" | "institution" | "verify";

const steps: { key: Step; label: string; desc: string }[] = [
  { key: "account", label: "Account", desc: "Personal details" },
  { key: "institution", label: "Institution", desc: "School info" },
  { key: "verify", label: "Verify", desc: "Email confirmation" },
];

const institutionTypes = [
  "K-12 School", "University / College", "Training Center",
  "Online Academy", "Corporate Training", "Government Institution",
];

const countryCodes = ["+1 (US)", "+44 (UK)", "+91 (IN)", "+61 (AU)", "+971 (UAE)", "+92 (PK)"];

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("account");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    institutionName: "", institutionType: "", country: "", phone: "", website: "",
    studentCount: "", role: "admin",
  });

  const currentIndex = steps.findIndex(s => s.key === step);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(form.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#EF4444", "#F59E0B", "#3B82F6", "#22C55E"];

  const handleNext = async () => {
    if (step === "account") setStep("institution");
    else if (step === "institution") {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1000));
      setLoading(false);
      setStep("verify");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#F8FAFC" }}>
      <div className="w-full max-w-[520px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
            <span className="text-white font-bold text-lg font-mono">N</span>
          </div>
          <span className="font-display font-bold text-xl text-[var(--text-primary)]">EduNova AI</span>
        </Link>

        {/* Step Indicator */}
        <div className="card-static rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between relative">
            {/* Progress line */}
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-[var(--border-subtle)] -z-0" />
            <div
              className="absolute left-0 top-5 h-0.5 bg-[var(--brand-primary)] transition-all duration-500"
              style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s, i) => (
              <div key={s.key} className="flex flex-col items-center gap-1 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                    i < currentIndex
                      ? "bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white"
                      : i === currentIndex
                      ? "bg-white border-[var(--brand-primary)] text-[var(--brand-primary)]"
                      : "bg-white border-[var(--border-subtle)] text-[var(--text-muted)]"
                  }`}
                >
                  {i < currentIndex ? <Check size={16} /> : i + 1}
                </div>
                <p className={`text-xs font-medium ${i === currentIndex ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="card-static rounded-2xl p-8 animate-fade-up">
          {/* Step 1: Account */}
          {step === "account" && (
            <>
              <h1 className="heading-2 text-[var(--text-primary)] mb-2">Create your account</h1>
              <p className="body-sm text-[var(--text-secondary)] mb-6">Start your 14-day free trial. No credit card required.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="input-floating-wrap">
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="text" placeholder=" " value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="input-floating pl-9" required />
                      <label className="input-label" style={{ left: "36px" }}>First name</label>
                    </div>
                  </div>
                  <div className="input-floating-wrap">
                    <div className="relative">
                      <input type="text" placeholder=" " value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="input-floating" required />
                      <label className="input-label">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="input-floating-wrap">
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="email" placeholder=" " value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-floating pl-9" required />
                    <label className="input-label" style={{ left: "36px" }}>Work email address</label>
                  </div>
                </div>

                <div className="input-floating-wrap">
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type={showPassword ? "text" : "password"} placeholder=" " value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-floating pl-9 pr-10" required />
                    <label className="input-label" style={{ left: "36px" }}>Password</label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= strengthScore ? strengthColors[strengthScore] : "var(--border-subtle)" }} />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strengthColors[strengthScore] }}>{strengthLabels[strengthScore]} password</p>
                    </div>
                  )}
                </div>

                <div className="input-floating-wrap">
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="password" placeholder=" " value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} className="input-floating pl-9" required />
                    <label className="input-label" style={{ left: "36px" }}>Confirm password</label>
                  </div>
                </div>

                {/* Requirements */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "8+ characters", met: form.password.length >= 8 },
                    { label: "Uppercase letter", met: /[A-Z]/.test(form.password) },
                    { label: "Number", met: /[0-9]/.test(form.password) },
                    { label: "Special character", met: /[^A-Za-z0-9]/.test(form.password) },
                  ].map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${req.met ? "bg-[var(--accent-green)]" : "border border-[var(--border-medium)]"}`} style={{ background: req.met ? "#22C55E" : undefined }}>
                        {req.met && <Check size={9} className="text-white" />}
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Institution */}
          {step === "institution" && (
            <>
              <h1 className="heading-2 text-[var(--text-primary)] mb-2">Your Institution</h1>
              <p className="body-sm text-[var(--text-secondary)] mb-6">Tell us about your school or organization.</p>

              <div className="space-y-4">
                <div className="input-floating-wrap">
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder=" " value={form.institutionName} onChange={e => setForm({ ...form, institutionName: e.target.value })} className="input-floating pl-9" required />
                    <label className="input-label" style={{ left: "36px" }}>Institution name</label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-2 block">Institution Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {institutionTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, institutionType: type })}
                        className={`text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                          form.institutionType === type
                            ? "border-[var(--brand-primary)] text-[var(--brand-primary)] bg-[rgba(37,99,235,0.06)]"
                            : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-medium)]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="input-floating-wrap">
                    <div className="relative">
                      <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="input-floating pl-9 appearance-none">
                        <option value="">Country</option>
                        {["United States", "United Kingdom", "India", "Pakistan", "UAE", "Australia", "Canada", "Germany"].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-floating-wrap">
                    <div className="relative">
                      <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <select value={form.studentCount} onChange={e => setForm({ ...form, studentCount: e.target.value })} className="input-floating pl-9 appearance-none">
                        <option value="">Student count</option>
                        {["< 100", "100-500", "500-1000", "1000-5000", "5000-10000", "10000+"].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="input-floating-wrap">
                  <div className="relative">
                    <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="url" placeholder=" " value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="input-floating pl-9" />
                    <label className="input-label" style={{ left: "36px" }}>Website (optional)</label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Verify */}
          {step === "verify" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={36} style={{ color: "#22C55E" }} />
              </div>
              <h2 className="heading-2 text-[var(--text-primary)] mb-3">Check Your Email</h2>
              <p className="body-sm text-[var(--text-secondary)] mb-2">
                We sent a verification link to
              </p>
              <p className="font-semibold text-[var(--text-primary)] mb-6">{form.email || "your@email.com"}</p>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Click the link in the email to verify your account and access your EduNova AI dashboard.
              </p>
              <Link href="/auth/verify-otp" className="btn btn-gradient btn-lg w-full justify-center">
                Enter Verification Code <ArrowRight size={17} />
              </Link>
              <button className="mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)]">
                Didn&apos;t receive it? Resend email
              </button>
            </div>
          )}

          {/* Navigation */}
          {step !== "verify" && (
            <div className="flex items-center gap-3 mt-6">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(steps[currentIndex - 1].key)}
                  className="btn btn-outline btn-lg flex-shrink-0"
                >
                  <ArrowLeft size={17} />
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="btn btn-gradient btn-lg flex-1 justify-center"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {step === "institution" ? "Create Account" : "Continue"}
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          )}

          <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[var(--brand-primary)] font-semibold hover:underline">Sign in</Link>
          </p>

          <p className="text-center mt-3 text-xs text-[var(--text-muted)]">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline">Terms of Service</Link> and{" "}
            <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
