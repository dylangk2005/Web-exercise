import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Đăng Ký Tài Khoản',
  description: 'Biểu mẫu đăng ký tài khoản với xác thực Zod và Server Actions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
