import { useNavigate } from 'react-router-dom';
import whiteLogo from '@icons/ui/white_logo.png';

const AdminNavbar = () => {
  const navigator = useNavigate();
  return (
    <nav className='font-museo flex h-12 w-full items-center justify-between gap-4 bg-black/60 px-4 text-lg font-extralight text-white drop-shadow-md'>
      <img alt='logo' className='h-9' src={whiteLogo} />
      <div className='flex gap-5'>
        <button className='cursor-pointer' onClick={() => navigator('project')}>
          <span>PROJECT</span>
        </button>
        <button className='cursor-pointer' onClick={() => navigator('post')}>
          <span>POST</span>
        </button>
      </div>
    </nav>
  );
};
export default AdminNavbar;
