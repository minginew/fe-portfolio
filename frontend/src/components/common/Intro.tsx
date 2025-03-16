import { useRef } from 'react';
import Logo1 from '../../assets/images/Logo1.svg?react';
import Logo2 from '../../assets/images/Logo2.svg?react';

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={introRef} className='relative flex h-full w-full items-center justify-center'>
      <div className='animation-border'>
        <span className='flex flex-col items-center justify-center'>
          <Logo2 className='animation-svg-draw h-auto w-40 sm:w-48' />
          <Logo1 className='animation-svg-fill w-22 sm:w-26' />
        </span>
      </div>
    </div>
  );
};
export default Intro;
