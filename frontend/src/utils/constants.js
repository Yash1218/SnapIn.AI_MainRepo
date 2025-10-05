import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Calendar,
  CheckCircle,
  Shield,
  TrendingUp,
  Clock,
  GraduationCap,
  Settings,
  PieChart,
  FileText,
  Download,
  User,
  QrCode,
} from "lucide-react";

export const FEATURES = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    desc: "Automated class scheduling with conflict detection",
  },
  {
    icon: CheckCircle,
    title: "Quick Attendance",
    desc: "Mark attendance in seconds with bulk actions",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Comprehensive insights and attendance trends",
  },
  {
    icon: Users,
    title: "Role Management",
    desc: "Separate portals for admin, faculty, and students",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security and data protection",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    desc: "Monitor attendance patterns and improvements",
  },
];

export const ADMIN_STATS = [
  {
    label: "Total Students",
    value: "1,234",
    icon: Users,
    color: "from-cyan-500 to-blue-600",
  },
  {
    label: "Total Faculty",
    value: "87",
    icon: GraduationCap,
    color: "from-purple-500 to-indigo-600",
  },
  {
    label: "Total Attendance",
    value: "45,678",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "Average Attendance",
    value: "87.5%",
    icon: TrendingUp,
    color: "from-orange-500 to-red-600",
  },
];

export const DEPARTMENTS = [
  { name: "Computer Science", attendance: 92 },
  { name: "Electrical Engineering", attendance: 88 },
  { name: "Mechanical Engineering", attendance: 85 },
  { name: "Civil Engineering", attendance: 90 },
  { name: "Business Administration", attendance: 86 },
];

export const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "students", label: "Students", icon: Users },
  { id: "faculty", label: "Faculty", icon: GraduationCap },
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "settings", label: "Settings", icon: Settings },
];

export const FACULTY_NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    label: "My Courses",
    icon: BookOpen,
  },
  {
    id: "attendance",
    label: "Mark Attendance",
    icon: CheckCircle,
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
];

// Fixed: Changed ClipboardList to CheckCircle (ClipboardList wasn't imported)
export const STUDENT_NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "attendance", label: "Attendance", icon: CheckCircle },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "profile", label: "Profile", icon: User },
];

export const QUICK_ACTIONS = [
  {
    icon: FileText,
    label: "View Reports",
    color: "from-cyan-500 to-blue-600",
    shadow: "cyan",
  },
  {
    icon: Download,
    label: "Export Data",
    color: "from-purple-500 to-indigo-600",
    shadow: "purple",
  },
  {
    icon: Clock,
    label: "Schedule",
    color: "from-green-500 to-emerald-600",
    shadow: "green",
  },
];

// NEW: Student Quick Actions (required by StudentDashboard)
export const STUDENT_QUICK_ACTIONS = [
  {
    label: "Mark Attendance",
    icon: QrCode,
    color: "from-cyan-500 to-blue-600",
  },
  {
    label: "View Reports",
    icon: FileText,
    color: "from-purple-500 to-indigo-600",
  },
  {
    label: "Download Certificate",
    icon: Download,
    color: "from-green-500 to-emerald-600",
  },
];

// BONUS: Faculty Quick Actions (for future use)
export const FACULTY_QUICK_ACTIONS = [
  {
    label: "Mark Attendance",
    icon: CheckCircle,
    color: "from-cyan-500 to-blue-600",
  },
  {
    label: "View Classes",
    icon: BookOpen,
    color: "from-purple-500 to-indigo-600",
  },
  {
    label: "Generate Report",
    icon: FileText,
    color: "from-green-500 to-emerald-600",
  },
];
