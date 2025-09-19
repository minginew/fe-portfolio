import ProjectViewer from '@components/blog/ProjectViewer';
import { useNavigate, useParams } from 'react-router-dom';

const AdminProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleProjectEdit = () => {
    navigate(`/admin/project/edit/${id}`);
  };
  return (
    <div className='relative flex h-auto min-h-screen w-full max-w-6xl flex-col justify-center px-8 py-5'>
      <ProjectViewer />
      <div className='fixed right-6 bottom-4 flex h-12 w-full max-w-6xl flex-row-reverse'>
        <button
          className='cursor-pointer rounded-md bg-blue-400 px-3 py-1 text-white hover:bg-blue-400 sm:bg-blue-200'
          onClick={handleProjectEdit}
        >
          수정 하기
        </button>
      </div>
    </div>
  );
};
export default AdminProjectDetail;
