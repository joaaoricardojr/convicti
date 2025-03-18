import axios from 'axios';

const API_URL = '/oauth/token';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const handleLoginError = (error) => {
  if (error.response) {
    console.error('Erro de login:', error.response.status, error.response.data);
    throw {
      status: error.response.status,
      message: `Erro ao fazer login. Código ${error.response.status}: ${error.response.data.message}`,
    };
  } else if (error.request) {
    console.error('Erro de login: Nenhuma resposta do servidor');
    throw { message: 'Erro ao fazer login. Nenhuma resposta recebida do servidor.' };
  } else {
    console.error('Erro de login:', error.message);
    throw { message: `Erro ao fazer login. Erro na requisição: ${error.message}` };
  }
};

const AuthService = {
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
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
      }

      handleLoginError({ response });

    } catch (error) {
      handleLoginError(error);
    }
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getAccessToken() {
    return localStorage.getItem('access_token');
  },
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
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
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
      }
      handleLoginError({ response });
    } catch (error) {
      handleLoginError(error);
    }
  }
};

export default AuthService;