import * as React from 'react';
// import MovieItem from '../MovieItem/MovieItem';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useRef } from 'react';
// import axios from 'axios';


// export interface IMovieListProps {
// }

// export default function MovieList (props: IMovieListProps) {
//   const [isMoved, setIsMoved] = React.useState(false)
//   const [slideNumber, setSlideNumber] = React.useState(0)
//   const listRef = useRef<HTMLDivElement>(null);
//   const [playlistList, setPlaylistList] = React.useState([])

//   React.useEffect(() => {
//       async function getPlaylist(){
//           const response = await axios.get('http://127.0.0.1:8000/api/playlist/')
//           setPlaylistList(response.data)
//       }
//       getPlaylist()
//   }, [])


//   const handleClick = (direction: string) => {
//     setIsMoved(true);
//     const currentRef = listRef.current;
//     if (currentRef) {
//       const distance = currentRef.getBoundingClientRect().x - 64;
//       if (direction === 'left' && slideNumber > 0) {
//         setSlideNumber(slideNumber - 1);
//         currentRef.style.transform = `translateX(${260 * 6 + distance}px)`;
//       }
//       if (direction === 'right' && slideNumber < 1) {
//         setSlideNumber(slideNumber + 1);
//         currentRef.style.transform = `translateX(${-260 * 6 + distance}px)`;
//       }
//     }
//   };
  

//   return (
//     <div>
//       {playlistList.map((item:any)=>(
//         <div key={item.id} className='mt-10' style={{width: '100%'}}>
//           <div className='text-3xl ml-16 mb-5 mt-5 text-gray-50'>{item.title}</div>
//           <div className='pb-5'>
//             <div className='relative flex w-full'>
//                 {/* 1680 -  */}
//                 <div className=''>
//                   <ArrowBackIosIcon className='z-10 rounded-r-md absolute left-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer left' 
//                   onClick={() => handleClick('left')} 
//                   style={{height: '100%', width: '54px', display: isMoved ? 'block' : 'none'}}/>
//                 </div>

//                 <MovieItem item={item} ref={listRef} />

//                 <div className=''>
//                   <ArrowForwardIosIcon className='z-10 rounded-l-md absolute right-0 top-0 bottom-0 m-auto bg-gray-400/45 flex justify-center items-center cursor-pointer right' 
//                   onClick={() => handleClick('right')} 
//                   style={{height: '100%', width: '54px'}}/>
//                 </div>
              
//             </div>
//           </div>
//         </div>
//       ))}

//     </div>
//   );
// }
