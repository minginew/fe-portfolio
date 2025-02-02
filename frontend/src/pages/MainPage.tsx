import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const MainPage = () => {
  return (
    <div className='flex h-full w-full flex-col justify-center'>
      <Header />
      <main className='h-svh w-full'>
        <Outlet />
      </main>
    </div>
  );
};
export default MainPage;
