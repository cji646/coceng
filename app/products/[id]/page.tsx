import { supabase } from '../../lib/supabase'; 
import Link from 'next/link';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return <div className="p-20 text-center">제품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. 상단: 로고 크기 유지 */}
      <header className="p-10 border-b-4 border-black">
        <Link href="/" className="text-xl font-bold text-gray-400 mb-6 inline-block">← 제품 목록</Link>
        <h1 className="text-[120px] md:text-[200px] font-black italic leading-none tracking-tighter uppercase">
          COCENG
        </h1>
      </header>

      {/* 2. 중앙 콘텐츠 */}
      <main className="flex-1 p-10 md:p-20">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* 그림 칸: 그대로 유지 */}
          <div className="flex-1 bg-gray-100 aspect-square flex items-center justify-center rounded-3xl border-2 border-black overflow-hidden shadow-2xl">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-gray-300">IMAGE</span>
            )}
          </div>

          {/* 정보 칸: 글자 크기 집중 수정 */}
          <div className="flex-1 flex flex-col justify-center">
            {/* [수정] 제품명: 상세 설명 본문(4xl)과 동일한 크기 */}
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tighter">
              {product.name}
            </h2>
            
            {/* [수정] 가격: 상세 설명 본문의 절반 크기 */}
            <p className="text-2xl font-bold text-gray-400 italic mb-20">
              {product.price}
            </p>
            
            <div className="border-t-8 border-black pt-10">
              {/* [수정] Description 제목: 상세 설명 본문의 절반 크기 */}
              <p className="text-2xl font-black uppercase mb-6 italic text-gray-300">Description</p>
              
              {/* 기준이 되는 상세 설명 본문 크기 */}
              <p className="text-4xl md:text-5xl font-bold leading-tight whitespace-pre-wrap">
                {product.description || "상세 설명 준비 중입니다."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. 검은색 베너: 그대로 유지 */}
      <footer className="mt-auto bg-black text-white p-16 md:p-32">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-[80px] md:text-[150px] font-black italic uppercase leading-none mb-16">COCENG</p>
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div>
              <p className="text-3xl font-bold text-gray-400 mb-2">Order & Contact</p>
              <p className="text-7xl md:text-9xl font-black">010-5398-0851</p>
            </div>
            <p className="text-3xl md:text-5xl font-bold italic text-gray-500 underline underline-offset-8">
              Chief Engineer Choi Jun-gil
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}