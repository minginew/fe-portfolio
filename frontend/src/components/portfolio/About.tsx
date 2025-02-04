import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(aboutRef);
  return (
    <div ref={aboutRef} className='font-museo flex h-[1000px] w-full flex-col items-center pt-25 text-white'>
      <div className='text-5xl font-[500]'>ABOUT</div>
      <div className='bg-main-gray-100 mt-10 w-72 rounded-4xl'>
        <img className='rounded-4xl' alt='Profile' src='/images/sonmingi1.png' />
      </div>
    </div>
  );
};

export default About;
