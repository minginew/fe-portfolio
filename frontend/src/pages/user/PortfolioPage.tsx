import About from '@components/portfolio/About';
import Hero from '@components/portfolio/Hero';
import Project from '@components/portfolio/Project';
import GitHubIcon from '@icons/brand/Github-Light.svg';
import scrollup from '@icons/ui/scrollup.svg';

import { useRef } from 'react';
import { useScrollFadeAnimation } from '@/hooks/useAnimation';

const PortfolioPage = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpenGitHub = () => {
    window.open('https://github.com/minginew');
  };

  const handlescrollToTop = () => {
    if (parentRef.current) {
      parentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useScrollFadeAnimation(parentRef, scrollRef);

  return (
    <div className='font-museo bg-main-gray-100 w-full'>
      <section className='sticky top-0 z-0 h-svh p-3'>
        <Hero />
      </section>
      <div ref={parentRef} className='bg-main-black-100 relative h-auto w-full rounded-3xl pb-50'>
        <section className='relative z-1 flex w-full justify-center'>
          <About />
        </section>
        <section className='relative z-1'>
          <Project />
        </section>
        <div
          ref={scrollRef}
          className='pointer-events-none invisible sticky bottom-30 z-20 flex w-full flex-col items-end gap-6 pr-5 opacity-0 transition-all duration-700 sm:visible'
        >
          <button
            className='bg-main-gray-100 h-14 w-14 cursor-pointer rounded-2xl shadow-lg hover:shadow-white/30'
            onClick={handlescrollToTop}
          >
            <img src={scrollup} className='w-14 object-cover' />
          </button>
          <button
            className='bg-main-gray-100 h-14 w-14 cursor-pointer rounded-2xl shadow-lg hover:shadow-white/30'
            onClick={handleOpenGitHub}
          >
            <img src={GitHubIcon} className='object-cover' />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PortfolioPage;
