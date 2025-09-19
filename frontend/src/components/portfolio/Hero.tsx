import Logo1 from '@images/Logo1.svg?react';
import Logo2 from '@images/Logo2.svg?react';
import scrolldown from '@icons/ui/scrolldown.svg';

const Hero = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center pb-20 sm:gap-2'>
      <Logo2 className='h-auto w-52 sm:w-64' />
      <Logo1 className='w-26 sm:w-30' />
      <span className='text-main-gray-200 mt-3 text-xl font-[400] sm:mt-6 sm:text-2xl'>Frontend Portfolio</span>
      <span className='animation-opacity absolute bottom-14 flex flex-col items-center'>
        <span className='text-main-blue text-md font-[400] sm:text-xl'>Scroll Down</span>
        <img className='w-10 animate-bounce sm:w-12' alt='scroll_down_icon' src={scrolldown} />
      </span>
    </div>
  );
};
export default Hero;
