import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Certificate = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(titleRef);
  useFadeAnimation(certificateRef);
  return (
    <article ref={titleRef} className='mb-30 flex w-full max-w-5xl flex-col items-center'>
      <div className='flex justify-center text-4xl'>
        <div>certificate</div>
      </div>
      <div ref={certificateRef} className='flex w-full flex-col px-10 py-5'>
        <div className='border-main-gray-200 mt-10 flex flex-col border-b-1 border-dashed pb-5'>
          <div className='flex justify-between'>
            <div className='text-[18px]'>정보처리기사</div>
            <div className='text-main-blue text-[14px]'>2024.09.10</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[14px] opacity-60'>
            <span>한국산업인력공단</span>
          </div>
        </div>
        <div className='border-main-gray-200 mt-10 flex flex-col border-b-1 border-dashed pb-5'>
          <div className='flex justify-between'>
            <div className='text-[18px]'>SQLD</div>
            <div className='text-main-blue text-[14px]'>2024.09.20</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[14px] opacity-60'>
            <span>한국데이터산업진흥원</span>
          </div>
        </div>
      </div>
      <div></div>
    </article>
  );
};

export default Certificate;
