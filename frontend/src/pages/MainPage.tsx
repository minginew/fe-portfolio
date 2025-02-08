import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Intro from '../components/common/Intro';
import { useRef, useState } from 'react';
import { useAnimationEnd } from '../hooks/useAnimation';

const MainPage = () => {
  //redux-persist 로 대체할 예정
  const [introEnd, setIntroEnd] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleActiveButton = () => {
    console.log('버튼 활성화');
    mainRef.current?.classList.remove('pointer-events-none');
  };

  const handleMlogEnter = () => {
    setIntroEnd(true);
    console.log('스크롤 활성화됨');
    mainRef.current?.classList.remove('overflow-hidden');
  };
  // 버튼 누르면 Settion에 저장
  // 버튼 누르면 스크롤 막기 해제

  useAnimationEnd(buttonRef, handleActiveButton);
  return (
    <div
      ref={mainRef}
      id='mainpage'
      className='bg-main-gray-100 pointer-events-none flex w-full flex-col justify-center overflow-hidden'
    >
      <div
        className={`bg-main-gray-100 fixed top-0 left-0 z-[9999] flex h-svh w-full flex-col items-center p-5 transition-all duration-2000 ${introEnd ? 'invisible -translate-y-full' : 'visible translate-y-0'}`}
      >
        <Intro />
        <div
          ref={buttonRef}
          className='animation-opacity md:bg-main-gray-200 md:hover:bg-main-blue absolute bottom-12 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-blue-400'
        >
          <div className='text-sm font-medium text-white' onClick={handleMlogEnter}>
            Click!
          </div>
        </div>
      </div>
      <div className='relative z-[9998]'>
        <Header />
        <main className='h-svh w-full'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default MainPage;
