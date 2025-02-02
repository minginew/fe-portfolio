import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='fixed top-0 z-50 h-8 w-full drop-shadow-md'>
      <nav className='flex flex-wrap items-center justify-between bg-white px-5 py-1'>
        <div className='flex items-center gap-4'>
          <img className='h-5 hover:cursor-pointer' onClick={toggleMenu} alt='logo' src='/icons/menu.png' />
          <img className='h-7' alt='logo' src='/icons/dark_logo.png' />
        </div>
      </nav>

      <aside
        className={`transition-['transform', 'opacity'] fixed top-0 left-0 z-50 w-56 bg-white duration-[1s,0.6s] ${
          menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[100%] opacity-60'
        }`}
        onClick={toggleMenu}
      >
        <div className='flex w-full justify-center py-5 shadow-xs'>
          <img className='h-8' alt='logo' src='/icons/dark_logo.png' />
        </div>
        <ul className='flex h-svh w-full flex-col items-center gap-4 pt-5 pb-5'>
          <li>
            <Link to={'/'} className='rounded-smpx-3 block py-2' aria-current='page'>
              PortPolio
            </Link>
          </li>
          <li>
            <Link to={'/project'} className='block rounded-sm px-3 py-2'>
              Project
            </Link>
          </li>
          <li>
            <Link to={'/post'} className='block rounded-sm px-3 py-2'>
              Post
            </Link>
          </li>
        </ul>
      </aside>
      <div
        className={`fixed top-0 left-0 z-40 h-svh w-svw bg-black transition-opacity duration-600 ${menuOpen ? 'opacity-50' : 'hidden opacity-0'}`}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default Header;
