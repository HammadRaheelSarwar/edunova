"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, DollarSign, TrendingUp, GraduationCap, BookOpen,
  Bell, Search, Settings, BarChart3, Calendar, MessageSquare,
  FileText, Shield, Building2, Layers, ChevronRight, ArrowUp,
  ArrowDown, MoreHorizontal, CheckCircle, AlertCircle, Clock,
  MapPin, Zap, Brain, Target, Award, PanelLeftClose,
  PanelLeftOpen, CreditCard, ChevronDown, Star, Download,
  Library, Bus, Home, UserCheck, Laptop, Activity,
  LayoutDashboard, UserCog, Receipt, ClipboardList,
  BookMarked, Megaphone, Wallet
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 45000, target: 43000 },
  { month: "Mar", revenue: 38000, target: 44000 },
  { month: "Apr", revenue: 52000, target: 46000 },
  { month: "May", revenue: 58000, target: 48000 },
  { month: "Jun", revenue: 61000, target: 50000 },
  { month: "Jul", revenue: 55000, target: 52000 },
  { month: "Aug", revenue: 67000, target: 54000 },
];

const enrollmentData = [
  { month: "Sep", students: 2100 },
  { month: "Oct", students: 2250 },
  { month: "Nov", students: 2180 },
  { month: "Dec", students: 2320 },
  { month: "Jan", students: 2450 },
  { month: "Feb", students: 2580 },
  { month: "Mar", students: 2490 },
  { month: "Apr", students: 2720 },
];

const deptDistribution = [
  { name: "Science", value: 32, color: "#2563EB" },
  { name: "Arts", value: 24, color: "#7C3AED" },
  { name: "Commerce", value: 20, color: "#22C55E" },
  { name: "Engineering", value: 16, color: "#F59E0B" },
  { name: "Others", value: 8, color: "#EF4444" },
];

const recentStudents = [
  { name: "Alex Thompson", grade: "Grade 10", status: "Active", avatar: "AT", joined: "Aug 2, 2026", fee: "Paid" },
  { name: "Maria Rodriguez", grade: "Grade 11", status: "Active", avatar: "MR", joined: "Aug 1, 2026", fee: "Pending" },
  { name: "James Wilson", grade: "Grade 9", status: "Admitted", avatar: "JW", joined: "Jul 30, 2026", fee: "Paid" },
  { name: "Sophie Chen", grade: "Grade 12", status: "Active", avatar: "SC", joined: "Jul 29, 2026", fee: "Overdue" },
  { name: "Ravi Patel", grade: "Grade 10", status: "Active", avatar: "RP", joined: "Jul 28, 2026", fee: "Paid" },
];

const activityFeed = [
  { icon: GraduationCap, text: "New admission: Alex Thompson (Grade 10)", time: "2 min ago", color: "#22C55E" },
  { icon: CreditCard, text: "Fee payment received: Maria Rodriguez — $1,200", time: "15 min ago", color: "#2563EB" },
  { icon: AlertCircle, text: "At-risk alert: 3 students below 60% attendance", time: "1 hr ago", color: "#EF4444" },
  { icon: BookOpen, text: "Course published: Advanced AI & Machine Learning", time: "2 hrs ago", color: "#7C3AED" },
  { icon: Users, text: "New teacher joined: Dr. Emily Watson (Mathematics)", time: "3 hrs ago", color: "#2563EB" },
  { icon: CheckCircle, text: "Payroll processed: 48 employees — Aug 2026", time: "4 hrs ago", color: "#22C55E" },
];

const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard", active: true },
  { icon: GraduationCap, label: "Students", href: "/admin/students", badge: "2.7K" },
  { icon: Users, label: "Teachers", href: "/admin/teachers", badge: "142" },
  { icon: UserCog, label: "HR & Staff", href: "/admin/hr" },
  { icon: Receipt, label: "Finance", href: "/admin/finance" },
  { icon: ClipboardList, label: "Admissions", href: "/admin/admissions", badge: "23" },
  { icon: BookMarked, label: "Academic", href: "/admin/academic" },
  { icon: Calendar, label: "Timetable", href: "/admin/timetable" },
  { icon: Activity, label: "Attendance", href: "/admin/attendance" },
  { icon: Megaphone, label: "Communication", href: "/admin/communication" },
  { icon: Library, label: "Library", href: "/admin/library" },
  { icon: Bus, label: "Transport", href: "/admin/transport" },
  { icon: Home, label: "Hostel", href: "/admin/hostel" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const kpis = [
  { icon: GraduationCap, label: "Total Students", value: "2,741", change: "+128", positive: true, color: "#2563EB" },
  { icon: UserCheck, label: "Active Teachers", value: "142", change: "+8", positive: true, color: "#7C3AED" },
  { icon: DollarSign, label: "Revenue (MTD)", value: "$67,420", change: "+12.4%", positive: true, color: "#22C55E" },
  { icon: ClipboardList, label: "New Admissions", value: "23", change: "+5", positive: true, color: "#F59E0B" },
  { icon: Activity, label: "Attendance Rate", value: "94.2%", change: "-0.8%", positive: false, color: "#EF4444" },
  { icon: CheckCircle, label: "Pending Tasks", value: "17", change: "-4", positive: true, color: "#06B6D4" },
];

// ─── Admin Sidebar ─────────────────────────────────────────────────────────────
function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className="sidebar h-screen flex-shrink-0 flex flex-col"
      style={{ width: collapsed ? "72px" : "260px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border-subtle)]" style={{ minHeight: "var(--topbar-height)" }}>
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white font-bold font-mono text-sm">N</span>
        </div>
        {!collapsed && (
          <div>
            <span className="font-display font-bold text-[15px] text-[var(--text-primary)]">EduNova AI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-[var(--text-muted)]">Admin Portal</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1">
          <p className="label text-[var(--text-muted)] px-3 mb-2">Quick Actions</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: GraduationCap, label: "Student" },
              { icon: Brain, label: "AI Report" },
              { icon: Megaphone, label: "Announce" },
            ].map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-all">
                <a.icon size={15} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5 scrollbar-hide">
        {adminNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`nav-item ${item.active ? "active" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={17} className="flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 whitespace-nowrap text-sm">{item.label}</span>
                {item.badge && (
                  <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)]">
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
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg-subtle)] cursor-pointer transition-all ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">Admin User</p>
              <p className="text-xs text-[var(--brand-primary)]">Super Admin · L5</p>
            </div>
          )}
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

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState("30D");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-page)]">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex-shrink-0 glass-nav border-b border-[var(--border-subtle)] flex items-center px-6 gap-4 z-10"
          style={{ height: "var(--topbar-height)" }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[var(--text-muted)]">EduNova AI</span>
            <ChevronRight size={14} className="text-[var(--text-muted)]" />
            <span className="font-medium text-[var(--text-primary)]">Dashboard</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm ml-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search anything... ⌘K"
                className="w-full pl-8 pr-4 py-2 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] outline-none focus:border-[var(--brand-primary)] transition-all"
                style={{ color: "var(--text-primary)" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Date range */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
              {["7D", "30D", "90D", "YTD"].map(r => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${dateRange === r ? "bg-white text-[var(--brand-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button className="btn btn-outline btn-sm gap-2">
              <Download size={14} /> Export
            </button>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-all">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ background: "#EF4444" }}>5</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-xs font-bold">AD</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

            {/* Page Title + Actions */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="heading-2 text-[var(--text-primary)]">Institution Overview</h1>
                <p className="body-sm text-[var(--text-secondary)] mt-1">
                  Horizon Academy · August 2026 · Last updated 2 minutes ago
                </p>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-outline btn-sm">
                  <Brain size={14} /> AI Report
                </button>
                <button className="btn btn-gradient btn-sm">
                  <Zap size={14} /> Quick Actions
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="stat-card animate-fade-up">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}12` }}>
                      <kpi.icon size={18} style={{ color: kpi.color }} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.positive ? "text-[#16A34A] bg-[rgba(34,197,94,0.1)]" : "text-[#DC2626] bg-[rgba(239,68,68,0.1)]"}`}>
                      {kpi.positive ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-xl font-bold font-display text-[var(--text-primary)]">{kpi.value}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="heading-4 text-[var(--text-primary)]">Revenue Trend</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">Monthly collected vs target</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: "#2563EB" }} />
                      <span className="text-xs text-[var(--text-muted)]">Collected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: "#E2E8F0" }} />
                      <span className="text-xs text-[var(--text-muted)]">Target</span>
                    </div>
                  </div>
                </div>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", fontSize: "12px" }}
                        formatter={(v: any) => [`$${Number(v || 0).toLocaleString()}`, ""]}
                      />
                      <Area type="monotone" dataKey="target" stroke="#E2E8F0" strokeWidth={2} fill="none" strokeDasharray="4 4" />
                      <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: "#2563EB", strokeWidth: 0, r: 3 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Pie */}
              <div className="card p-6">
                <h2 className="heading-4 text-[var(--text-primary)] mb-1">Department Split</h2>
                <p className="text-sm text-[var(--text-muted)] mb-4">Student distribution by dept.</p>
                <div className="h-36 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deptDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {deptDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {deptDistribution.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                        <span className="text-xs text-[var(--text-secondary)]">{d.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row 2 + Activity Feed */}
            <div className="grid lg:grid-cols-3 gap-5 mb-5">
              {/* Enrollment Trend */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="heading-4 text-[var(--text-primary)]">Student Enrollment</h2>
                  <span className="badge badge-green flex items-center gap-1"><TrendingUp size={11} /> +29.5% YoY</span>
                </div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData} margin={{ top: 0, right: 5, bottom: 0, left: -20 }}>
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "12px", fontSize: "12px" }} />
                      <Bar dataKey="students" radius={[6, 6, 0, 0]} fill="#2563EB" fillOpacity={0.85} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="heading-4 text-[var(--text-primary)]">Activity Feed</h2>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
                </div>
                <div className="space-y-4 overflow-y-auto scrollbar-hide" style={{ maxHeight: "240px" }}>
                  {activityFeed.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${a.color}15` }}>
                        <a.icon size={13} style={{ color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{a.text}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Students Table */}
            <div className="card p-6 mb-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="heading-4 text-[var(--text-primary)]">Recent Admissions</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" placeholder="Search students..." className="pl-8 pr-4 py-2 rounded-xl text-sm bg-[var(--bg-subtle)] border border-[var(--border-subtle)] outline-none" style={{ color: "var(--text-primary)" }} />
                  </div>
                  <Link href="/admin/students" className="btn btn-outline btn-sm">View All Students</Link>
                  <button className="btn btn-primary btn-sm">+ Add Student</button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)]">
                      {["Student", "Grade", "Status", "Joined", "Fee Status", "Actions"].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((s, i) => (
                      <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-subtle)] transition-colors group">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{ background: `hsl(${i * 60}, 70%, 55%)` }}
                            >
                              {s.avatar}
                            </div>
                            <span className="text-sm font-medium text-[var(--text-primary)]">{s.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">{s.grade}</td>
                        <td className="py-4 px-4">
                          <span className={`badge ${s.status === "Active" ? "badge-green" : "badge-blue"}`}>{s.status}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-[var(--text-muted)]">{s.joined}</td>
                        <td className="py-4 px-4">
                          <span className={`badge ${s.fee === "Paid" ? "badge-green" : s.fee === "Overdue" ? "badge-red" : "badge-amber"}`}>{s.fee}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="btn btn-ghost btn-sm text-xs px-2">View</button>
                            <button className="btn btn-ghost btn-sm text-xs px-2">Edit</button>
                            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                              <MoreHorizontal size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Row — AI Insights + Quick Links */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* AI Insights */}
              <div className="lg:col-span-2 card p-6" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                    <Brain size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">AI Insights — Horizon Academy</h2>
                    <p className="text-xs" style={{ color: "#64748B" }}>Generated 2 minutes ago</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { icon: TrendingUp, text: "Enrollment is up 15.2% vs last month. Science dept growing fastest.", color: "#22C55E" },
                    { icon: AlertCircle, text: "3 students have dropped below 60% attendance this week. Intervention recommended.", color: "#EF4444" },
                    { icon: DollarSign, text: "Fee collection rate is 87.3%. 42 students have overdue payments over 30 days.", color: "#F59E0B" },
                    { icon: Brain, text: "AI Tutor usage increased 34% — top engagement in Maths and Physics.", color: "#2563EB" },
                  ].map((insight, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <insight.icon size={14} className="flex-shrink-0 mt-0.5" style={{ color: insight.color }} />
                      <p className="text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div className="card p-6">
                <h2 className="heading-4 text-[var(--text-primary)] mb-4">Quick Access</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: GraduationCap, label: "Add Student", color: "#2563EB" },
                    { icon: Users, label: "Add Teacher", color: "#7C3AED" },
                    { icon: Receipt, label: "Collect Fee", color: "#22C55E" },
                    { icon: Megaphone, label: "Announcement", color: "#F59E0B" },
                    { icon: Calendar, label: "Schedule Exam", color: "#EF4444" },
                    { icon: FileText, label: "Generate Report", color: "#06B6D4" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--bg-subtle)] transition-all text-center"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${item.color}12` }}>
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-medium text-[var(--text-secondary)]">{item.label}</span>
                    </button>
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
