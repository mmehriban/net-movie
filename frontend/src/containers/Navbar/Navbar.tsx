import * as React from 'react';
import netflixLogo from '../../assets/images/Netflix_logo.svg'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu'
import clsx from 'clsx';

export interface INavbarProps {
}

export default function Navbar (props: INavbarProps) {

  const [isScrolled, setIsScrolled] = React.useState(false)

  const handleScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className={clsx('fixed top-0 w-full z-40 transition duration-300', { 'bg-black': isScrolled })}>
      <div className='pt-3 pb-3 pl-16 pr-16 bg-gradient-to-b from-gray-900 to-gray-600/5 flex items-center justify-between'>
        <div className='flex items-center'>
         <div className='cursor-pointer'><img src={netflixLogo} alt="Spotify logo" width={100}/></div>
         <ul className='flex pl-7 text-slate-200 text-center text-sm'>
          <li className='pr-4 hover:text-gray-400 duration-500'><a href="">Home</a></li>
          <li className='pr-4 hover:text-gray-400 duration-500'><a href="">Latest</a></li>
          <li className='pr-4 hover:text-gray-400 duration-500'><a href="">My List</a></li>
          <li className='pr-4 hover:text-gray-400 duration-500'><a href="">Search</a></li>
         </ul>
        </div>
        <div className='flex items-center'>
          <SearchOutlinedIcon className='text-white cursor-pointer hover:text-gray-400 duration-500 mr-4' />
          <NotificationsNoneOutlinedIcon className='text-white cursor-pointer hover:text-gray-400 duration-500' />
         <div className='flex justify-center align-middle'>
          <AvatarMenu />
         </div>

        </div>
      </div>

      
    </div>
  );
}
