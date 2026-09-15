//viewer
import HtmlViewer from '@components/blog/HtmlViewer';

//Project API
import { useGetPostByIdQuery } from '@redux/api/postApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKST } from '@util/date';

const PostViewer = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [createAt, setCreateAt] = useState<string>('');

  //초기값 query
  const { data: initailState } = useGetPostByIdQuery(postId, {
    skip: postId === -1,
  });

  //url param 가져오기
  useEffect(() => {
    if (id) {
      setPostId(parseInt(id));
    }
  }, [id]);

  //Project viewer 초기값
  useEffect(() => {
    if (initailState) {
      setTitle(initailState.title);
      setTags([...initailState.tags]);
      setCreateAt(initailState.createAt);
    }
  }, [initailState]);
  // project의 id를 받아온다
  // query를 이용해 데이터를 받는다.
  // 뿌린다.

  return (
    <div className='flex h-full w-full flex-col gap-3'>
      <div className='my-3 text-4xl font-bold text-gray-800' data-testid='detail-title'>
        {title}
      </div>
      <div className='flex items-center px-1 font-medium text-gray-400'>
        <span>{getKST(createAt)?.data}</span>
      </div>
      <div className='flex items-center font-medium'>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
          {tags.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className='mt-3 border-t-1 border-gray-500 pt-10'>
        <HtmlViewer html={initailState?.content ?? ''} />
      </div>
    </div>
  );
};

export default PostViewer;
