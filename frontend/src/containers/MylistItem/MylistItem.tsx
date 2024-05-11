import * as React from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import videoBg from '../../assets/videos/video1.mp4'
import axios from 'axios';

export interface IMylistItemProps {
}

export default function MylistItem (props: IMylistItemProps) {
    const [playItemvideo, setPlayItemVideo] = React.useState(false)
    const [userMovielist, setUserMovieList] = React.useState([])

    React.useEffect(() => {
      async function getUserMovieList() {
        try {
          const token = localStorage.getItem('accessToken');
  
          if (token) {
            const response = await axios.get('http://127.0.0.1:8000/api/liked-movies/', {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            });
            setUserMovieList(response.data);
          } else {
            // Handle case where token is not available
            console.error('Authentication token not found');
          };
        } catch (error) {
          // Handle error
          console.error('Error fetching user movie list:', error);
        };
      };
      getUserMovieList();
    }, []);    


    const handlePlayClick = () => {
  
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.requestFullscreen();
        video.play();
      }
      console.log('Play button clicked');
    }
  
    return (
      <div>
        {userMovielist.map((item:any) => (
          <div key={item.id} className='group rounded-md relative h-[8vw] mb-10'>
              <img src={item.image} alt="" 
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
                <img src={item.image} alt=""
                className='
                  cursor-poiner
                  object-cover
                  transition
                  duration
                  shadow-xl
                  rounded-t-md
                  w-full
                  h-[8vw]
                  ' />
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
  
                    <div className='' onClick={() =>{}}> 
  
                      <div className='flex justify-between items-center'>
                          <div>
                              <PlayCircleFilledIcon className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1' 
                              style={{width: '35px', height: '35px'}} onClick={handlePlayClick}/>
                              <AddCircleIcon className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1'
                              style={{width: '35px', height: '35px'}}/>
                          </div>
                          
                          <ExpandCircleDownRoundedIcon 
                          className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                          style={{width: '35px', height: '35px'}}/>
                      </div>
                      
                      <p style={{fontSize: '10px'}} className='text-xs font-semibold text-green-400 pt-1'>Best of <span className='text-white'>{item.release_date.slice(0,4)}</span>
                      <span style={{fontSize: '10px', borderWidth: '1px'}} 
                      className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>+6</span>
                      <span className='text-gray-400 ml-2 font-light'>1h 50min</span>
                      <span style={{fontSize: '10px', borderWidth: '1px'}} 
                      className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>HD</span>
                      </p>
                    </div>
                  
                  <div style={{fontSize: '10px'}} className='flex justify-row items-center text-white' >
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
