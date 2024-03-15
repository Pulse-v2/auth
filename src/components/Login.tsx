import React, { useState } from 'react';
import './login.scss';
import logo from '../assets/img/logo.png';
import github_icon from '../assets/img/GitHub.png';
import google_icon from '../assets/img/Google.png';
import vision from '../assets/img/vision.png';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
   const [credentials, setCredentials] = useState({ email: '', password: '' });
   const [passContainerVisibility, setPassContainerVisibility] = useState(false);
   const [passVisible, setPassVisible] = useState(false);
   const [error, setError] = useState(false);
   // const { user, loginUser } = useAuth();
   const { login } = useAuth();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(false);
      setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
      });
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(credentials.email)) {
         setPassContainerVisibility(false)
         setError(true);
      return;
      } else {
         setPassContainerVisibility(true);
         setError(false);
      return;
      }
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*])(?=.*[a-zA-Z]).{8,}$/;
      if (!passPattern.test(credentials.password)) {
         setError(true);
         console.log('error pass')
         return;
      } else {
             try {
               await login(credentials.email, credentials.password);
               console.log('User logged in:');
             } catch (error) {
                if (axios.isAxiosError(error)) {
                   setError(true);
                   const message = error.response?.data?.message || 'Unknown error';
                   throw new Error('Authorization error: ' + message);
                } else {
                   throw new Error('Unexpected error occurred');
                }
            }
         return;
      }
   };
   
   return (
      <>
         <div className='main-container'>
            <div className='main-container_logo'>
               <img src={logo} alt="logo" />
            </div>
            <div className='main-container_social-login'>
               <div className='social-login_title'>Log in to your account</div>
               <div className='social-login_buttons'>
                  <button><img src={ google_icon } alt='google' /><span>Google</span></button>
                  <button><img src={ github_icon } alt='github' /><span>GitHub</span></button>
               </div>
            </div>
            <div className='line-container'>
               <div className='line'>
                  <span>OR</span>
               </div>
            </div>
            <div className='main-container_login-form'>
                  <form onSubmit={handleSubmit}>
                     <input className={error ? 'alert' : ''} type='text' name='email' value={credentials.email} placeholder='Work email'  onChange={handleChange}/>
                     {passContainerVisibility && (
                        <>
                           <div className='login-form_password-container'>
                              <input className={error ? 'alert' : ''} type={passVisible ? 'text' : 'password'} name='password' value={credentials.password} placeholder='Password' onChange={handleChange} />
                              <img src={vision} alt='vision' onClick={() => setPassVisible(!passVisible)}/>
                           </div>
                           <a href='/forgot'>Forgot your password?</a>
                        </>
                     )}
                     <button type='submit'>Log in to Qencode</button>
               </form>
               <p>Is your company new to Qencode? <a href='/'> Sign up</a></p>
            </div>
         </div>
      </>
   )
}

export default Login
