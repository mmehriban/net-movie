import * as React from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import videoBg from '../../assets/videos/video1.mp4';
import axios from 'axios';

export interface IMylistItemProps {
  openMovieDetailOfClick: (movieId: string) => void;
}

export default function MylistItem(props: IMylistItemProps) {
  const [isMovieDetailOpen, setIsMovieDetailOpen] = React.useState(false);
  const { openMovieDetailOfClick }: any = props;
  const [userMovielist, setUserMovieList] = React.useState([]);

// start liked-movies checked
const [likedMoviesList, setLikedMoviesList] = React.useState<string[]>([]); 
    
React.useEffect(() => {
  async function getLikedMoviesList() {
    const authToken = localStorage.getItem('token');
    if(authToken){
      const response = await axios.get('http://127.0.0.1:8000/api/liked-movies/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      const likedMovieIds = response.data.map((movie: any) => movie.id);
      setLikedMoviesList(likedMovieIds);
    }
  };
  getLikedMoviesList();
}, []);
// end liked-movies checked

const addToLikedMovies = async (movieId: any) => {
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/like-movie/${movieId}/`, {}, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    setLikedMoviesList((prevList) => [...prevList, movieId]); 
  } catch (error) {
    console.error('Failed to add movie to liked movies', error);
  }
};

const removeFromLikedMovies = async (movieId: any) => {
  const authToken = localStorage.getItem('token');
  if (!authToken) {
    throw new Error('Authentication token not found');
  }
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/unlike-movie/${movieId}/`, {}, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    setLikedMoviesList((prevList) => prevList.filter((id) => id !== movieId)); 
  } catch (error) {
    console.error('Failed to remove movie from liked movies', error);
  }
};

  React.useEffect(() => {
    async function getUserMovieList() {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          throw new Error('Authentication token not found');
        }
        console.log('Authentication token:', authToken);
        if(authToken){
          const response = await axios.get('http://127.0.0.1:8000/api/liked-movies/', {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          });
          setUserMovieList(response.data);
        }
      } catch (error) {
        console.error('Error fetching user movie list:', error);
      }
    }
    getUserMovieList();
  }, []);

  React.useEffect(() => {
    const handleFullScreenChange = () => {
      const video = document.querySelector('video');
      if (video && !document.fullscreenElement) {
        video.pause();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handlePlayClickMyList = () => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.requestFullscreen();
      video.play();
    }
    console.log('Play button clicked');
  };


  return (
    <div className='grid grid-cols-6 gap-3 text-white duration-500'>
      {userMovielist.map((item: any) => (
        <div key={item.id} className='group rounded-md relative h-[8vw] mb-10'>
          <img
            src={item.image}
            alt=""
            className='
              w-full
              h-[8vw]
              cursor-pointer
              object-cover
              overflow-hidden
              rounded-md
              transition
              duration
              shadow-xl
              group-hover:opacity-90
              sm:group-hover:opacity-0
              delay-300
              z-20
            '
          />
          <div className='
            opacity-0
            absolute
            top-0
            transition
            duration-200
            z-20
            invisible
            sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-150
            group-hover:-translate-y-[4vw]
            group-hover:opacity-100
          '>
            <div className=''>
              <video
                style={{ height: '100%', width: '100%', objectFit: 'cover', zIndex: 0, borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                src={videoBg}
                autoPlay
                loop
                muted
                onEnded={(e) => {
                  const target = e.target as HTMLVideoElement;
                  if (target) {
                    target.currentTime = 0;
                  }
                }}
              />
            </div>
            <div className='
              z-30
              bg-zinc-800
              absolute
              w-full
              transition
              shadow-md
              rounded-b-md
              p-3
            '>
              <div>
                <div className='flex justify-between items-center'>
                  <div className='flex'>
                    <div onClick={handlePlayClickMyList}>
                      <PlayCircleFilledIcon className='hover:opacity-70 transition duration-200 cursor-pointer pr-1' style={{ width: '35px', height: '35px' }} />
                    </div>
                    {likedMoviesList.includes(item.id) ? (
                      <div>
                        <CheckCircleIcon onClick={() => removeFromLikedMovies(item.id)} 
                        className='hover:opacity-70 transition duration-200 cursor-pointer pr-1' style={{ width: '35px', height: '35px' }} />
                      </div>)
                      :
                      (<div>
                        <AddCircleIcon onClick={() => addToLikedMovies(item.id)} 
                        className='hover:opacity-70 transition duration-200 cursor-pointer pr-1' style={{ width: '35px', height: '35px' }} />
                      </div>)
                    }
                  </div>
                  <ExpandCircleDownRoundedIcon
                    onClick={() => openMovieDetailOfClick(item.id)}
                    className='hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                    style={{ width: '35px', height: '35px' }}
                  />
                </div>
                <p style={{ fontSize: '10px' }} className='text-xs font-semibold text-green-400 pt-1'>
                  Best of <span className='text-white'>{item.release_date.slice(0, 4)}</span>
                  <span style={{ fontSize: '10px', borderWidth: '1px' }} className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>+6</span>
                  <span className='text-gray-400 ml-2 font-light'>1h 50min</span>
                  <span style={{ fontSize: '10px', borderWidth: '1px' }} className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>HD</span>
                </p>
              </div>
              <div style={{ fontSize: '10px' }} className='flex justify-row items-center text-white'>
                <span className='pr-2'>{item.genre_info[0].title}</span>
                <span className='pr-2'>{item.genre_info[1].title}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
