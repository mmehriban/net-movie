import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';


export interface IMoreMoviesProps {
    movieItem: any;
}

export default function MoreMovies (props: IMoreMoviesProps) {
    const {movieItem} = props

  return (
    <div>
        {movieItem &&
            <div className='bg-zinc-700 rounded-md mt-5 relative group duration-500 ease-in cursor-pointer' style={{height: '400px'}}>
                            
                            <img style={{height: '170px'}} src={movieItem.image} alt=""
                            className='cursor-poiner object-cover transition duration shadow-xl rounded-t-md w-full' />
                            <div 
                                className='hidden absolute top-16 left-1/2 transform -translate-x-1/2 rounded-full bg-zinc-700/50 border border-white cursor-pointer group-hover:block duration-500 delay-75 ease-in'>
                                <PlayArrowIcon sx={{ fontSize: 50 }} style={{color: 'white', padding: '2px'}}/>
                            </div>
                            <div className='flex justify-between items-center m-3'>
                                <div style={{fontSize: '16px'}} className='text-xs font-semibold text-green-400 pt-1'>
                                {movieItem.section_name && 
                                    <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                    className='border-stone-500 text-gray-400 pr-1 pl-1 font-light'>{movieItem.section_name['title']}</span>
                                }

                                    <span className='text-gray-400 ml-2 font-light'>1h 50min</span>
                                    <span style={{fontSize: '16px', borderWidth: '1px'}} 
                                    className='border-stone-500 text-gray-400 pr-1 pl-1 ml-2 font-light'>HD</span>
                                </div>

                                <div className=''>
                                    <AddCircleIcon 
                                    className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                                    style={{width: '45px', height: '45px'}}/>
                                </div>
                            </div>
                            <div className='m-3 pb-5 text-white'>{movieItem.description.slice(0,150)} .....</div>
            </div>       
        }
    </div>
  );
}
