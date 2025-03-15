import ProjectViewer from '@/components/blog/ProjectViewer';

const ProjectDetail = () => {
  return (
    <div className='relative flex h-svh w-full flex-col justify-center p-5'>
      <ProjectViewer />
      <div className='fixed bottom-3 left-0 flex h-12 w-full flex-row-reverse px-3'></div>
    </div>
  );
};
export default ProjectDetail;
