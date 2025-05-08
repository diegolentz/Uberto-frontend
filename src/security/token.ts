class Token {
    token = ''
    clearToken() {
        localStorage.removeItem('token')
    }

    setToken(newToken: string) {
        localStorage.setItem('token', newToken)
    }

    getToken() {
        return localStorage.getItem('token') || ''
    }
}

export const token = new Token()