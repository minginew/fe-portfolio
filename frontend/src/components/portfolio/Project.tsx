import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
import { useGetProjectsQuery } from '../../redux/api/projectApi';
import Card from './Card';

const Project = () => {
  const projectRef = useRef<HTMLDivElement>(null);
  const { data } = useGetProjectsQuery();
  useFadeAnimation(projectRef);
  return (
    <div
      ref={projectRef}
      className='flex h-[1500px] w-full flex-col items-center overflow-y-hidden text-white md:h-[1000px]'
    >
      <div className='h-32 text-5xl font-[500]'>PROJECT</div>
      <div className='flex w-full flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16'>
        {data?.map((project) => {
          return <Card key={project.projectId} data={project} />;
        })}
      </div>
    </div>
  );
};

export default Project;
