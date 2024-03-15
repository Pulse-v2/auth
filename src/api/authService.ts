class AuthService {
    getToken() {
        return localStorage.getItem('token')
    }

    setToken(token: string) {
        // Logic to store the Access Token
    }

    refreshToken(token: string) {
        return ''
    }

    clearToken() {
        return localStorage.removeItem('token')
    }

    login(username: string, password: string) {
        const token = ''
        const userData = {}
        return {token, userData}
    }

    getUserData() {
        return {}
    }

    // Other authentication related methods
}

export default new AuthService();
