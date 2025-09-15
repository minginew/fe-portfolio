import { useRef } from 'react';
import { useFadeAnimation } from '@hooks/useAnimation';
import { useGetProjectsQuery } from '@redux/api/projectApi';
import Card from '@components/portfolio/Card';

const Project = () => {
  const projectRef = useRef<HTMLDivElement>(null);
  const { data } = useGetProjectsQuery();
  useFadeAnimation(projectRef);
  return (
    <div ref={projectRef} className='flex h-auto w-full flex-col items-center overflow-y-hidden pb-20 text-white'>
      <div className='h-32 text-5xl font-[500]'>PROJECT</div>
      <div className='flex flex-col flex-wrap justify-around gap-10 md:flex-row md:justify-center md:gap-16 xl:w-full xl:max-w-svw'>
        {data?.map((project) => {
          return <Card key={project.projectId} data={project} />;
        })}
        {data && data.length % 2 === 1 ? <div className='invisible h-1 w-96 2xl:hidden'></div> : <></>}
      </div>
    </div>
  );
};

export default Project;
