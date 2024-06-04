import * as React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import MylistItem from '../MylistItem/MylistItem';
import axios from 'axios';
import Footer from '../Footer/Footer';
import MovieDetail from '../MovieDetail/MovieDetail';


export interface IMyListProps {

}

export default function MyList (props: IMyListProps) {
  // open movie detail
  const [isMovieDetailOpen, setIsMovieDetailOpen] = React.useState(false);
  const [selectedMovieId, setSelectedMovieId] = React.useState<string | null>(null);

  const openMovieDetailOf = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsMovieDetailOpen(!isMovieDetailOpen);
    window.scrollTo(0, 0);
    // console.log('clicked');
  };


  return (
    <div className='bg-zinc-900 h-full w-full'>
        <div className='mt-40'>
            <div className=''>
                <h1 className='text-4xl ml-16 mb-5 mt-5 text-gray-50 font-semibold'>My List</h1>
            </div>
            <div className='m-16 pb-96 mt-40'>
                <div className=''> 
                    <MylistItem openMovieDetailOfClick={openMovieDetailOf}/>

                </div>
            </div>
        </div>
        {isMovieDetailOpen && selectedMovieId && <MovieDetail movieId={selectedMovieId}/>}

        <div className='pt-96'>
            <Footer />
        </div>
    </div>
  );
}
