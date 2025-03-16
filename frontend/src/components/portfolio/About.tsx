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
            <img
              className='h-80 w-72 rounded-[10px] bg-gray-200 object-cover md:h-88 md:w-80'
              alt='Profile'
              src={profile}
            />
          </div>
          <div className='mb-5 flex flex-col items-center text-[18px] md:items-baseline'>
            <div className='my-10 grid grid-cols-[1fr_2.5fr] pt-5 md:mb-5'>
              <div className=''>name</div>
              <div>손민기</div>
              <div>birth</div>
              <div>1997.07.26</div>
              <div>tel</div>
              <div>010-7531-7734</div>
              <div>e-mail</div>
              <div>thsalsrl7531@naver.com </div>
            </div>
            <div className='mb-2 text-[20px] font-bold'>꾸준하게 성장하는 개발자</div>
            <div className='w-[400px] break-words opacity-45'>
              <p>
                사용자의 의사결정과 원활한 서비스 이용을 돕는 직관적인 웹서비스를 구축하는 것에 흥미를 느껴 프론트엔드
                개발을 시작했습니다.
              </p>
              <p>기본기를 기르고자 SSAFY에 입과하여 코딩 교육과정과 프로젝트에서 프론트엔드 경험을 쌓았습니다.</p>
              <p>
                현재는 더 빠르고 향상된 사용자 경험을 제공하는 서비스를 만들고자 웹 성능 최적화를 학습하고 있습니다.
              </p>
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
