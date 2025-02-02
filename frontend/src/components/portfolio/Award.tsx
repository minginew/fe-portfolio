import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
const Award = () => {
  const awardRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(awardRef);
  return (
    <div ref={awardRef} className='flex h-[1000px] w-full items-center justify-center bg-green-900'>
      <span className='text-5xl'>Award</span>
    </div>
  );
};

export default Award;
