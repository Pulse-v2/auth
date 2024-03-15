import { useState } from 'react';
import logo from '../assets/img/logo.png';
import './forgotPassword.scss';
import axios from 'axios';
import authService from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState( '');
  const [error, setError] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setError(false);
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        setError(true);
        console.log('error mail');
        return;
    } else {
        try {
            await authService.resetPassword(email)
            console.log('Request succeed:');
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
      <div className='forgot-container'>
        <div className='forgot-container_logo'>
            <img src={logo} alt='logo' />
        </div>
          <div className='forgot-container_title'>Forgot password</div>
        <div className='forgot-container_form'>
          <form onSubmit={handleSubmit}>
              <input autoComplete={'off'} className={error ? 'alert' : ''} type='text' name='email' value={email} onChange={handleChange} placeholder='Enter your email'  />
              <button type='submit'>Send</button>
              <button type='button' onClick={() => goBack()}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
