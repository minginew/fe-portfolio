//viewer
import HtmlViewer from '@components/blog/HtmlViewer';
import DetailSkeleton from '@components/common/DetailSkeleton';

//Project API
import { useGetProjectByIdQuery } from '@redux/api/projectApi';

//react
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import GitHubIcon from '@icons/brand/Github-Dark.svg';

const ProjectViewer = () => {
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number>(-1);

  //초기값 query
  const { data: initailState, isLoading } = useGetProjectByIdQuery(projectId, {
    skip: projectId === -1,
  });

  //url param 가져오기
  useEffect(() => {
    if (id) {
      setProjectId(parseInt(id));
    }
  }, [id]);
  // project의 id를 받아온다
  // query를 이용해 데이터를 받는다.
  // 뿌린다.

  //데이터 도착 전(초기 id 파싱 대기 포함)에는 스켈레톤으로 덮어 "빈 값→채움" CLS를 막는다.
  if (!initailState && (projectId === -1 || isLoading)) {
    return <DetailSkeleton />;
  }

  //projectId 확정 후 로딩이 끝났는데도 데이터가 없다면(예: 조회 실패) 스켈레톤을 계속 띄우지 않고 최소한의 빈 레이아웃을 렌더한다.
  if (!initailState) {
    return (
      <div className='flex h-full w-full flex-col gap-4'>
        <p className='py-10 text-gray-500' data-testid='detail-empty'>
          프로젝트를 찾을 수 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <div className='my-3 text-4xl font-bold text-gray-800' data-testid='detail-title'>
        {initailState.title}
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-32 text-gray-600'>프로젝트 기간</span>
        <div className='flex w-full gap-2 pl-4'>
          <div>{initailState.startDate}</div>
          <>~</>
          <div>{initailState.endDate}</div>
        </div>
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-32 text-gray-600'>기술 스택</span>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
          {initailState.techstack.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className='flex items-center font-medium'>
        <span className='w-32 text-gray-600'>담당 역할</span>
        <div className='flex w-full gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
          {initailState.roles.map((tag, index) => {
            return (
              <span className='rounded-2xl bg-blue-100 px-3 py-1 text-xs text-blue-600' key={index}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      <a
        href={initailState.gitHub}
        target='_blank'
        rel='noopener noreferrer'
        className='group mt-3 flex pl-1 font-medium'
      >
        <img
          src={GitHubIcon}
          alt='github icon'
          className='w-7 opacity-70 transition-opacity duration-300 group-hover:opacity-100'
        />
        <p className='mx-2 text-xl font-bold text-gray-500 transition-colors duration-300 group-hover:text-gray-800'>
          GitHub Repository
        </p>
      </a>

      <div className='mt-3 border-t-1 border-gray-500 pt-10'>
        <HtmlViewer html={initailState.content} />
      </div>
    </div>
  );
};
export default ProjectViewer;
