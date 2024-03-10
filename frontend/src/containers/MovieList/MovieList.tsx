import * as React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';

export interface IMovieListProps {
}

export default function MovieList (props: IMovieListProps) {
  const [isMoved, setIsMoved] = React.useState(false)
  const [slideNumber, setSlideNumber] = React.useState(0)

  const listRef : any = useRef()

  const handleClick = (direction: string) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 64
    if (direction === 'left' && slideNumber > 0){
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${260*6 + distance}px)`
    }
    if (direction === 'right' && slideNumber < 3){
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-260*6 + distance}px)`
    }
    // console.log(distance);
    console.log(slideNumber);

  }

  return (
    
      <div className='mt-10' style={{width: '100%'}}>
        <div className='text-3xl ml-16 mb-5 mt-5 text-gray-50'>Continue watching</div>
        <div className='relative flex w-full'>
            {/* 1680 -  */}
            <div className=''>
              <ArrowBackIosIcon className='z-10 rounded-r-md absolute left-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer left' 
              onClick={() => handleClick('left')} 
              style={{height: '100%', width: '54px', display: isMoved ? 'block' : 'none'}}/>
            </div>

            <div className='flex ml-16 text-white translate-x-0 duration-500'  ref={listRef}> 
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
            </div>

            <div className=''>
              <ArrowForwardIosIcon className='z-10 rounded-l-md absolute right-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer right' 
              onClick={() => handleClick('right')} 
              style={{height: '100%', width: '54px'}}/>
            </div>
          
        </div>
      </div>
    
  );
}
