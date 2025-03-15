import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
import Skill from './Skill';
import Education from './Education';
import Certificate from './Certificate';
import profile from '@images/sonmingi1.png';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(aboutRef);
  return (
    <article className='flex h-full w-full max-w-6xl flex-col items-center pt-25 pb-10 text-white'>
      <div ref={aboutRef} className='mb-10 flex w-full flex-col items-center'>
        <div className='text-5xl font-[500]'>ABOUT</div>
        <div className='flex w-full flex-col items-center md:mb-15 md:flex-row md:justify-center md:gap-10'>
          <div className='mt-10 rounded-xl'>
            <img className='h-80 w-72 rounded-[10px] bg-gray-200 object-cover' alt='Profile' src={profile} />
          </div>
          <div className='mb-15 pt-5 text-[18px] md:pt-10'>
            <div className='mt-10'>
              <span className='text-[24px]'>introduce</span>
              <div className='w-80 break-words'>
                <p> kfkfkffkfkfkfkfkfkfdsdsdsdsdsasdsadasdasdfkfkfkkdsdsdsdsdsdsdf</p>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-[1fr_2.5fr]'>
              <div className=''>name</div>
              <div>손민기</div>
              <div>birth</div>
              <div>1997.07.26</div>
              <div>tel</div>
              <div>010-7531-7734</div>
              <div>e-mail</div>
              <div>thsalsrl7531@naver.com </div>
            </div>
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
