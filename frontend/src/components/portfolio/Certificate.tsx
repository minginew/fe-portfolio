import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(certificateRef);
  return (
    <div ref={certificateRef} className='flex h-[1000px] w-full items-center justify-center bg-blue-900'>
      <span className='text-5xl'>Certificate</span>
    </div>
  );
};

export default Certificate;
