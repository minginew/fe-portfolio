import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
import Skill from './Skill';
import Education from './Education';
import Certificate from './Certificate';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(aboutRef);
  return (
    <div className='flex h-full w-full flex-col items-center py-25 text-white'>
      <div ref={aboutRef} className='flex w-full flex-col items-center'>
        <div className='text-5xl font-[500]'>ABOUT</div>
        <div className='bg-main-gray-100 mt-10 w-72 rounded-xl'>
          <img className='rounded-xl' alt='Profile' src='src/assets/images/sonmingi1.png' />
        </div>
        <div className='bg-main-gray-100 mt-10 w-72 rounded-xl'>
          <img className='rounded-xl' alt='Profile' src='src/assets/images/sonmingi1.png' />
        </div>
        <div className='bg-main-gray-100 mt-10 w-72 rounded-xl'>
          <img className='rounded-xl' alt='Profile' src='src/assets/images/sonmingi1.png' />
        </div>
      </div>
      <Skill />
      <Education />
      <Certificate />
    </div>
  );
};

export default About;
