import Link from 'next/link';
import { supabase } from './lib/supabase'; // 상대 경로 점 두 개(..)가 현재 구조에 가장 안전합니다.

// 이 설정을 추가하면 DB 데이터가 바뀔 때마다 사이트에 바로 반영됩니다.
export const revalidate = 0; 

export default async function Home() {
  // 1. Supabase에서 데이터를 최신순(id 내림차순)으로 가져옵니다.
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('DB 연결 에러:', error.message);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-20 bg-white min-h-screen">
      {/* 상단 타이틀 부문 */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold italic mb-4 text-black tracking-tighter">
          COCEng Amp Company
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          세운상가 40년 전통의 최고의 음향 기술을 경험하세요.
        </p>
      </section>

      {/* 제품 목록 그리드 영역 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product.id} 
              className="group border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* 이미지 영역 */}
              <div className="bg-gray-50 h-72 flex items-center justify-center overflow-hidden border-b border-gray-50">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-300">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs italic font-medium uppercase tracking-widest">Image Pending</span>
                  </div>
                )}
              </div>
              
              {/* 제품 정보 설명 */}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 tracking-tight">{product.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-6">{product.price}</p>
                
                <Link href={`/products/${product.id}`}>
                  <div className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 cursor-pointer">
                    상세 정보 보기
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          /* 데이터가 없을 때의 화면 */
          <div className="col-span-full py-32 flex flex-col items-center justify-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-xl font-semibold text-gray-400">등록된 제품이 아직 없습니다.</p>
            <p className="text-gray-400 mt-2">Supabase 대시보드에서 첫 번째 제품을 등록해 보세요!</p>
          </div>
        )}
      </section>
    </main>
  );
}