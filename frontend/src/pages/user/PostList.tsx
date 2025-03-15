import { useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../../redux/api/postApi';
import { getKST } from '../../hooks/useDate';
import { useGetText } from '@/hooks/useParser';

const PostList = () => {
  const { data } = useGetPostsQuery();
  const navigator = useNavigate();

  return (
    <div className='flex w-full flex-col items-center px-2'>
      <div className='border-main-blue text-main-blue mb-5 flex h-28 w-full items-center justify-between border-b-1 px-2'>
        <div className='font-museo px-2 py-4 text-4xl font-bold'>POST</div>
      </div>
      <div className='my-5 flex w-full flex-col gap-4 px-2'>
        {data?.map((post) => (
          <div
            key={post.postId}
            className='relative flex h-44 w-full cursor-pointer flex-col rounded-lg bg-white p-5 drop-shadow-md'
            onClick={() => {
              navigator(`${post.postId}`);
            }}
          >
            <div className='text-xl font-bold'>{post.title}</div>
            <div className='text-main-gray-200'>{getKST(post.createAt)?.data}</div>
            <div className='my-1 [display:-webkit-box] overflow-hidden text-ellipsis whitespace-pre-line [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>
              {useGetText(post.content)}
            </div>
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

export default PostList;
