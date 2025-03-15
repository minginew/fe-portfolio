import PostViewer from '@/components/blog/PostViewer';
import { useNavigate } from 'react-router-dom';
const PostDetail = () => {
  const navigate = useNavigate();
  const handlePostList = () => {
    navigate(`/post`);
  };
  return (
    <div className='relative flex h-svh w-full flex-col justify-center p-5'>
      <PostViewer />
      <div className='fixed bottom-3 left-0 flex h-12 w-full flex-row-reverse px-3'>
        <button
          className='cursor-pointer rounded-md bg-blue-400 px-3 py-1 text-white hover:bg-blue-400 sm:bg-blue-200'
          onClick={handlePostList}
        >
          {'<'}
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
