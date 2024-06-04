import * as React from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import MovieDetail from '../MovieDetail/MovieDetail';
import videoBg from '../../assets/videos/video1.mp4'


export interface ISearchBoxesProps {
  searchResults: any;
  openMovieDetailOfClick: (movieId:string) => void; 
}

export default function SearchBoxes ({searchResults, openMovieDetailOfClick}: any, props: ISearchBoxesProps) {


  return (
    <div className='grid grid-cols-6 gap-3 pb-60'>
      { searchResults.length === 0 ? (
        <p className='text-white'>No results </p>
      )
      :
      (searchResults.map((result:any) => (
        <div key={result.id} className=' text-white duration-500'>
            <div className='group rounded-md relative h-[8vw] mb-10'>
              <img src={result.image} alt="" 
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
                      <div className='flex justify-between items-center'> 
                        <p className='text-sm'>{result.title}</p>
                        <ExpandCircleDownRoundedIcon onClick={() => openMovieDetailOfClick(result.id)}
                        className=' hover:opacity-70 transition duration-200 cursor-pointer pr-1 text-stone-400'
                        style={{width: '35px', height: '35px'}}/>
                      </div>
                    </div>  
                </div>
            </div> 
        </div>
      )
      ))
      }
    </div>
  );
}