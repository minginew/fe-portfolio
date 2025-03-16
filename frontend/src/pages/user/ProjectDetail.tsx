import ProjectViewer from '@/components/blog/ProjectViewer';
import arrowBack from '@icons/ui/arrow_back.svg';
import { useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className='relative flex h-auto min-h-screen w-full max-w-6xl flex-col justify-center px-8 py-5'>
      <ProjectViewer />
      <div className='fixed bottom-3 left-0 flex h-12 w-full flex-row-reverse px-3'>
        <button
          className='h-12 w-12 cursor-pointer rounded-full bg-blue-400 pl-4 hover:bg-blue-400 sm:bg-blue-200'
          onClick={handleGoBack}
        >
          <img src={arrowBack} alt='button' />
        </button>
      </div>
    </div>
  );
};
export default ProjectDetail;
