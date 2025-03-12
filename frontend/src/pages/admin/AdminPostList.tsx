import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../../redux/api/postApi';
import { getKST } from '../../hooks/useDate';

const AdminPostList = () => {
  const { data } = useGetPostsQuery();
  const navigator = useNavigate();
  const handleCreatePost = () => {
    navigator('edit');
  };
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='border-main-blue text-main-blue flex w-[90%] items-center justify-between border-b-4 px-2'>
        <div className='px-2 py-4 text-4xl font-bold'>Posts</div>
        <button
          className='hover:bg-main-blue h-10 cursor-pointer rounded-lg bg-blue-400 px-3 text-white'
          onClick={handleCreatePost}
        >
          <span>작성하기</span>
        </button>
      </div>
      <div className='my-5 flex w-full flex-col gap-4 px-2'>
        {data?.map((post) => (
          <div
            key={post.postId}
            className='relative flex h-52 w-full cursor-pointer flex-col rounded-lg bg-white p-5 drop-shadow-md'
            onClick={() => {
              navigator(`${post.postId}`);
            }}
          >
            <div className='text-xl font-bold'>{post.title}</div>
            <div className='text-main-gray-200'>{getKST(post.createAt).data}</div>
            <div>{post.content}</div>
            <div className='absolute bottom-3 flex gap-3'>
              {post.tags?.map((tag, index) => (
                <div key={index} className='rounded-2xl bg-blue-100 px-3 py-1 text-xs'>
                  {tag}
                </div>
              ))}
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPostList;
