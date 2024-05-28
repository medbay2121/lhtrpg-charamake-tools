import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LHキャラコマ生成所",
  description: "冒険者idからココフォリアのコマが生成できます",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0"></meta></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const viewport = 'width=device-width, initial-scale=1';
