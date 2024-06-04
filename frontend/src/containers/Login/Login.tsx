import * as React from 'react';
import netflixLogo from '../../assets/images/Netflix_logo.svg';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  
  // original 1 version
  // const loginHandler = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent default form submission behavior
  //   const username = usernameInputRef.current?.value;
  //   const password = passwordInputRef.current?.value;
  //   if (username && password) {
  //     dispatch(loginAction(username, password));
  //     localStorage.setItem(username, password)
  //     navigate('/');
  //   }
  // }, [dispatch, navigate]);

  // 2 version, does not work
  // const loginHandler = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent default form submission behavior
  //   const user_info = usernameInputRef.current?.value;
  //   const password = passwordInputRef.current?.value;
  //   if (user_info && password) {
  //       const response = await axios.post('http://127.0.0.1:8000/api/login', { user_info, password });
  //       const { accessToken } = response.data; // Assuming your server returns the access token
  //       localStorage.setItem('accessToken', accessToken); // Store the access token in localStorage
  //       dispatch(loginAction(user_info, accessToken)); // Dispatch login action with username and accessToken
  //       navigate('/'); // Redirect user to home page after successful login
  //   };
  // }, [dispatch, navigate]);

  // 3 version
  const loginHandler = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const user_info = usernameInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    if (user_info && password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', { user_info, password });
        const { token } = response.data;
        // Dispatch an action to store the token in Redux
        dispatch({ type: 'SET_TOKEN', payload: token });
        // Store the token in localStorage for persistence
        localStorage.setItem('token', token);
        // Redirect the user to the home page
        navigate('/');
        
        console.log(user_info, token);
      } catch (error) {
        console.error('Login failed:', error);
        // Optionally handle and display the error to the user
      }
    }
    
  }, [dispatch, navigate]);


  return (
    <div className='relative z-40'>
      <img
        src="https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg"
        alt=""
        className='w-full h-screen object-cover overflow-hidden '
        />
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
        <div className="flex mt-1 flex-col bg-stone-900/90 h-full min-w-80  rounded-sm mb-7 p-10" style={{width: '400px'}}>
          <h1 className="flex mb-7 text-2xl font-semibold text-white ">Sign In</h1>
          <form onSubmit={loginHandler}> {/* Add onSubmit attribute here */}
            <div className="relative flex">
              <input type="text" ref={usernameInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="username" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700" >Email or phone number</label>
            </div>
            <div className="relative flex">
              <input type="password" ref={passwordInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="current-password" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700" >Password</label>
            </div>
            <button type="submit" className="p-4 rounded-md text-white mt-10 mb-7 cursor-pointer hover:opacity-90" style={{backgroundColor: 'rgb(229,8,21)'}}>Sign In</button>
            <div className='text-white font-light'>
              <div className="form-text">
                <p>New to Netflix? <NavLink to={'/register'} className='font-semibold hover:underline duration-200 pl-1'>Sign up now</NavLink>.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" absolute top-5 left-16 w-44 ">
        <NavLink to={'/'}>
          <img src={netflixLogo} alt="Netflix Logo" />
        </NavLink>
      </div>
    </div>
  );
}

