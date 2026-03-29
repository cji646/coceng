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
      
      {/* 1. 상단 헤더: 폰에서는 로고 크기를 줄여서 안 잘리게 함 */}
      <header className="p-6 md:p-10 border-b-[6px] md:border-b-8 border-black">
        <Link href="/" className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 inline-block hover:text-black">← 제품 목록</Link>
        <h1 className="text-6xl sm:text-8xl md:text-[200px] font-black italic leading-[0.85] tracking-tighter uppercase text-center md:text-left">
          COCENG
        </h1>
      </header>

      {/* 2. 중앙 콘텐츠: 폰에서는 세로 배치, 컴퓨터에선 가로 배치 */}
      <main className="flex-1 p-6 md:p-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* 이미지 영역 */}
          <div className="flex-1 bg-gray-100 aspect-square flex items-center justify-center rounded-3xl border-2 border-black overflow-hidden shadow-2xl">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-black text-gray-300">IMAGE</span>
            )}
          </div>

          {/* 정보 영역 */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4 tracking-tighter uppercase">
              {product.name}
            </h2>
            
            <p className="text-2xl md:text-3xl font-bold text-gray-400 italic mb-12 md:mb-20">
              {product.price}
            </p>
            
            <div className="border-t-[6px] md:border-t-8 border-black pt-10">
              <p className="text-xl md:text-2xl font-black uppercase mb-6 italic text-gray-300 tracking-widest text-center md:text-left">Description</p>
              
              <p className="text-3xl md:text-5xl font-bold leading-tight whitespace-pre-wrap">
                {product.description || "상세 설명 준비 중입니다."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 3. 하단 검은색 베너: 전화번호가 폰에서 안 넘어가게 크기 조절 */}
      <footer className="mt-auto bg-black text-white p-12 md:p-32">
        <div className="max-w-[1600px] mx-auto">
          {/* 폰에서 COCENG 로고 크기 조절 */}
          <p className="text-6xl sm:text-8xl md:text-[150px] font-black italic uppercase leading-none mb-12 md:mb-16 tracking-tighter text-center md:text-left">
            COCENG
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="w-full md:w-auto text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold text-gray-400 mb-2">Order & Contact</p>
              {/* [중요] text-5xl로 시작해서 폰에서도 한 줄에 나오게 함 */}
              <p className="text-5xl sm:text-6xl md:text-9xl font-black tracking-tighter">
                010-5398-0851
              </p>
            </div>
            
            <p className="text-2xl md:text-5xl font-bold italic text-gray-500 underline underline-offset-8 w-full md:w-auto text-center md:text-right">
              Chief Engineer Choi Jun-gil
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}