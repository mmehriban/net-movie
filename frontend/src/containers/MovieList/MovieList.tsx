import * as React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export interface IMovieListProps {
  openMovieDetailOf: (movieId: string) => void;
}

interface SlideState {
  isMoved: boolean;
  slideNumber: number;
}

export default function MovieList(props: IMovieListProps) {
  const [playlistList, setPlaylistList] = React.useState([]);
  const [slideStates, setSlideStates] = React.useState<Record<string, SlideState>>({});
  const listRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { openMovieDetailOf }: any = props;

  React.useEffect(() => {
    async function getPlaylist() {
      const response = await axios.get('http://127.0.0.1:8000/api/playlist/');
      const playlists = response.data;
      setPlaylistList(playlists);
      const initialSlideStates: Record<string, SlideState> = {};
      playlists.forEach((playlist: any) => {
        initialSlideStates[playlist.id] = { isMoved: false, slideNumber: 0 };
      });
      setSlideStates(initialSlideStates);
    }
    getPlaylist();
  }, []);

  const handleClick = (itemId: string, direction: string) => {
    setSlideStates(prevStates => {
      const currentState = prevStates[itemId];
      if (!currentState) return prevStates;

      const newState = { ...currentState, isMoved: true };
      const currentRef = listRefs.current[itemId];
      if (currentRef) {
        const distance = currentRef.getBoundingClientRect().x - 64;
        if (direction === 'left' && currentState.slideNumber > 0) {
          newState.slideNumber -= 1;
          currentRef.style.transform = `translateX(${260 * 6 + distance}px)`;
        }
        if (direction === 'right' && currentState.slideNumber < 1) {
          newState.slideNumber += 1;
          currentRef.style.transform = `translateX(${-260 * 6 + distance}px)`;
        }
      }
      return { ...prevStates, [itemId]: newState };
    });
  };

  return (
    <div>
      {playlistList.map((item: any) => (
        <div key={item.id} className='mt-10' style={{ width: '100%' }}>
          <div className='text-3xl ml-16 mb-5 mt-5 text-gray-50'>{item.title}</div>
          <div className='pb-5'>
            <div className='relative flex w-full'>
              <div className=''>
                <ArrowBackIosIcon
                  className='z-10 rounded-r-md absolute left-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer left'
                  onClick={() => handleClick(item.id, 'left')}
                  style={{
                    height: '100%',
                    width: '54px',
                    display: slideStates[item.id]?.isMoved ? 'block' : 'none'
                  }}
                />
              </div>

              <MovieItem item={item} openMovieDetailOf={openMovieDetailOf} ref={el => (listRefs.current[item.id] = el)} />

              <div className=''>
                <ArrowForwardIosIcon
                  className='z-10 rounded-l-md absolute right-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer right'
                  onClick={() => handleClick(item.id, 'right')}
                  style={{ height: '100%', width: '54px' }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
