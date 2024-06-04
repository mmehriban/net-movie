import * as React from 'react';
import videoBg from '../../assets/videos/video1.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MovieList from '../MovieList/MovieList';
import Backdrop from '../../components/Backdrop/Backdrop';
import MovieDetail from '../MovieDetail/MovieDetail';
import MovieItem from '../MovieItem/MovieItem';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

export interface IHomeProps {
}

export default function Home(props: any) {
  const [isMovieDetailOpen, setIsMovieDetailOpen] = React.useState(false);
  const [selectedMovieId, setSelectedMovieId] = React.useState<string | null>(null);

  const openMovieDetailOf = (movieId: string) => {
    setSelectedMovieId(movieId);
    // setIsMovieDetailOpen(true);
    setIsMovieDetailOpen(!isMovieDetailOpen);
    window.scrollTo(0, 0);
  };

  const closeMovieDetail = () => {
    setSelectedMovieId(null);
    setIsMovieDetailOpen(false);
  };

  const [openMovieDetail, setOpenMovieDetail] = React.useState(false)

  const handleMovieDetailClick = (movieIds: any) =>{
    setOpenMovieDetail(!openMovieDetail)
    console.log('clicked');
    
  }

  const handleCloseMovieDetail = () => {
    setOpenMovieDetail(false);
  };


  const handlePlayClick = () => {

    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.requestFullscreen();
      video.play();
    }
    console.log('Play button clicked');
  };

  return (
    <div>
      <div className=''>
          <div className='relative' style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} >
            <video style={{ height: '100%', width: '100%', objectFit: 'cover', zIndex: 0 }} src={videoBg} autoPlay loop muted 
              onEnded={(e) => {
                const target = e.target as HTMLVideoElement;
                if (target) {
                  target.currentTime = 0;
                }
              }}/>
            <div className='absolute w-1/3 bottom-80 left-16 z-10 text-white'>
            <h1 className='text-7xl font-bold pt-5'>Spirited away</h1>
            <p className='text-lg pt-5'>During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.</p>
              <div className='flex text-gray-950 pt-5 text-xl'>
                <div className='mr-3 flex justify-center items-center w-32 h-12 rounded-md bg-white hover:bg-white/70 cursor-pointer' onClick={handlePlayClick}>
                  <PlayArrowIcon sx={{ fontSize: 45 }}/>
                  <h2 className='font-medium pl-1'>Play</h2>
                </div>
                <div onClick={() => openMovieDetailOf("2")} className='mr-3 flex justify-center items-center w-44 h-12 rounded-md bg-gray-400/45 hover:bg-gray-400/20 cursor-pointer text-white'>
                  <InfoOutlinedIcon sx={{ fontSize: 35 }}/>
                  <h2 className='font-medium pl-1' >More Info</h2>
                </div>
              </div>
            </div>
            {/* <div className='absolute top-3/4 left-0'>
              <MovieList openMovieDetailOf={openMovieDetailOf}/>
            </div> */}
          </div>
          <div className='mb-40'>
              <MovieList openMovieDetailOf={openMovieDetailOf}/>
          </div>
            {isMovieDetailOpen && selectedMovieId &&  <MovieDetail movieId={selectedMovieId} />}
      </div>
      {/* footer start */}
      <div>
          <Footer />
      </div>
      {/* footer end */}
    </div>
  );
}
