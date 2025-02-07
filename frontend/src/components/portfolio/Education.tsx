import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Education = () => {
  const educationRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(educationRef);
  return (
    <div ref={educationRef} className='relative h-[500px] w-full'>
      <span className='absolute left-10 text-2xl'>education</span>
    </div>
  );
};

export default Education;
