import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Project = () => {
  const projectRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(projectRef);
  return (
    <div
      ref={projectRef}
      className='bg-main-gray-100 flex w-full flex-col items-center overflow-y-hidden pt-25 text-[#2c2c2c]'
    >
      <div className='text-5xl font-[500]'>PROJECT</div>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
      <span className='text-2xl'>텍스트</span>
    </div>
  );
};

export default Project;
