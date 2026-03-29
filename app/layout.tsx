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
      <body className={inter.className}>
        {/* 페이지 콘텐츠 영역 */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* 회사 정보 푸터 (모든 페이지 공통 적용) */}
        <footer className="bg-gray-100 border-t p-10 text-gray-600">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-xl font-bold text-black mb-4">COCEng (씨오씨엔지)</h1>
              <p className="text-sm leading-relaxed">
                본 사이트는 제품 소개를 위한 온라인 카탈로그이며,<br />
                사이트 내에서 직접적인 결제 및 판매는 이루어지지 않습니다.
              </p>
            </div>
            
            <div className="text-sm space-y-2">
              <p><strong>대표:</strong> 최준길</p>
              <p><strong>사업자등록번호:</strong> 841-18-00783</p>
              <p><strong>연락처:</strong> 010-5398-0851</p>
              <p><strong>주소:</strong> 서울특별시 종로구 청계천로 159 세운상가 가동 나열 148호</p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t text-center text-xs text-gray-400">
            © 2026 COCEng. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}