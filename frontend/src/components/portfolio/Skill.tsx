import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Skill = () => {
  const skillRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(skillRef);
  return (
    <div ref={skillRef} className='flex h-[1000px] w-full items-center justify-center bg-orange-900'>
      <span className='text-5xl'>Skill</span>
    </div>
  );
};

export default Skill;
