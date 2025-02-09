import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Education = () => {
  const educationRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(educationRef);
  return (
    <article ref={educationRef} className='mb-20 flex w-full flex-col items-center'>
      <div className='flex justify-center text-4xl'>
        <div>Education</div>
      </div>
      <div className='flex flex-col p-5 sm:flex-row sm:justify-center sm:gap-20 md:gap-10'>
        <div className='mt-5 flex flex-col rounded-3xl px-10 sm:w-auto sm:px-0'>
          <div className='sm:gap-3 md:flex'>
            <div className='text-main-blue text-[14px]'>2023.07 ~ 2024.07</div>
            <div className='text-[20px]'>삼성 청년 SW 아카데미</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[16px] opacity-60'>
            <span>비전공 java 교육과정 수료</span>
            <span>2학기 특화 프로젝트 우수상</span>
            <span>1학기 공통 프로젝트 최우수상</span>
          </div>
        </div>
        <div className='mt-10 flex flex-col rounded-3xl px-10 sm:w-auto sm:px-0'>
          <div className='sm:gap-3 md:flex'>
            <div className='text-main-blue text-[14px]'>2017.02 ~ 2023.02</div>
            <div className='text-[20px]'>한양대학교 erica</div>
          </div>
          <div className='mt-2 flex flex-col gap-0.5 text-[16px] opacity-60'>
            <span>응용수학 전공</span>
          </div>
        </div>
      </div>
      <div></div>
    </article>
  );
};

export default Education;
