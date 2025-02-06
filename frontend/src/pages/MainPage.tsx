import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Intro from '../components/common/Intro';
import { useState } from 'react';

const MainPage = () => {
  const [introEnd, setIntroEnd] = useState<boolean>(false);
  const handleIntroEnd = () => {
    setIntroEnd(true);
  };
  return (
    <div id='mainpage' className='bg-main-gray-100 flex w-full flex-col justify-center'>
      <div
        className={`bg-main-gray-100 fixed top-0 left-0 z-[9999] flex h-svh w-full flex-col items-center p-2 transition-all duration-2000 ${introEnd ? 'invisible -translate-y-full' : 'visible translate-y-0'}`}
      >
        <Intro />
        <div className='animation-opacity md:bg-main-gray-200 md:hover:bg-main-blue absolute bottom-12 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue-400'>
          <div className='text-sm font-medium text-white' onClick={handleIntroEnd}>
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
