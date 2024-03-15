import {useState} from 'react';
import logo from '../assets/img/logo.png';
import vision from '../assets/img/vision.png';
import './newPassword.scss';
import axios from 'axios';
import authService from '../services/authService';


//It is possible to fully implement only having access to the mail and receiving all the necessary parameters
const NewPassword = () => {
    const [credentials, setCredentials] = useState({password: '', password_confirm: '', token: '', secret: ''});
    const [passVisible, setPassVisible] = useState(false);
    const [rePassVisible, setRePassVisible] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setError('');
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^_&*])(?=.*[a-zA-Z]).{8,}$/;
        if (!passPattern.test(credentials.password) && credentials.password !== credentials.password_confirm) {
            setError('Password does not meet requirements');
            return;
        } else {
            try {
                setCredentials({
                    ...credentials,
                    token: '',
                    secret: ''
                });
                await authService.setPassword(credentials);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.detail || error.response?.data?.detail[0].error || 'Unknown error';
                    setError(message);
                } else {
                    setError('Unexpected error occurred');
                }
            }
            return;
        }
    };
    return (
        <>
            <div className='new-pass-container'>
                <div className='new-pass-container_logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='new-pass-container_title'>Forgot password</div>
                <div className='new-pass-container_form'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-pass-container'>
                            <label htmlFor='password'>Password</label>
                            <input className={error ? 'alert' : ''} type={passVisible ? 'text' : 'password'}
                                   name='password' value={credentials.password} onChange={handleChange}
                                   placeholder='Password'/>
                            <img src={vision} alt='vision' onClick={() => setPassVisible(!passVisible)}/>
                        </div>
                        <div className='form-pass-container'>
                            <label htmlFor='re_password'>Confirm Password</label>
                            <input className={error ? 'alert' : ''} type={rePassVisible ? 'text' : 'password'}
                                   name='password_confirm' value={credentials.password_confirm} onChange={handleChange}
                                   placeholder='Password'/>
                            <img src={vision} alt='vision' onClick={() => setRePassVisible(!rePassVisible)}/>
                        </div>
                        {error && <p style={{color: 'red', margin: '5px', textAlign: 'center'}}>{error}</p>}

                        <button type='submit'>Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPassword
