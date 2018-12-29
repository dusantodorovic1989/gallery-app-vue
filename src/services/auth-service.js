import http from './http-service';

class AuthService {
  login(email, password) {
    return http.post('auth/login', { email, password }).then((response) => {
      this.setDataForLogin(response.data);
      //console.log(response)
      return response;
});
  }
  register({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    terms_and_conditions
  }) {
    return http
      .post('auth/register', {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        terms_and_conditions
      })
      .then(({ data }) => {
        this.setDataForLogin(data);
        return data;
      })
      .catch((error) => Promise.reject(error.response.data.errors));
  }
    logout() {
    return http.get('auth/logout').then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      //localStorage.removeItem('id');
      this.setAuthHeaders();
    });
}
  setAuthHeaders(token) {
    if (!token) {
      delete http.defaults.headers.common['Authorization'];
    }
    return (http.defaults.headers.common['Authorization'] = `Bearer ${token}`);
  }
  setDataForLogin(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    //localStorage.setItem('id', data.user.id);
    this.setAuthHeaders(data.token);
  }
}

const checkForInitialToken = (authService) => {
  let token = localStorage.getItem('token');
  authService.setAuthHeaders(token);
};

const authService = new AuthService();
checkForInitialToken(authService);
export default authService;