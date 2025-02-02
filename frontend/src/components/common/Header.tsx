import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='font-museo fixed top-0 z-50 h-8 w-full text-lg font-[300] drop-shadow-sm'>
      <nav className='flex flex-wrap items-center justify-between px-5 py-1'>
        <div className='flex items-center gap-4'>
          <img className='h-5 hover:cursor-pointer' onClick={toggleMenu} alt='logo' src='/icons/menu.png' />
          <img className='h-7' alt='logo' src='/icons/dark_logo.png' />
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-50 w-56 transition-all duration-800 ${
          menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[100%] opacity-60'
        }`}
        onClick={toggleMenu}
      >
        <div className='flex w-full justify-center py-5 shadow-xs'>
          <img className='h-8' alt='logo' src='/icons/dark_logo.png' />
        </div>
        <ul className='flex h-svh w-full flex-col items-center gap-4 pt-5 pb-5'>
          <li>
            <Link to={'/'} className='hover:text-main-blue block px-3 py-2' aria-current='page'>
              PORTFOLIO
            </Link>
          </li>
          <li>
            <Link to={'/project'} className='hover:text-main-blue block px-3 py-2'>
              PROJECT
            </Link>
          </li>
          <li>
            <Link to={'/post'} className='hover:text-main-blue block px-3 py-2'>
              POST
            </Link>
          </li>
        </ul>
      </aside>
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-screen bg-black transition-all duration-800 ${menuOpen ? 'visible opacity-60' : 'invisible opacity-0'} `}
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

export default Header;
