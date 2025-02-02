import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(aboutRef);
  return (
    <div ref={aboutRef} className='flex h-[1000px] w-full items-center justify-center bg-red-900'>
      <span className='text-5xl'>About</span>
    </div>
  );
};

export default About;
