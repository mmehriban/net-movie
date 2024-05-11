import * as React from 'react';
import Home from '../containers/Home/Home';
import Navbar from '../containers/Navbar/Navbar';
import MovieList from '../containers/MovieList/MovieList';
import MovieDetail from '../containers/MovieDetail/MovieDetail';
import MyList from '../containers/MyList/MyList';
import Register from '../containers/Register/Register';
import Login from '../containers/Login/Login';
import Backdrop from '../components/Backdrop/Backdrop';
import MovieItem from '../containers/MovieItem/MovieItem';

export interface ILayoutProps {
  children: React.ReactNode;

}

export default function Layout (props: ILayoutProps) {
  
  return (
    <div className='relative'>

        <div className='bg-zinc-900 h-full w-full overflow-hidden relative' style={{ width: '100%' }}>
          <Navbar />
          <main>{props.children}</main>
        </div>
    </div>
  );
}


