import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COCEng - 세운상가 프리미엄 앰프 시스템",
  description: "최고의 음향 기술, COCEng 앰프 제품 소개 사이트입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* [보안 기능 추가] 
          onContextMenu: 마우스 우클릭 방지
          onKeyDown: F12, 소스보기(Ctrl+U), 개발자도구(Ctrl+Shift+I) 차단 
      */}
      <body 
        className={`${inter.className} bg-white antialiased`}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.key === "I") ||
            (e.ctrlKey && e.shiftKey && e.key === "J") ||
            (e.ctrlKey && e.key === "u")
          ) {
            e.preventDefault();
          }
        }}
      >
        {/* 페이지 콘텐츠 영역 */}
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>

          {/* 회사 정보 푸터 
            상세 페이지의 검은 베너와 별개로, 사이트 전체 하단에 작게 들어가는 공식 정보입니다. 
          */}
          <footer className="bg-white border-t py-12 px-6 text-gray-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-xl font-black text-black tracking-tighter uppercase italic">COCEng</h1>
                <p className="text-xs leading-relaxed max-w-sm">
                  본 사이트는 제품 소개를 위한 온라인 카탈로그이며,<br />
                  직접적인 결제 및 판매는 이루어지지 않습니다. 모든 문의는 유선으로 부탁드립니다.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-xs">
                <p><strong className="text-gray-600">대표:</strong> 최준길</p>
                <p><strong className="text-gray-600">연락처:</strong> 010-5398-0851</p>
                <p><strong className="text-gray-600">사업자번호:</strong> 841-18-00783</p>
                <p><strong className="text-gray-600">주소:</strong> 서울특별시 종로구 청계천로 159 세운상가 가동 나열 148호</p>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-50 text-center text-[10px] tracking-widest uppercase">
              © 2026 COCEng. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}