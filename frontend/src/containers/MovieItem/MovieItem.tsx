import React, { forwardRef, useEffect, useState } from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import axios from 'axios';

export interface IMovieItemProps {
  item: any;
  openMovieDetailOf: (movieId: string) => void;
}

const MovieItem = forwardRef<HTMLDivElement, IMovieItemProps>((props, ref) => {
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const [likedMoviesList, setLikedMoviesList] = useState<string[]>([]); 
  const { item, openMovieDetailOf }: any = props;

  useEffect(() => {
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

  const handleExpandClick = (movieId: string) => {
    setIsMovieDetailOpen(!isMovieDetailOpen);
    openMovieDetailOf(movieId);
    window.scrollTo(0, 0);
  };

  const handlePlayClick = () => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.requestFullscreen();
      video.play();
    }
  };

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
  

  return (
    <div className='flex ml-16 text-white translate-x-0 duration-500' ref={ref}>
      {item.movie_list.map((movie: any) => (
        <div key={movie.id} className=''>
          <div className='group rounded-md relative h-32' style={{ width: '250px', marginRight: '10px' }}>
            <img
              src={movie.image}
              alt=""
              className='w-full h-32 cursor-pointer object-cover overflow-hidden rounded-md transition duration shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 z-20'
            />
            <div
              className='opacity-0 absolute top-0 transition duration-200 z-20 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-150 group-hover:-translate-y-[4vw] group-hover:opacity-100'
            >
              <img
                src={movie.image}
                alt=""
                className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-32'
              />
              <div className='z-30 bg-zinc-800 absolute w-full transition shadow-md rounded-b-md p-3'>
                <div className='' onClick={() => {}}>
                  <div className='flex justify-between items-center'>
                    <div>
                      <PlayCircleFilledIcon
                        className='hover:opacity-70 transition duration-200 cursor-pointer pr-1'
                        style={{ width: '35px', height: '35px' }}
                        onClick={handlePlayClick}
                      />
                      {likedMoviesList.includes(movie.id) ? (
                        <CheckCircleIcon onClick={() => removeFromLikedMovies(movie.id)} 
                          className='hover:opacity-70 transition duration-200 cursor-pointer pr-1'
                          style={{ width: '35px', height: '35px' }}
                        />
                      ) : (
                        <AddCircleIcon onClick={() => addToLikedMovies(movie.id)} 
                          className='hover:opacity-70 transition duration-200 cursor-pointer pr-1'
                          style={{ width: '35px', height: '35px' }}
                        />
                      )}
                    </div>
                    <div>
                      <ExpandCircleDownRoundedIcon
                        onClick={() => handleExpandClick(movie.id)}
                        className='hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                        style={{ width: '35px', height: '35px' }}
                      />
                    </div>
                  </div>
                  <p
                    style={{ fontSize: '10px' }}
                    className='text-xs font-semibold text-green-400 pt-1'
                  >
                    Best of <span className='text-white'>{movie.release_date.slice(0, 4)}</span>
                    <span
                      style={{ fontSize: '10px', borderWidth: '1px' }}
                      className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'
                    >
                      +6
                    </span>
                    <span className='text-gray-400 ml-2 font-light'>1h 50min</span>
                    <span
                      style={{ fontSize: '10px', borderWidth: '1px' }}
                      className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'
                    >
                      HD
                    </span>
                  </p>
                </div>
                <div style={{ fontSize: '10px' }} className='flex justify-row items-center text-white'>
                  <span className='pr-2'>{movie.genre_info[0].title}</span>
                  <span className='pr-2'>{movie.genre_info[1].title}</span>
                  <span className='pr-2'>{movie.genre_info[2].title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default MovieItem;
