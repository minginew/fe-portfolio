import { useRef } from 'react';
import { useFadeAnimation } from '../../hooks/useAnimation';
import { useGetProjectsQuery } from '../../redux/api/projectApi';
import Card from './Card';

const Project = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const { data } = useGetProjectsQuery();
  useFadeAnimation(titleRef);
  useFadeAnimation(projectRef);
  return (
    <div className='flex h-auto w-full flex-col items-center overflow-y-hidden pb-20 text-white'>
      <div ref={titleRef} className='h-32 text-5xl font-[500]'>
        PROJECT
      </div>
      <div
        ref={projectRef}
        className='flex flex-col flex-wrap justify-around gap-10 md:flex-row md:justify-center md:gap-16 xl:w-full xl:max-w-svw'
      >
        {data?.map((project) => {
          return <Card key={project.projectId} data={project} />;
        })}
        {data && data.length % 2 === 1 ? <div className='invisible h-1 w-96 2xl:hidden'></div> : <></>}
      </div>
    </div>
  );
};

export default Project;
