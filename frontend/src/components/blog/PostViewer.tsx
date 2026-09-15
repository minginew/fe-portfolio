//viewer
import HtmlViewer from '@components/blog/HtmlViewer';
import DetailSkeleton from '@components/common/DetailSkeleton';

//Project API
import { useGetPostByIdQuery } from '@redux/api/postApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getKST } from '@util/date';

const PostViewer = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState<number>(-1);

  //초기값 query
  const { data: initailState, isLoading } = useGetPostByIdQuery(postId, {
    skip: postId === -1,
  });

  //url param 가져오기
  useEffect(() => {
    if (id) {
      setPostId(parseInt(id));
    }
  }, [id]);
  // project의 id를 받아온다
  // query를 이용해 데이터를 받는다.
  // 뿌린다.

  //데이터 도착 전(초기 id 파싱 대기 포함)에는 스켈레톤으로 덮어 "빈 값→채움" CLS를 막는다.
  if (!initailState && (postId === -1 || isLoading)) {
    return <DetailSkeleton />;
  }

  //postId 확정 후 로딩이 끝났는데도 데이터가 없다면(예: 조회 실패) 스켈레톤을 계속 띄우지 않고 최소한의 빈 레이아웃을 렌더한다.
  if (!initailState) {
    return <div className='flex h-full w-full flex-col gap-3' />;
  }

  return (
    <div className='flex h-full w-full flex-col gap-3'>
      <div className='my-3 text-4xl font-bold text-gray-800' data-testid='detail-title'>
        {initailState.title}
      </div>
      <div className='flex items-center px-1 font-medium text-gray-400'>
        <span>{getKST(initailState.createAt)?.data}</span>
      </div>
      <div className='flex items-center font-medium'>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
          {initailState.tags.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className='mt-3 border-t-1 border-gray-500 pt-10'>
        <HtmlViewer html={initailState.content} />
      </div>
    </div>
  );
};

export default PostViewer;
