import Logo1 from '../../assets/images/Logo1.svg?react';
import Logo2 from '../../assets/images/Logo2.svg?react';

const Hero = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Logo2 className='h-auto w-[55%]' />
      <Logo1 className='w-[30%]' />
      <span className='text-main-blue mt-3 text-2xl font-[400]'>Frontend Portfolio</span>
      <span className='animation-opacity absolute bottom-0 flex flex-col items-center'>
        <span className='text-main-gray-200 text-md font-[400]'>Scroll Down</span>
        <img className='w-10 animate-bounce' alt='scroll_down_icon' src='src/assets/icons/ui/scrolldown.png' />
      </span>
    </div>
  );
};
export default Hero;
