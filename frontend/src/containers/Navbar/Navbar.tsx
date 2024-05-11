import * as React from 'react';
import netflixLogo from '../../assets/images/Netflix_logo.svg'
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu'
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const isLoggedIn = () => {
    // Check if there is an authentication token in localStorage
    const authToken = localStorage.getItem('authToken');
    // Return true if authToken exists and is not null or undefined
    const loggedIn = authToken !== null && authToken !== undefined;
    setLoggedIn(loggedIn);
    return loggedIn;
  };

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

  // Call isLoggedIn on component mount to set the initial state
  React.useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className={clsx('fixed top-0 w-full z-30 transition duration-300', { 'bg-black': isScrolled })}>
      <div className='pt-3 pb-3 pl-16 pr-16 bg-gradient-to-b from-gray-900 to-gray-600/5 flex items-center justify-between'>
        <div className='flex items-center'>
          <NavLink to={'/'} className='cursor-pointer'>
            <img src={netflixLogo} alt="Spotify logo" width={100}/>
          </NavLink>
          <ul className='flex pl-7 text-slate-200 text-center text-sm'>
            <li className='pr-4 hover:text-gray-400 duration-500'>
              <NavLink className={navActive} to={'/'}>Home</NavLink>
            </li>
            {/* <li className='pr-4 hover:text-gray-400 duration-500'><a href=''>Latest</a></li> */}
            <li className='pr-4 hover:text-gray-400 duration-500'>
              <NavLink className={navActive} to={'/mylist'}>My List</NavLink>
            </li>
            <li className='pr-4 hover:text-gray-400 duration-500'><a href="">Search</a></li>
          </ul>
        </div>
        <div className='flex items-center'>
          {
            !loggedIn ? (
              <div className='ml-7 cursor-pointer rounded-md hover:opacity-80' style={{backgroundColor: '#e50815'}}>
                <NavLink className='font-semibold text-sm text-white flex items-center pr-7 pl-7 pt-2 pb-2' to={'/login'}>Login</NavLink>
              </div>
            ) : (
              <div className='flex justify-center align-middle'>
                <AvatarMenu />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
