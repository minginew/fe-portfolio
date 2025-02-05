import About from '../../components/portfolio/About';
import Award from '../../components/portfolio/Award';
import Certificate from '../../components/portfolio/Certificate';
import Education from '../../components/portfolio/Education';
import Project from '../../components/portfolio/Project';
import Skill from '../../components/portfolio/Skill';
import Logo1 from '../../assets/images/Logo1.svg?react';
import Logo2 from '../../assets/images/Logo2.svg?react';
import { useAnimationEnd } from '../../hooks/useAnimation';
import { useRef } from 'react';

const PortfolioPage = () => {
  const landingRef = useRef<HTMLDivElement>(null);
  const handleScrollOpen = () => {
    document.getElementById('mainpage')?.classList.remove('overflow-hidden');
  };
  useAnimationEnd(landingRef, handleScrollOpen);

  return (
    <div ref={landingRef} className='h-auto w-full'>
      <section>
        <div className='font-museo flex h-svh w-full flex-col items-center justify-center gap-1 pb-10'>
          <Logo2 className='animation-svg-draw h-auto w-[55%]' />
          <Logo1 className='animation-svg-fill w-[30%]' />
          <text className='animation-opacity text-2xl font-[100] text-gray-600'>Frontend Portfoilo / Blog</text>
          <span className='animation-opacity absolute bottom-0 flex flex-col items-center'>
            <text className='text-main-blue text-md font-[400]'>Scroll Down</text>
            <img
              className='bg-nones w-10 animate-bounce'
              alt='scroll_down_icon'
              src='src/assets/icons/ui/scrolldown.png'
            />
          </span>
        </div>
      </section>
      <section className='bg-[#2c2c2c]'>
        <About />
      </section>
      <section className='bg-orange-300'>
        <Skill />
      </section>
      <section className='bg-yellow-300'>
        <Education />
      </section>
      <section className='bg-green-300'>
        <Award />
      </section>
      <section className='bg-blue-300'>
        <Certificate />
      </section>
      <section className='bg-purple-300'>
        <Project />
      </section>
    </div>
  );
};
export default PortfolioPage;
