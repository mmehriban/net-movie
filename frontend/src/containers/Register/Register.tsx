import * as React from 'react';
import netflixLogo from '../../assets/images/Netflix_logo.svg';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../store/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const firstNameInputRef = React.useRef<HTMLInputElement>(null);
  const lastNameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const genderInputRef = React.useRef<HTMLInputElement>(null);
  const birthdayInputRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const registerHandler = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const username = usernameInputRef.current?.value;
    const first_name = firstNameInputRef.current?.value;
    const last_name = lastNameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const birthday = birthdayInputRef.current?.value;
    const gender = genderInputRef.current?.value;
    const password = passwordInputRef.current?.value;

    const emailRegex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }


    if (username && password && first_name && last_name && email && gender && birthday) {
      dispatch(registerAction(username,  first_name, last_name, email, gender, birthday, password));
      navigate('/');
    }
    console.log('checked');
    
  }, [dispatch, navigate]);
  console.log(registerHandler);
  

  return (
    <div className='relative z-40'>
      <img
        src="https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg"
        alt=""
        className='w-full h-screen object-cover overflow-hidden '
        />
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
        <div className="flex mt-1 flex-col bg-stone-900/90 h-full min-w-80  rounded-sm mb-7 p-10" style={{width: '400px'}}>
          <h1 className="flex mb-7 text-2xl font-semibold text-white ">Sign Up</h1>
          <form onSubmit={registerHandler}>
            <div className="relative flex">
              <input type="text" ref={usernameInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="username" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Username</label>
            </div>
            <div className="relative flex">
              <input type="text" ref={firstNameInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="given-name" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">First name</label>
            </div>
            <div className="relative flex">
              <input type="text" ref={lastNameInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="family-name" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Last name</label>
            </div>
            <div className="relative flex">
              <input type="text" ref={emailInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="email" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Email</label>
            </div>
            <div className="relative flex">
              <input type="text" ref={genderInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="email" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Gender</label>
            </div>
            <div className="relative flex">
              <input type="text" ref={birthdayInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="email" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Birthday</label>
            </div>

            <div className="relative flex">
              <input type="password" ref={passwordInputRef} required className="w-full mb-7 bg-stone-600/40 rounded-sm text-white border-none pl-5 pr-5 pt-2 pb-2 outline-0" autoComplete="new-password" />
              <label className="absolute top-10 left-3 text-sm z-50 text-amber-700">Password</label>
            </div>
            <button type="submit" className="p-4 rounded-md text-white mt-10 mb-7 cursor-pointer hover:opacity-90" style={{backgroundColor: 'rgb(229,8,21)'}}>Sign Up</button>
            <div className='text-white font-light'>
              <div className="form-text">
                <p>Have already an account? <NavLink to={'/login'} className='font-semibold hover:underline duration-200 pl-1'>Sign in now</NavLink>.</p>
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
