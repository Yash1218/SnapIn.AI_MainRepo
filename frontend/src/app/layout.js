import "./globals.css";

export const metadata = {
  title: "Attendance Management System",
  description: "Automated attendance tracking for educational institutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
