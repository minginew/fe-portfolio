import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';

const Project = () => {
  const projectRef = useRef<HTMLDivElement>(null);
  useFadeAnimation(projectRef);
  return (
    <div ref={projectRef} className='flex h-[1000px] w-full items-center justify-center bg-purple-900'>
      <span className='text-5xl'>Project</span>
    </div>
  );
};

export default Project;
