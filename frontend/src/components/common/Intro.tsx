import { useRef, useState } from 'react';
import Logo1 from '../../assets/images/Logo1.svg?react';
import Logo2 from '../../assets/images/Logo2.svg?react';

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={introRef} className='relative flex h-full w-full items-center justify-center'>
      <div className='animation-border'>
        <span className='flex flex-col items-center justify-center'>
          <Logo2 className='animation-svg-draw h-auto w-[65%]' />
          <Logo1 className='animation-svg-fill w-[30%]' />
        </span>
      </div>
    </div>
  );
};
export default Intro;
