import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Education = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(titleRef);
  useFadeAnimation(educationRef);
  return (
    <article ref={titleRef} className='mb-30 flex w-full max-w-5xl flex-col items-center'>
      <div className='flex justify-center text-4xl'>
        <div>Education</div>
      </div>
      <div ref={educationRef} className='flex w-full flex-col px-10 py-5'>
        <div className='border-main-gray-200 mt-10 flex flex-col border-b-1 border-dashed pb-5'>
          <div className='flex justify-between'>
            <div className='text-[18px]'>삼성 청년 SW 아카데미</div>
            <div className='text-main-blue text-[14px]'>2023.07 ~ 2024.07</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[14px] opacity-60'>
            <span>비전공 java 교육과정 수료</span>
            <span>2학기 특화 프로젝트 우수상</span>
            <span>1학기 공통 프로젝트 최우수상</span>
          </div>
        </div>
        <div className='border-main-gray-200 mt-10 flex flex-col border-b-1 border-dashed pb-5'>
          <div className='flex justify-between'>
            <div className='text-[18px]'>한양대학교 에리카</div>
            <div className='text-main-blue text-[14px]'>2017.02 ~ 2023.02</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[14px] opacity-60'>
            <span>응용수학 전공</span>
          </div>
        </div>
      </div>
      <div></div>
    </article>
  );
};

export default Education;
