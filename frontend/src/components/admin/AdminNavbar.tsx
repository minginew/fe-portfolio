import { useNavigate } from 'react-router-dom';
import whiteLogo from '@icons/ui/white_logo.webp';

const AdminNavbar = () => {
  const navigator = useNavigate();
  return (
    <header className='font-museo fixed top-0 z-50 flex h-auto w-full justify-center bg-black/60 text-lg font-[300] drop-shadow-md select-none'>
      <nav className='flex h-14 w-full max-w-6xl flex-wrap items-center justify-between px-3 py-1'>
        <img alt='logo' className='h-10' src={whiteLogo} />
        <div className='flex gap-5 text-2xl text-white sm:text-3xl'>
          <button className='cursor-pointer' onClick={() => navigator('project')}>
            <span>PROJECT</span>
          </button>
          <button className='cursor-pointer' onClick={() => navigator('post')}>
            <span>POST</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
export default AdminNavbar;
