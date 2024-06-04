import * as React from 'react';
import netflixLogo from '../../assets/images/Netflix_logo.svg';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import clsx from 'clsx';
import { NavLink, Route, Routes } from 'react-router-dom';

export interface INavbarProps {
  loggedIn: any;
}

export default function Navbar(props: INavbarProps) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navActive = ({ isActive }: any) => {
    return isActive ? 'font-bold' : 'font-normal';
  };

  const handleScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    function isLoggedIn() {
      const authToken = localStorage.getItem('token');
      const loggedIn = authToken !== null && authToken !== undefined;
      setLoggedIn(loggedIn);
      return loggedIn;
    }
    isLoggedIn();
  }, [loggedIn]);

  // const handleSearch = async (query: string) => {
  //   // Implement the search logic here
  //   console.log('Search query:', query);
  //   // Example: fetch search results from the backend and update the state
  // };

  return (
    <div className={clsx('fixed top-0 w-full z-30 transition duration-300', { 'bg-black': isScrolled })}>
      <div className='pt-3 pb-3 pl-16 pr-16 bg-gradient-to-b from-gray-900 to-gray-600/5 flex items-center justify-between'>
        <div className='flex items-center'>
          <NavLink to={'/'} className='cursor-pointer'>
            <img src={netflixLogo} alt="Netflix logo" width={100} />
          </NavLink>
          <ul className='flex pl-7 text-slate-200 text-center text-sm'>
            <li className='pr-4 hover:text-gray-400 duration-500'>
              <NavLink className={navActive} to={'/'}>Home</NavLink>
            </li>
            <li className='pr-4 hover:text-gray-400 duration-500'>
              <NavLink className={navActive} to={'/mylist'}>My List</NavLink>
            </li>
            <li className='pr-4 hover:text-gray-400 duration-500'>
              <NavLink className={navActive} to={'/movies-search/'}>Search</NavLink>
            </li>
          </ul>
        </div>
        <div className='flex items-center'>
          {/* <div>
            <Routes>
              <Route path='/search/' element={<SearchBar onSearch={handleSearch} />} />
            </Routes>
          </div> */}

          {loggedIn ? (
            <AvatarMenu />
          ) : (
            <div className='ml-7 cursor-pointer rounded-md hover:opacity-80' style={{ backgroundColor: '#e50815' }}>
              <NavLink className='font-semibold text-sm text-white flex items-center pr-7 pl-7 pt-2 pb-2' to={'/login'}>Login</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
