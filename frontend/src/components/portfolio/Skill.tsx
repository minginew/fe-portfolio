import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Skill = () => {
  const skillRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(skillRef);
  return (
    <div ref={skillRef} className='relative h-[500px] w-full'>
      <span className='absolute left-10 text-2xl'>SKILL</span>
    </div>
  );
};

export default Skill;
