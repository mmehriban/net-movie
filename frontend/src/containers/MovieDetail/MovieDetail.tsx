import * as React from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MoreMovies from '../../components/MoreMovies/MoreMovies';
import Backdrop from '../../components/Backdrop/Backdrop';
import axios from 'axios';

export interface IMovieDetailProps {
    movieId: string;
    
}

export default function MovieDetail (props: IMovieDetailProps) {
    const { movieId } = props;
    console.log('Movie ID:', movieId); 
    const [isOpen, setIsOpen] = React.useState(true); 
    const [movieDetailData, setMovieDetailData] : any = React.useState({})
    const [sectionsList, setSectionsList] : any = React.useState({})

// for more details
    const [movieDetailMore, setMovieDetailMore] = React.useState([])
    React.useEffect(() => {
        async function getMoreDetail () {
            const response  = await axios.get('http://127.0.0.1:8000/api/movies/');
            setMovieDetailMore(response.data);
        };
        getMoreDetail();
    },[])

// end of more details


    React.useEffect(() => {
        async function getSectionList () {
          const response  = await axios.get('http://127.0.0.1:8000/api/sections/');
          setSectionsList(response.data);
        };
        getSectionList();
      }, [])

    React.useEffect(() => {
        async function getMovieDetail (){
            const response  = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`);
            // const response  = await axios.get('http://127.0.0.1:8000/api/movies/13/');

            setMovieDetailData(response.data);
        };
        if (movieId) {
            getMovieDetail(); // Only fetch movie detail if movieId is defined
        }
        console.log(movieId);
        
    }, [movieId]); // Include movieId in the dependency array
    
    console.log(movieDetailData.id);
    
    

    const handleQuitMovieDetail = () => {
        setIsOpen(false);
    }

    if (!isOpen) {
        return null; 
    }

  return (
    <>
        <div>
            {movieDetailData &&
                <div key={movieDetailData.id} className='absolute top-10 left-1/2 flex justify-center transform -translate-x-1/2 z-50 '>
                    <div className='z-50 shadow-lg '>
                        <div className=' bg-gradient-to-t from-zinc-800 to-zinc-900 rounded-lg'
                            style={{width: '1000px'}} >
                                <div className='relative'>
                                    <img src={movieDetailData.image} alt="" 
                                    className='rounded-t-lg overflow-hidden' ></img>
                                    <CancelRoundedIcon onClick={handleQuitMovieDetail} className='absolute top-4 right-3 cursor-pointer hover:opacity-85' style={{width: '45px', height: '50px', color: 'white'}} />
                                    <div className='absolute bottom-11 left-10 flex flex-row justify-center items-center '>
                                        <div className='mr-3 flex justify-center items-center w-32 h-12 rounded-md bg-white hover:bg-white/85 cursor-pointer'>
                                            <PlayArrowIcon sx={{ fontSize: 45 }}/>
                                            <h2 className='font-medium pl-1'>Play</h2>
                                        </div>
                                        <div className='bg-gray-700/55 rounded-full flex justify-center items-center align-middle border-gray-500 border-2 hover:border-white duration-200 ml-2'>
                                            <AddOutlinedIcon className=' cursor-pointer p-1'  
                                            style={{width: '45px', height: '45px', color: 'white', fontWeight: 'lighter'}}/>
                                        </div>

                                    </div>
                                    {/* <div className='absolute bottom-11 right-10 bg-gray-700/55 rounded-full flex border-gray-500 border-2 hover:border-white duration-200'>
                                        <VolumeUpIcon className='flex flex-row justify-center items-center p-2 cursor-pointer'
                                            style={{width: '45px', height: '45px', color: 'white', fontWeight: 'lighter'}} />

                                    </div> */}

                                </div>

                                <div className='flex justify-between mb-10'>
                                    <div className='pl-10 pt-10 pr-10 max-w-xl'>
                                        <p style={{fontSize: '16px'}} className='text-xs font-semibold text-green-400 pt-1'>Release date <span className=''>{movieDetailData.release_date}</span>

                                        {movieDetailData.section_name && (
                                        <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                        className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2'>{movieDetailData.section_name['title']}</span>)}

                                        <span className='text-gray-400 ml-2'>1h 50min</span>
                                        <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                        className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2'>HD</span>
                                        
                                        </p>
                                        <p className='text-white pt-2'> <br/> {movieDetailData.description}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='pl-10 pt-10 pr-10 max-w-xl'>
                                            {/* <p className='text-slate-600'>Cast: <span className='text-white'>Jack Loondon, Nicole Kidman, Emily Stay, Dustin Hoffman</span></p> */}
                                            {/* <p className='text-slate-600'>Genres: <span className='text-white'>{movieDetailData.genre_info[0].title}</span></p> */}
                                            {movieDetailData.genre_info && movieDetailData.genre_info.length > 0 && (
                                            <p className='text-slate-600'>Genres: 
                                            <span className='text-white'>  {movieDetailData.genre_info[0].title}, {movieDetailData.genre_info[1].title}, {movieDetailData.genre_info[2].title} ...</span></p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='m-10'>
                                    <h1 className='text-white font-semibold text-3xl mb-3'>More For You</h1>
                                    <div className='pb-28'>
                                            <div className='grid grid-cols-3 gap-5'>
                                            {movieDetailMore.slice(0, 5).map((movieItem: any)=> (
                                                <MoreMovies key={movieItem.id} movieItem={movieItem}/>
                                            ))}
                                            </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
        <Backdrop onClick={handleQuitMovieDetail} closeMovieDetail={handleQuitMovieDetail}/>
    </>
  );
}
