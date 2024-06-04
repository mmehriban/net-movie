import React from 'react';
import logo from './logo.svg';
import Layout from './HOC/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import MyList from './containers/MyList/MyList';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import MovieDetail from './containers/MovieDetail/MovieDetail';
import './App.css';
import { useSelector } from 'react-redux';
import Searching from './containers/Navbar/Searching';

function App() {

  const {username, token}: any = useSelector((state: any)=> state.auth)
  console.log(username, token);
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add logic to handle search if needed
  };


  return (
    <div className="">
        <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/mylist' element={<MyList />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/movies-search/' element={<Searching onSearch={handleSearch}/>} />

              {/* <Route path='/playlist/:id/:slug' element={<Playlist />} />
              <Route path='/profile/:id/' element={<Profile />} /> */}
            </Routes>
        </Layout>
    </div>
  );
}

export default App;
