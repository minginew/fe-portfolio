import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(certificateRef);
  return (
    <div ref={certificateRef} className='relative mb-20 h-[500px] w-full'>
      <span className='absolute left-[50%] -translate-x-[50%] text-4xl'>Certificate</span>
    </div>
  );
};

export default Certificate;
