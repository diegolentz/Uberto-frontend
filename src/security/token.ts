class Token {
    token = ''
    clearToken() {
        this.token = '';
    }

    getToken() {
        return sessionStorage.getItem('token') || '';
    }
}

export const token = new Token();