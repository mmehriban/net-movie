import * as React from 'react';
import Home from '../containers/Home/Home';
import Navbar from '../containers/Navbar/Navbar';
import MovieList from '../containers/MovieList/MovieList';

export interface ILayoutProps {
  // children: React.ReactNode;
}

export default function Layout (props: ILayoutProps) {
  return (
    <div className='bg-zinc-900 min-h-screen w-full overflow-x-hidden' style={{ width: '100%' }}>
      <Navbar />
      <Home />

    </div>
  );
}
