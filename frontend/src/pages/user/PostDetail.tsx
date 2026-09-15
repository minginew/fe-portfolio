import PostViewer from '@components/blog/PostViewer';
import ArrowBack from '@icons/ui/arrow_back.svg?react';
import { useNavigate } from 'react-router-dom';
const PostDetail = () => {
  const navigate = useNavigate();
  const handlePostList = () => {
    navigate(`/post`);
  };
  return (
    <div className='relative flex h-auto min-h-screen w-full max-w-6xl flex-col justify-center px-8 py-5'>
      <PostViewer />
      <div className='fixed right-6 bottom-6 flex h-12'>
        <button
          className='h-12 w-12 cursor-pointer rounded-full bg-blue-400 pl-4 hover:bg-blue-400 sm:bg-blue-200'
          onClick={handlePostList}
          aria-label='뒤로 가기'
        >
          <ArrowBack width={24} height={24} aria-hidden='true' focusable='false' />
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
