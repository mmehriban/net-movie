import * as React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import MylistItem from '../MylistItem/MylistItem';
import axios from 'axios';


export interface IMyListProps {
}

export default function MyList (props: IMyListProps) {

  // const [userMovielist, setUserMovieList] = React.useState([])

  // React.useEffect(() => {
  //   async function getUserMovieList() {
  //     const response = await axios.get('http://127.0.0.1:8000/api/liked-movies/');
  //     setUserMovieList(response.data);
  //   }
  //   getUserMovieList()
  // }, [])

  // React.useEffect(() => {
  //   async function getUserMovieList() {
  //     try {
  //       // Assuming you have a token stored in localStorage
  //       const token = localStorage.getItem('accessToken');

  //       if (token) {
  //         const response = await axios.get('http://127.0.0.1:8000/api/liked-movies/', {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //           },
  //         });
  //         setUserMovieList(response.data);
  //       } else {
  //         // Handle case where token is not available
  //         console.error('Authentication token not found');
  //       }
  //     } catch (error) {
  //       // Handle error
  //       console.error('Error fetching user movie list:', error);
  //     }
  //   }
  //   getUserMovieList();
  // }, []);

  return (
    <div className='bg-zinc-900 h-full w-full'>
        <div className='pt-52 '>
            <div className='absolute top-16 left-0  w-full'>
                <h1 className='text-4xl ml-16 mb-5 mt-5 text-gray-50 font-semibold'>My List</h1>
            </div>
            <div className='m-16 pb-96'>
                <div className='grid grid-cols-6 gap-3  text-white duration-500'> 
                    <MylistItem />
                </div>
            </div>
        </div>
    </div>
  );
}
