"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain, BookOpen, CheckSquare, BarChart3, Calendar, Award,
  MessageSquare, FileText, Library, Trophy, Bell, Search,
  Settings, LogOut, ChevronRight, ArrowRight, Sparkles, Play,
  Clock, Target, TrendingUp, Users, Star, Zap, ChevronDown,
  Home, GraduationCap, HelpCircle, Download, PanelLeftClose,
  PanelLeftOpen, MoreHorizontal, Check, AlertCircle, Flame,
  LayoutDashboard
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const performanceData = [
  { week: "W1", score: 72 }, { week: "W2", score: 78 },
  { week: "W3", score: 74 }, { week: "W4", score: 85 },
  { week: "W5", score: 81 }, { week: "W6", score: 90 },
  { week: "W7", score: 88 }, { week: "W8", score: 94 },
];

const courses = [
  { id: 1, title: "Advanced Mathematics", instructor: "Prof. James Chen", progress: 78, color: "#2563EB", nextLesson: "Integration by Parts", lessons: 24, completed: 18 },
  { id: 2, title: "Computer Science 301", instructor: "Dr. Sarah Kim", progress: 65, color: "#7C3AED", nextLesson: "Binary Trees", lessons: 30, completed: 19 },
  { id: 3, title: "Quantum Physics", instructor: "Prof. Mark Davis", progress: 92, color: "#22C55E", nextLesson: "Superposition", lessons: 20, completed: 18 },
  { id: 4, title: "Literature & Composition", instructor: "Ms. Emily Wang", progress: 45, color: "#F59E0B", nextLesson: "Modernist Poetry", lessons: 16, completed: 7 },
];

const assignments = [
  { id: 1, title: "Calculus Problem Set #8", course: "Advanced Mathematics", due: "Today, 11:59 PM", status: "pending", priority: "high" },
  { id: 2, title: "Binary Tree Implementation", course: "Computer Science 301", due: "Tomorrow, 11:59 PM", status: "pending", priority: "medium" },
  { id: 3, title: "Lab Report — Wave-Particle", course: "Quantum Physics", due: "Aug 5, 2026", status: "submitted", priority: "low" },
  { id: 4, title: "Essay: The Lost Generation", course: "Literature & Composition", due: "Aug 7, 2026", status: "graded", grade: "A", priority: "low" },
];

const upcomingClasses = [
  { time: "09:00 AM", subject: "Advanced Mathematics", teacher: "Prof. Chen", room: "Hall 201", type: "live" },
  { time: "11:30 AM", subject: "CS 301 — Lab Session", teacher: "Dr. Kim", room: "Lab B", type: "lab" },
  { time: "02:00 PM", subject: "Quantum Physics", teacher: "Prof. Davis", room: "Hall 108", type: "lecture" },
];

const leaderboard = [
  { rank: 1, name: "Alice Johnson", points: 4820, avatar: "AJ", change: 0 },
  { rank: 2, name: "You", points: 4650, avatar: "ME", change: 1, isMe: true },
  { rank: 3, name: "Bob Chen", points: 4590, avatar: "BC", change: -1 },
  { rank: 4, name: "Diana Prince", points: 4410, avatar: "DP", change: 2 },
  { rank: 5, name: "Ethan Kim", points: 4300, avatar: "EK", change: -1 },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student/dashboard", active: true },
  { icon: BookOpen, label: "My Courses", href: "/student/courses", active: false },
  { icon: Brain, label: "AI Tutor", href: "/student/ai-tutor", active: false, badge: "New" },
  { icon: CheckSquare, label: "Assignments", href: "/student/assignments", active: false, badge: "3" },
  { icon: Calendar, label: "Calendar", href: "/student/calendar", active: false },
  { icon: BarChart3, label: "Analytics", href: "/student/analytics", active: false },
  { icon: FileText, label: "Exams", href: "/student/exams", active: false },
  { icon: MessageSquare, label: "Messages", href: "/student/messages", active: false, badge: "5" },
  { icon: Library, label: "Library", href: "/student/library", active: false },
  { icon: Trophy, label: "Leaderboard", href: "/student/leaderboard", active: false },
  { icon: Award, label: "Achievements", href: "/student/achievements", active: false },
  { icon: Download, label: "Downloads", href: "/student/downloads", active: false },
];

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className="sidebar h-screen flex-shrink-0 flex flex-col"
      style={{ width: collapsed ? "72px" : "240px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border-subtle)]" style={{ minHeight: "var(--topbar-height)" }}>
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white font-bold font-mono text-sm">N</span>
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-[15px] text-[var(--text-primary)] whitespace-nowrap">EduNova AI</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-hide">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`nav-item ${item.active ? "active" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={18} className="flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: item.active ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.1)",
                      color: "#2563EB",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Profile */}
      <div className="p-3 border-t border-[var(--border-subtle)]">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-subtle)] transition-all cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            SJ
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">Sarah Johnson</p>
              <p className="text-xs text-[var(--text-muted)] truncate">Grade 11 · Science</p>
            </div>
          )}
          {!collapsed && <ChevronDown size={14} className="text-[var(--text-muted)] flex-shrink-0" />}
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-[var(--border-subtle)] shadow-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all z-10"
      >
        {collapsed ? <PanelLeftOpen size={13} /> : <PanelLeftClose size={13} />}
      </button>
    </aside>
  );
}

// ─── Topbar ────────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-30 glass-nav border-b border-[var(--border-subtle)] flex items-center px-6 gap-4"
      style={{ height: "var(--topbar-height)", marginLeft: "240px" }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search courses, notes, assignments..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-primary)] focus:bg-[var(--bg-card)] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* AI Quick Access */}
        <Link href="/student/ai-tutor" className="btn btn-gradient btn-sm gap-2 hidden sm:flex">
          <Brain size={14} />
          Ask AI Tutor
        </Link>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-all">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--danger-red)]" style={{ background: "#EF4444" }} />
        </button>

        {/* Avatar */}
        <button className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold">
          SJ
        </button>
      </div>
    </header>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-page)]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginLeft: 0 }}>
        {/* Topbar — full width of content area */}
        <header
          className="flex-shrink-0 glass-nav border-b border-[var(--border-subtle)] flex items-center px-6 gap-4 z-10"
          style={{ height: "var(--topbar-height)" }}
        >
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search courses, notes, assignments..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] outline-none focus:border-[var(--brand-primary)] focus:bg-[var(--bg-card)] transition-all"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/student/ai-tutor" className="btn btn-gradient btn-sm gap-2 hidden sm:flex">
              <Brain size={14} />Ask AI
            </Link>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-all">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
            </button>
            <button className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold">SJ</button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">

            {/* Welcome Row */}
            <div className="flex items-start justify-between mb-8">
              <div className="animate-fade-up">
                <h1 className="heading-2 text-[var(--text-primary)] mb-1">
                  Good morning, Sarah 👋
                </h1>
                <p className="body-sm text-[var(--text-secondary)]">
                  You have <span className="font-semibold text-[var(--danger-red)]">3 assignments due today</span>. Your AI tutor is ready to help.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button className="btn btn-outline btn-sm gap-2">
                  <Calendar size={14} /> Schedule
                </button>
                <Link href="/student/ai-tutor" className="btn btn-gradient btn-sm gap-2">
                  <Sparkles size={14} /> AI Study Session
                </Link>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: BookOpen, label: "Courses Enrolled", value: "8", sub: "+2 this semester", color: "#2563EB", trend: "up" },
                { icon: CheckSquare, label: "Assignments Pending", value: "3", sub: "1 due today", color: "#F59E0B", trend: "neutral" },
                { icon: Flame, label: "Study Streak", value: "14 days", sub: "Personal best!", color: "#EF4444", trend: "up" },
                { icon: Star, label: "EduPoints", value: "4,650", sub: "#2 on leaderboard", color: "#7C3AED", trend: "up" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card animate-fade-up">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.color}12` }}
                    >
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    {stat.trend === "up" && (
                      <div className="flex items-center gap-1 text-[#22C55E] text-xs font-medium">
                        <TrendingUp size={12} /> Up
                      </div>
                    )}
                  </div>
                  <p className="text-2xl font-bold font-display text-[var(--text-primary)] mb-0.5">{stat.value}</p>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Continue Learning (large) */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="heading-4 text-[var(--text-primary)]">Continue Learning</h2>
                  <Link href="/student/courses" className="text-sm text-[var(--brand-primary)] flex items-center gap-1 hover:gap-2 transition-all">
                    All courses <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courses.slice(0, 4).map((course) => (
                    <Link key={course.id} href={`/student/courses/${course.id}`} className="group block p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:shadow-md transition-all">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${course.color}15` }}>
                          <BookOpen size={18} style={{ color: course.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--brand-primary)] transition-colors">{course.title}</p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--text-muted)]">Progress</span>
                          <span className="font-semibold" style={{ color: course.color }}>{course.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-[var(--bg-subtle)] rounded-full">
                          <div className="h-full rounded-full transition-all" style={{ width: `${course.progress}%`, background: course.color }} />
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Next: <span className="text-[var(--text-secondary)]">{course.nextLesson}</span>
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5">
                {/* AI Tutor Widget */}
                <div className="card p-5 flex-shrink-0" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
                      <Brain size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">AI Tutor</p>
                      <p className="text-xs" style={{ color: "#22C55E" }}>● Online & ready</p>
                    </div>
                  </div>
                  <div className="relative mb-3">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={e => setAiQuery(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full rounded-xl px-4 py-3 text-sm pr-12 outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                    <Link href="/student/ai-tutor" className="absolute right-2 top-1.5 w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                      <ArrowRight size={14} className="text-white" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Explain concept", "Create quiz", "Review essay", "Solve problem"].map(q => (
                      <button key={q} className="text-xs px-3 py-1.5 rounded-lg text-left transition-colors" style={{ background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upcoming Classes */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Today&apos;s Classes</h3>
                    <span className="badge badge-blue text-xs">3 classes</span>
                  </div>
                  <div className="space-y-3">
                    {upcomingClasses.map((cls, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-subtle)]">
                        <div className="text-center flex-shrink-0">
                          <p className="text-xs font-bold text-[var(--brand-primary)]">{cls.time.split(" ")[0]}</p>
                          <p className="text-xs text-[var(--text-muted)]">{cls.time.split(" ")[1]}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{cls.subject}</p>
                          <p className="text-xs text-[var(--text-muted)]">{cls.room}</p>
                        </div>
                        {cls.type === "live" && (
                          <button className="btn btn-primary btn-sm text-xs px-2 py-1 gap-1">
                            <Play size={10} /> Join
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly Progress Chart */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="heading-4 text-[var(--text-primary)]">Weekly Performance</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#2563EB" }} />
                      <span className="text-xs text-[var(--text-muted)]">Score</span>
                    </div>
                    <select className="text-xs text-[var(--text-muted)] bg-transparent border-none outline-none cursor-pointer">
                      <option>Last 8 weeks</option>
                      <option>Last 3 months</option>
                    </select>
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                      <Tooltip
                        contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", fontSize: "12px" }}
                        formatter={(v) => [`${v}%`, "Score"]}
                      />
                      <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "#2563EB", strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-1.5 text-[#22C55E] text-sm font-medium">
                    <TrendingUp size={14} /> +22% vs last month
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">Current streak: 14 days 🔥</p>
                </div>
              </div>

              {/* Assignments & Deadlines */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="heading-4 text-[var(--text-primary)]">Assignments</h2>
                  <Link href="/student/assignments" className="text-sm text-[var(--brand-primary)]">View all</Link>
                </div>
                <div className="space-y-3">
                  {assignments.slice(0, 4).map((a) => (
                    <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-subtle)]">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.priority === "high" ? "bg-[#EF4444]" : a.priority === "medium" ? "bg-[#F59E0B]" : "bg-[#22C55E]"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">{a.title}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.course}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {a.status === "graded" ? (
                          <span className="badge badge-green">{a.grade}</span>
                        ) : a.status === "submitted" ? (
                          <span className="badge badge-blue">Submitted</span>
                        ) : (
                          <span className={`text-xs font-medium ${a.priority === "high" ? "text-[#EF4444]" : "text-[#F59E0B]"}`}>
                            {a.due}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="heading-4 text-[var(--text-primary)]">Class Leaderboard</h2>
                  <Link href="/student/leaderboard" className="text-sm text-[var(--brand-primary)]">Full board</Link>
                </div>
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${entry.isMe ? "ring-2 ring-[rgba(37,99,235,0.2)]" : ""}`}
                      style={{ background: entry.isMe ? "rgba(37,99,235,0.05)" : "var(--bg-subtle)" }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: entry.rank === 1 ? "#FEF3C7" : entry.rank === 2 ? "#E0E7FF" : entry.rank === 3 ? "#FEE2E2" : "var(--bg-card)",
                          color: entry.rank === 1 ? "#D97706" : entry.rank === 2 ? "#4F46E5" : entry.rank === 3 ? "#DC2626" : "var(--text-muted)",
                        }}
                      >
                        {entry.rank}
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: entry.isMe ? "#2563EB" : `hsl(${entry.rank * 60}, 70%, 50%)` }}
                      >
                        {entry.avatar}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${entry.isMe ? "text-[var(--brand-primary)]" : "text-[var(--text-primary)]"}`}>
                          {entry.name} {entry.isMe && <span className="text-xs font-normal text-[var(--text-muted)]">(You)</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{entry.points.toLocaleString()}</p>
                        <p className="text-xs text-[var(--text-muted)]">pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insight Card */}
              <div className="card p-6" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                    <Sparkles size={15} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: TrendingUp, text: "You're 23% stronger in Math than last month!", color: "#22C55E" },
                    { icon: AlertCircle, text: "Your Physics scores drop on Fridays — review Thursday evenings.", color: "#F59E0B" },
                    { icon: Target, text: "Complete 2 more lessons to unlock your next achievement badge!", color: "#2563EB" },
                  ].map((insight, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[var(--border-subtle)]">
                      <insight.icon size={15} className="flex-shrink-0 mt-0.5" style={{ color: insight.color }} />
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
