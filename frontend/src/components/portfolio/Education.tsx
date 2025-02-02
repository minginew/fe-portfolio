import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Education = () => {
  const educationRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(educationRef);
  return (
    <div ref={educationRef} className='flex h-[1000px] w-full items-center justify-center bg-yellow-900'>
      <span className='text-5xl'>Education</span>
    </div>
  );
};

export default Education;
