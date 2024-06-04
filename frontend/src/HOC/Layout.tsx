import * as React from 'react';
import Home from '../containers/Home/Home';
import Navbar from '../containers/Navbar/Navbar';
import AvatarMenu from '../components/AvatarMenu/AvatarMenu';

export interface ILayoutProps {
  children: React.ReactNode;

}

export default function Layout (props: ILayoutProps) {
  
  return (
    <div className='relative bg-neutral-900'>
        <div className='bg-zinc-900 h-full w-full overflow-hidden relative' style={{ width: '100%' }}>
          <Navbar loggedIn={AvatarMenu}/>
          <main>{props.children}</main>
        </div>
    </div>
  );
}


