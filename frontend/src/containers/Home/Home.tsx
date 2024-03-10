import * as React from 'react';
import videoBg from '../../assets/videos/video1.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MovieList from '../MovieList/MovieList';

export interface IHomeProps {
}

export default function Home(props: IHomeProps) {


  return (
    <div>
      <div className=''>
          <div className='relative' style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} >
            <video style={{ height: '100%', width: '100%', objectFit: 'cover', zIndex: 0 }} src={videoBg} autoPlay loop muted />
            <div className='absolute w-1/3 bottom-80 left-16 z-10 text-white'>
            <h1 className='text-7xl font-bold pt-5'>Name of the movie</h1>
            <p className='text-lg pt-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio harum maiores architecto, quis suscipit sed.</p>
              <div className='flex text-gray-950 pt-5 text-xl'>
                <div className='mr-3 flex justify-center items-center w-32 h-12 rounded-md bg-white hover:bg-white/70 cursor-pointer'>
                  <PlayArrowIcon sx={{ fontSize: 45 }}/>
                  <h2 className='font-medium pl-1'>Play</h2>
                </div>
                <div className='mr-3 flex justify-center items-center w-44 h-12 rounded-md bg-gray-400/45 hover:bg-gray-400/20 cursor-pointer text-white'>
                  <InfoOutlinedIcon sx={{ fontSize: 35 }}/>
                  <h2 className='font-medium pl-1'>More Info</h2>
                </div>
              </div>
            </div>
            {/* <div className='absolute top-3/4 left-0'>
              <MovieList />
            </div> */}
          </div>
          <div className='mb-96'>
              <MovieList />
              <MovieList />
          </div>

      </div>
    </div>
  );
}
