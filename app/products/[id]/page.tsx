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
    return <div className="p-20 text-center font-bold text-gray-400">제품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. 상단 헤더: 폰/컴퓨터 로고 크기 최적화 */}
      <header className="p-5 md:p-10 border-b-[4px] md:border-b-8 border-black">
        <Link href="/" className="text-sm md:text-xl font-bold text-gray-400 mb-2 md:mb-6 inline-block hover:text-black tracking-tight">← 제품 목록</Link>
        <h1 className="text-5xl sm:text-7xl md:text-[200px] font-black italic leading-[0.8] tracking-tighter uppercase text-left">
          COCENG
        </h1>
      </header>

      {/* 2. 중앙 콘텐츠 영역 */}
      <main className="flex-1 p-5 md:p-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="flex-1 bg-gray-100 aspect-square flex items-center justify-center rounded-2xl md:rounded-3xl border-2 border-black overflow-hidden shadow-2xl">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl md:text-4xl font-black text-gray-300 tracking-widest uppercase italic">IMAGE</span>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-2 tracking-tighter uppercase">
              {product.name}
            </h2>
            <p className="text-xl md:text-3xl font-bold text-gray-400 italic mb-10 md:mb-20">
              {product.price}
            </p>
            <div className="border-t-[4px] md:border-t-8 border-black pt-8">
              <p className="text-lg md:text-2xl font-black uppercase mb-4 italic text-gray-300 tracking-widest">Description</p>
              <p className="text-2xl md:text-5xl font-bold leading-snug whitespace-pre-wrap tracking-tight">
                {product.description || "상세 설명 준비 중입니다."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. 하단 검은색 푸터: 컴퓨터와 폰에서 절대 글자가 안 잘리게 너비 확보 */}
      <footer className="mt-auto bg-black text-white p-8 md:p-32">
        <div className="max-w-[1600px] mx-auto">
          {/* 푸터 로고 */}
          <p className="text-5xl sm:text-8xl md:text-[150px] font-black italic uppercase leading-none mb-10 md:mb-16 tracking-tighter">
            COCENG
          </p>
          
          {/* flex-row 유지 및 items-end 정렬로 컴퓨터에서 가로 정렬 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            
            {/* 전화번호 섹션: flex-shrink-0으로 공간 부족해도 글자 유지 */}
            <div className="flex-shrink-0">
              <p className="text-lg md:text-3xl font-bold text-gray-400 mb-1 tracking-tight">Order & Contact</p>
              <p className="text-[32px] sm:text-6xl md:text-[120px] font-black tracking-tighter whitespace-nowrap leading-none">
                010-5398-0851
              </p>
            </div>
            
            {/* 엔지니어 이름 섹션: md:text-right로 컴퓨터에서 우측 정렬 */}
            <div className="w-full md:w-auto text-left md:text-right border-t border-gray-800 md:border-none pt-6 md:pt-0 flex-shrink-0">
              <p className="text-xl sm:text-3xl md:text-5xl font-bold italic text-gray-500 underline underline-offset-8 whitespace-nowrap">
                Chief Engineer Choi Jun-gil
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}