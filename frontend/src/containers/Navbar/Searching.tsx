import React from 'react';
import SearchBoxes from './SearchBoxes';
import SearchIcon from '@mui/icons-material/Search';
import MovieDetail from '../MovieDetail/MovieDetail';
import Footer from '../Footer/Footer';

export interface ISearchingProps {
  onSearch: (query: string) => void;
}

export default function Searching(props: ISearchingProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  // open movie detail
  const [isMovieDetailOpen, setIsMovieDetailOpen] = React.useState(false);
  const [selectedMovieId, setSelectedMovieId] = React.useState<string | null>(null);

  const openMovieDetailOf = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsMovieDetailOpen(!isMovieDetailOpen);
    window.scrollTo(0, 0);
    // console.log('clicked');
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchOne = () => {
    handleSearch(searchQuery);  // Trigger search when the icon is clicked
  };

  const handleSearch = async (query: string) => {
    if (!query) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/movies-search/?title=${query}`);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Expected JSON response but got:', contentType);
          const errorText = await response.text();
          console.error('Response:', errorText);
        }
      } else {
        console.error('Failed to fetch search results');
        console.error('Response:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  
  // const handleSearch = async (query: string) => {
  //   if (!query) return;

  //   try {
  //     const response = await fetch(`/movies-search/?title=${query}`); // Use `title` as query parameter
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } else {
  //       console.error('Failed to fetch search results');
  //       console.error('Response:', await response.text());
  //     }
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  //   console.log(query);
  // };

  React.useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className='pt-52 ml-16 mr-16 flex flex-col'>
      <div className='mb-10'>
        <div className='text-white flex items-center'>
          <div className='border-white border-2 bg-black'>
            <input
              className='bg-black outline-none w-64 pr-2 pl-2 pt-1 pb-1'
              type="text"
              placeholder='Search'
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <SearchIcon className='ml-3 cursor-pointer' onClick={handleSearchOne} />
        </div>
      </div>
      <div className=''>
        <h1 className='text-bold text-white text-4xl'>Searching Results</h1>
      </div>
      <div className='mt-28 pb-96'>
        <SearchBoxes searchResults={searchResults} openMovieDetailOfClick={openMovieDetailOf}/>
      </div>

      {isMovieDetailOpen && selectedMovieId && <MovieDetail movieId={selectedMovieId}/>}

    <div className='pt-96'>
      <Footer />
    </div>
    </div>
  );
}
