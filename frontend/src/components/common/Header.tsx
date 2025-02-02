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
          <span onClick={toggleMenu}>x</span>
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>M'Log</span>
        </div>
      </nav>

      <aside
        className={`transition-['transform', 'opacity'] fixed top-0 left-0 z-50 w-56 bg-white duration-[1s,0.6s] ${
          menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-[100%] opacity-60'
        }`}
        onClick={toggleMenu}
      >
        <div className='h-10 w-full'> Logo </div>
        <ul className='flex h-svh w-full flex-col items-center gap-4 pt-10 pb-5'>
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
