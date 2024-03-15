import {useState} from 'react';
import './login.scss';
import logo from '../assets/img/logo.png';
import github_icon from '../assets/img/GitHub.png';
import google_icon from '../assets/img/Google.png';
import vision from '../assets/img/vision.png';
import axios from 'axios';
import authService from '../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [passContainerVisibility, setPassContainerVisibility] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [error, setError] = useState('');
    const [authorized, setAuthorized] = useState(false);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setError('');
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(credentials.email)) {
            setPassContainerVisibility(false);
            setError('Invalid email format');
            return;
        } else {
            setPassContainerVisibility(true);
            setError('');
            return;
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passPattern.test(credentials.password)) {
            setError('Password does not meet requirements');
            return;
        } else {
            try {
                const response = await authService.login(credentials.email, credentials.password);
                authService.setToken(response.data.access_token);
                setAuthorized(true)
                setError('');

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.detail || 'Unknown error';
                    setError(message);
                } else {
                    setError('Unexpected error occurred');
                }
            }
            return;
        }
    };

    const handlePaste = (e: { preventDefault: () => void; clipboardData: { getData: (arg0: string) => any; }; }) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        setCredentials({...credentials, email: text});
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(text)) {
            setPassContainerVisibility(false);
            setError('Invalid email format');
        } else {
            setPassContainerVisibility(true);
            setError('');
        }
    };

    return (
        <>
            <div className='main-container'>
                <div className='main-container_logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='main-container_social-login'>
                    <div className='social-login_title'>Log in to your account</div>
                    <div className='social-login_buttons'>
                        <button><img src={google_icon} alt='google'/><span>Google</span></button>
                        <button><img src={github_icon} alt='github'/><span>GitHub</span></button>
                    </div>
                </div>
                <div className='line-container'>
                    <div className='line'>
                        <span>OR</span>
                    </div>
                </div>
                <div className='main-container_login-form'>
                    <form onSubmit={handleSubmit}>
                        <input autoComplete={'off'} className={error ? 'alert' : ''} type='text' name='email'
                               value={credentials.email} placeholder='Work email' onChange={handleChange}
                               onPaste={handlePaste}/>
                        {passContainerVisibility && (
                            <>
                                <div className='login-form_password-container'>
                                    <input className={error ? 'alert' : ''} type={passVisible ? 'text' : 'password'}
                                           name='password' value={credentials.password} placeholder='Password'
                                           onChange={handleChange}/>
                                    <img src={vision} alt='vision' onClick={() => setPassVisible(!passVisible)}/>
                                </div>
                                <a href='/forgot'>Forgot your password?</a>
                            </>
                        )}
                        {authorized && <p style={{color: 'green', margin: '5px'}}>User successfully login!</p>}
                        {error && <p style={{color: 'red', margin: '5px', textAlign: 'center'}}>{error}</p>}
                        <button type='submit'>Log in to Qencode</button>
                    </form>
                    <p>Is your company new to Qencode? <a href='/'> Sign up</a></p>
                </div>
            </div>
        </>
    )
}

export default Login
