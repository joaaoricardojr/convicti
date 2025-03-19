import axios from 'axios';

const API_URL = '/oauth/token';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

let accessToken = localStorage.getItem('access_token');
let refreshToken = localStorage.getItem('refresh_token');

const handleLoginError = (error) => {
  if (error.response) {
    console.error('Erro de login:', error.response.data);
    throw { message: error.response.data.message || 'Erro de login. Tente novamente.' };
  } else if (error.request) {
    console.error('Erro de login:', error.request);
    throw { message: 'Erro de rede. Verifique sua conexão.' };
  } else {
    console.error('Erro de login:', error.message);
    throw { message: error.message || 'Erro desconhecido. Tente novamente.' };
  }
};

const AuthService = {
  accessToken,
  refreshToken,

  async login(username, password) {
    try {
      const response = await axios.post(API_URL, {
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username,
        password,
      });

      if (response.status === 200) {
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('refresh_token', this.refreshToken);
        return response.data;
      }

      handleLoginError({ response });

    } catch (error) {
      handleLoginError(error);
    }
  },

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getAccessToken() {
    return this.accessToken;
  },

  getRefreshToken() {
    return this.refreshToken;
  },

  isLoggedIn() {
    return !!this.accessToken;
  },

  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw { message: 'Refresh token não encontrado.' };
      }

      const response = await axios.post(API_URL, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      });

      if (response.status === 200) {
        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('refresh_token', this.refreshToken);
        return response.data;
      }
      handleLoginError({ response });
    } catch (error) {
      handleLoginError(error);
    }
  },
};

export default AuthService;