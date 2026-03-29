"use client"; // [추가] 이 한 줄이 있어야 '우클릭 방지' 기능을 쓸 수 있습니다!

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body 
        className={`${inter.className} bg-white antialiased`}
        // [보안 기능] 이제 에러 없이 작동합니다!
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.key === "I") ||
            (e.ctrlKey && e.key === "u")
          ) {
            e.preventDefault();
          }
        }}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-white border-t py-12 px-6 text-gray-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-xl font-black text-black tracking-tighter uppercase italic">COCEng</h1>
                <p className="text-xs leading-relaxed max-w-sm">
                  본 사이트는 제품 소개를 위한 온라인 카탈로그이며, 직접적인 결제는 이루어지지 않습니다.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-xs">
                <p><strong className="text-gray-600">대표:</strong> 최준길</p>
                <p><strong className="text-gray-600">연락처:</strong> 010-5398-0851</p>
                <p><strong className="text-gray-600">사업자번호:</strong> 841-18-00783</p>
                <p><strong className="text-gray-600">주소:</strong> 서울특별시 종로구 청계천로 159 세운상가 가동 나열 148호</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}