import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
import Skill from './Skill';
import Education from './Education';
import Certificate from './Certificate';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(aboutRef);
  return (
    <article className='flex h-full w-full flex-col items-center py-25 text-white'>
      <div ref={aboutRef} className='mb-10 flex w-full flex-col items-center'>
        <div className='text-5xl font-[500]'>ABOUT</div>
        <div className='flex w-full flex-col items-center'>
          <div className='mt-10 rounded-xl'>
            <img
              className='h-80 w-72 rounded-[10px] bg-gray-200 object-cover'
              alt='Profile'
              src='src/assets/images/sonmingi1.png'
            />
          </div>
          <div className='mt-10 grid grid-cols-[1fr_2.5fr] text-[18px]'>
            <div className=''>name</div>
            <div>손민기</div>
            <div>birth</div>
            <div>1997.07.26</div>
            <div>tel</div>
            <div>010-7531-7734</div>
            <div>e-mail</div>
            <div>thsalsrl7531@naver.com </div>
          </div>
          <div className='mt-10'>
            <div>자기소개</div>
            <div></div>
          </div>
        </div>
      </div>
      <Skill />
      <Education />
      <Certificate />
    </article>
  );
};

export default About;
