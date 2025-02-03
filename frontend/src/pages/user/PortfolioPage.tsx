import About from '../../components/portfolio/About';
import Award from '../../components/portfolio/Award';
import Certificate from '../../components/portfolio/Certificate';
import Education from '../../components/portfolio/Education';
import Project from '../../components/portfolio/Project';
import Skill from '../../components/portfolio/Skill';
import Logo1 from '../../../public/images/Logo1.svg?react';
import Logo2 from '../../../public/images/Logo2.svg?react';

const PortfolioPage = () => {
  return (
    <div className='h-auto w-full'>
      <div className='font-museo flex h-svh w-full flex-col items-center py-15'>
        <Logo1 className='svg-icon' />
        <Logo2 className='svg-icon' />
        <span className='absolute bottom-0 flex flex-col items-center'>
          <text className='text-main-blue font-[300]'>Scroll Down</text>
          <img className='bg-nones w-10 animate-bounce' alt='scroll_down_icon' src='/icons/scrolldown.png' />
        </span>
      </div>
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
