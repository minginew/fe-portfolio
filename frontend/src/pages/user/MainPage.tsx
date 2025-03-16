import Header from '../../components/common/Header';
import Intro from '../../components/common/Intro';
import Footer from '@components/common/Footer';
import background from '@images/background_white.jpg';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAnimationEnd } from '../../hooks/useAnimation';
import { ROUTES } from '@/routes/router';

const MainPage = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [introEnd, setIntroEnd] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname === '/' && introEnd) {
      navigator('portfolio');
    }
    if (
      pathname.startsWith(ROUTES.POST) ||
      pathname.startsWith(ROUTES.PROJECT) ||
      pathname.startsWith(ROUTES.PORTFOLIO)
    ) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleActiveButton = () => {
    mainRef.current?.classList.remove('pointer-events-none');
  };

  const handleMlogEnter = () => {
    setIntroEnd(true);
    mainRef.current?.classList.remove('overflow-hidden', 'h-svh');
  };

  useAnimationEnd(buttonRef, handleActiveButton);

  return (
    <div
      ref={mainRef}
      id='mainpage'
      className={`bg-main-gray-100 ${location.pathname === '/' ? 'pointer-events-none h-svh overflow-hidden' : ''} flex w-full flex-col justify-center`}
    >
      {location.pathname === '/' ? (
        <div
          className={`fixed top-0 left-0 z-[9999] flex h-svh w-full flex-col items-center p-5 transition-all duration-2000 ${introEnd ? 'invisible -translate-y-full' : 'visible translate-y-0'}`}
          style={{
            backgroundImage: `url(${background})`,
          }}
        >
          <Intro />
          <div
            ref={buttonRef}
            className='animation-opacity hover:bg-main-blue absolute bottom-12 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-blue-400'
          >
            <div className='text-sm font-medium text-white' onClick={handleMlogEnter}>
              Click!
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className='relative z-[9990]'>
        <Header />
        <main className='mt-14 flex h-auto w-full justify-center'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default MainPage;
