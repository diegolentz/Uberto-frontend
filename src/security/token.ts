class Token {
    token = ''
    clearToken() {
        this.token = '';
    }


    getToken() {
        return localStorage.getItem('token') || '';
    }
}

export const token = new Token();
//asd 