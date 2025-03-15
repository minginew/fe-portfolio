import PostViewer from '@/components/blog/PostViewer';
import { useNavigate, useParams } from 'react-router-dom';

const AdminPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handlePostEdit = () => {
    navigate(`/admin/post/edit/${id}`);
  };
  return (
    <div className='relative flex h-svh w-full flex-col justify-center p-5'>
      <PostViewer />
      <div className='fixed bottom-3 left-0 flex h-12 w-full flex-row-reverse px-3'>
        <button
          className='cursor-pointer rounded-md bg-blue-400 px-3 py-1 text-white hover:bg-blue-400 sm:bg-blue-200'
          onClick={handlePostEdit}
        >
          수정 하기
        </button>
      </div>
    </div>
  );
};
export default AdminPostDetail;
