import {
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
  { label: "Dashboard", icon: BarChart3 },
  { label: "My Courses", icon: BookOpen },
  { label: "Mark Attendance", icon: CheckCircle },
  { label: "Schedule", icon: Calendar },
  { label: "Settings", icon: Settings },
];

export const STUDENT_NAV = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "My Attendance", icon: CheckCircle },
  { label: "Reports", icon: FileText },
  { label: "Schedule", icon: Calendar },
  { label: "Settings", icon: Settings },
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
