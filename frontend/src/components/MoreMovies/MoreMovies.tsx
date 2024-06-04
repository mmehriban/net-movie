import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import videoBg from '../../assets/videos/video1.mp4'


export interface IMoreMoviesProps {
    movieItem: any;
}

export default function MoreMovies (props: IMoreMoviesProps) {
    const {movieItem} = props
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

      const handlePlayClick = () => {
        const video = document.querySelector('video');
        if (video) {
          video.currentTime = 0;
          video.requestFullscreen();
          video.play();
        }
        // console.log('Play button clicked');
      }
  return (
    <div>
        {movieItem &&
            <div className='bg-zinc-700 rounded-md mt-5 relative group duration-500 ease-in cursor-pointer' style={{height: '400px'}}>
                            
                            <img style={{height: '170px'}} src={movieItem.image} alt=""
                            className='cursor-poiner object-cover transition duration shadow-xl rounded-t-md w-full' />
                            <div 
                                className='hidden absolute top-16 left-1/2 transform -translate-x-1/2 rounded-full bg-zinc-700/50 border border-white cursor-pointer group-hover:block duration-500 delay-75 ease-in'>
                                <PlayArrowIcon onClick={handlePlayClick}
                                sx={{ fontSize: 50 }} style={{color: 'white', padding: '2px'}}/>
                            </div>
                            <div className='flex justify-between items-center m-3'>
                                <div style={{fontSize: '16px'}} className='text-xs font-semibold text-green-400 pt-1'>
                                {movieItem.section_name && 
                                    <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                    className='border-stone-500 text-gray-400 pr-1 pl-1 font-light'>{movieItem.section_name['title']}</span>
                                }

                                    <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                    className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>HD</span>
                                </div>

                                <div className=''>
                                    {   likedMoviesList.includes(movieItem.id) ? (
                                        <CheckCircleIcon onClick={() => removeFromLikedMovies(movieItem.id)} 
                                        className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                                        style={{width: '45px', height: '45px'}}/>)
                                        :
                                        (<AddCircleIcon onClick={() => addToLikedMovies(movieItem.id)} 
                                        className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                                        style={{width: '45px', height: '45px'}}/>)

                                    }
                                </div>
                            </div>
                            <div className='m-3 pb-5 text-white'>{movieItem.description.slice(0,150)} .....</div>
            </div>       
        }
    </div>
  );
}
