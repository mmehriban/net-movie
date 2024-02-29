import React from 'react';
import logo from './logo.svg';
import Layout from './HOC/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import './App.css';

function App() {
  return (
    <div className="">
        <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/playlist/:id/:slug' element={<Playlist />} />
              <Route path='/search/*' element={<Search />} />
              <Route path='/register/' element={<Register />} />
              <Route path='/login/' element={<Login />} />
              <Route path='/profile/:id/' element={<Profile />} /> */}
            </Routes>
        </Layout>
    </div>
  );
}

export default App;
