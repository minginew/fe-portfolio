import { useState } from 'react';
import { Link } from 'react-router-dom';
import darkLogo from '@icons/ui/dark_logo.png';
import whiteLogo from '@icons/ui/white_logo.png';
import menu2 from '@icons/ui/menu2.svg';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='font-museo fixed top-0 z-50 flex h-auto w-full justify-center bg-black/60 text-lg font-[300] drop-shadow-md select-none'>
      <nav className='flex h-14 w-full max-w-6xl flex-wrap items-center justify-between px-3 py-1'>
        <div className='flex items-center gap-2'>
          <img className='h-8 hover:cursor-pointer' onClick={toggleMenu} alt='menu' src={menu2} />
          <img className='h-10' alt='logo' src={whiteLogo} />
        </div>
      </nav>

      <aside
        className={`bg-main-gray-100 fixed top-0 left-0 z-50 w-60 transition-all duration-500 md:w-80 ${
          menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[100%] opacity-60'
        }`}
        onClick={() => {
          if (menuOpen) toggleMenu();
        }}
      >
        <div className='flex w-full justify-center py-5 shadow-xs'>
          <img className='h-8' alt='logo' src={darkLogo} />
        </div>
        <ul className='flex h-svh w-full flex-col items-center gap-4 pt-8 pb-5 text-2xl'>
          <li>
            <Link to={'/portfolio'} className='hover:text-main-blue block px-3 py-2' aria-current='page'>
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
        className={`fixed top-0 left-0 z-40 h-svh w-full bg-black transition-opacity duration-500 ${menuOpen ? 'visible opacity-60' : 'invisible opacity-0'} `}
        onClick={() => {
          if (menuOpen) toggleMenu();
        }}
      ></div>
    </header>
  );
};

export default Header;
