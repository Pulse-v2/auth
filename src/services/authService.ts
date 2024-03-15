import axiosInstance from '../api/axiosInstance';

class AuthService {

    login(email: string, password: string) {
        return axiosInstance.post('/auth/login', {email, password});
    }

    resetPassword(email: string) {
        return axiosInstance.post('/auth/password-reset', {email});
    }

    setPassword(credentials: { password: string; password_confirm: string; token: string; secret: string; }) {
        const {token, password, secret, password_confirm} = credentials
        return axiosInstance.post('/auth/password-set', {token, secret, password, password_confirm});
    }

    getToken(access_id: string) {
        return axiosInstance.post('/access_token', {access_id});
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    // refreshToken(refresh_token: string) {
    //     return axiosInstance.post('/refresh_token', { refresh_token });
    // }
    // clearToken() {
    //     return localStorage.removeItem('token')
    // }
}

export default new AuthService();
