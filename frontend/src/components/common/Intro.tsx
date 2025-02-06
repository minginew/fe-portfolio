import { useRef, useState } from 'react';
import Logo1 from '../../assets/images/Logo1.svg?react';
import Logo2 from '../../assets/images/Logo2.svg?react';

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={introRef} className='border-main-blue flex h-full w-full flex-col items-center justify-center border'>
      <Logo2 className='animation-svg-draw h-auto w-[55%]' />
      <Logo1 className='animation-svg-fill w-[30%]' />
    </div>
  );
};
export default Intro;
