import * as React from 'react';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import videoBg from '../../assets/videos/video1.mp4'


export interface IMovieItemProps {
}

export default function MovieItem (props: IMovieItemProps) {
  return (
    <div >
        <div className='group rounded-md relative h-[8vw]' 
        style={{ width: '250px', marginRight: '10px'}}>
            <img src="https://www.thesiff.com/wp-content/uploads/2022/02/howls-moving-castle.png" alt="" 
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
              '
              /> 
            <div className='
              opacity-0
              absolute
              top-0
              transition
              duration-200
              z-10
              invisible
              sm:visible
              delay-300
              w-full
              scale-0
              group-hover:scale-150
              group-hover:-translate-y-[4vw]
              group-hover:opacity-100
              '> 
              <img src="https://www.thesiff.com/wp-content/uploads/2022/02/howls-moving-castle.png" alt=""
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
                z-10
                bg-zinc-800
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
              '>
                <div className='flex flex-row items-center gap-3'>
                  <div 
                    className=''
                    onClick={() =>{}}> 
                    <PlayCircleFilledIcon className=' hover:opacity-70 transition duration-200'/>
                    <AddCircleIcon />
                  </div>
                </div>

              </div>
            </div> 

        </div>
    </div>
  );
}
