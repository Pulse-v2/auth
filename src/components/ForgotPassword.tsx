import {useState} from 'react';
import logo from '../assets/img/logo.png';
import './forgotPassword.scss';
import axios from 'axios';
import authService from '../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState({detail: '', error: '', timestamp: ''});
    const goBack = () => {
        window.history.back();
    };

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setError('');
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return;
        } else {
            try {
                const response = await authService.resetPassword(email);
                if (response.data.error === 0) {
                    setSuccess(response.data);
                }
                setError('');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.detail || 'Unknown error';
                    setError(message);
                } else {
                    throw new Error('Unexpected error occurred');
                }
            }
            return;
        }
    };

    const handlePaste = (e: { preventDefault: () => void; clipboardData: { getData: (arg0: string) => any; }; }) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        setEmail(text);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(text)) {
            setError('Invalid email format');
        } else {
            setError('');
        }
    };
    return (
        <>
            <div className='forgot-container'>
                <div className='forgot-container_logo'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='forgot-container_title'>Forgot password</div>
                <div className='forgot-container_form'>
                    <form onSubmit={handleSubmit}>
                        <input autoComplete={'off'} className={error ? 'alert' : ''} type='text' name='email'
                               value={email} onChange={handleChange} onPaste={handlePaste}
                               placeholder='Enter your email'/>
                        {success.error.toString() === '0' &&
                            <p style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{success.detail}</p>}
                        {error && <p style={{color: 'red', margin: '5px', textAlign: 'center'}}>{error}</p>}
                        <button type='submit'>Send</button>
                        <button type='button' onClick={() => goBack()}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
