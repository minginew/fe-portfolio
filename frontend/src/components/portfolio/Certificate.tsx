import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(certificateRef);
  return (
    <div ref={certificateRef} className='relative h-[500px] w-full'>
      <span className='absolute left-10 text-3xl'>Certificate</span>
    </div>
  );
};

export default Certificate;
