import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className='bg-main-gray-100 font-museo flex h-svh w-full flex-col items-center justify-center gap-4'>
      <p className='text-5xl font-bold text-gray-800'>{isNotFound ? '404' : 'Error'}</p>
      <p className='text-gray-500'>{isNotFound ? '페이지를 찾을 수 없습니다.' : '문제가 발생했습니다.'}</p>
      <Link to='/portfolio' className='text-main-blue underline'>
        포트폴리오로 돌아가기
      </Link>
    </div>
  );
};

export default ErrorPage;
