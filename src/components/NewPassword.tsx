import { useState } from 'react';
import logo from '../assets/img/logo.png';
import vision from '../assets/img/vision.png';
import './newPassword.scss';
import { useSetNewPass } from '../hooks/useSetNewPass';
import axios from 'axios';

const NewPassword = () => {
  const [credentials, setCredentials] = useState({ password: '', password_confirm: '', token: '', secret: '' });
  const [passVisible, setPassVisible] = useState(false);
  const [rePassVisible, setRePassVisible] = useState(false);
  const [error, setError] = useState(false);
  const { data, setNewPass } = useSetNewPass();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*])(?=.*[a-zA-Z]).{8,}$/;
    if (!passPattern.test(credentials.password) && credentials.password !== credentials.password_confirm) {
        setError(true);
        console.log('error pass')
        return;
    } else {
      try {
        setCredentials({
          ...credentials,
          token: '',
          secret: ''
        });
        await setNewPass(credentials);
        console.log('Request succeed:', data);
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
      <div className='new-pass-container'>
        <div className='new-pass-container_logo'>
            <img src={logo} alt='logo' />
        </div>
            <div className='new-pass-container_title'>Forgot password</div>
        <div className='new-pass-container_form'>
        <form onSubmit={handleSubmit}>
          <div className='form-pass-container'>
            <label htmlFor='password'>Password</label>
            <input className={error ? 'alert' : ''} type={passVisible ? 'text' : 'password'} name='password' value={credentials.password} onChange={handleChange} placeholder='Password' />
            <img src={vision} alt='vision' onClick={() => setPassVisible(!passVisible)}/>
          </div>
          <div className='form-pass-container'>
            <label htmlFor='re_password'>Confirm Password</label>
            <input className={error ? 'alert' : ''} type={rePassVisible ? 'text' : 'password'} name='password_confirm' value={credentials.password_confirm} onChange={handleChange} placeholder='Password'  />
            <img src={vision} alt='vision' onClick={() => setRePassVisible(!rePassVisible)}/>
          </div>
          <button type='submit'>Reset Password</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default NewPassword
