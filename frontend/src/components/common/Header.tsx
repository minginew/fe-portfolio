import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='animation-opacity font-museo fixed top-0 z-50 h-auto w-full text-lg font-[300] drop-shadow-md select-none'>
      <nav className='bg-main-gray-100 flex h-14 w-full flex-wrap items-center justify-between px-3 py-1'>
        <div className='flex items-center gap-1 opacity-70'>
          <img
            className='h-8 hover:cursor-pointer'
            onClick={toggleMenu}
            alt='menu'
            src='src/assets/icons/ui/menu.png'
          />
          <img className='h-8' alt='logo' src='src/assets/icons/ui/dark_logo.png' />
        </div>
      </nav>

      <aside
        className={`bg-main-gray-100 fixed top-0 left-0 z-50 w-60 transition-all duration-800 md:w-80 ${
          menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[100%] opacity-60'
        }`}
        onClick={() => {
          if (menuOpen) toggleMenu();
        }}
      >
        <div className='flex w-full justify-center py-5 shadow-xs'>
          <img className='h-8' alt='logo' src='src/assets/icons/ui/dark_logo.png' />
        </div>
        <ul className='flex h-svh w-full flex-col items-center gap-4 pt-8 pb-5 text-2xl'>
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
        className={`fixed top-0 left-0 z-40 h-svh w-full bg-black transition-opacity duration-800 ${menuOpen ? 'visible opacity-60' : 'invisible opacity-0'} `}
        onClick={() => {
          if (menuOpen) toggleMenu();
        }}
      ></div>
    </header>
  );
};

export default Header;
