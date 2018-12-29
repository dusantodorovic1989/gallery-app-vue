import http from './http-service';

class AuthService {
  async login(email, password) {
    const response = await http.post('auth/login', { email, password });
    this.setDataForLogin(response.data);
return response;
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
//   async logout() {
//     await http.get('auth/logout');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('id');
//     this.setAuthHeaders();
// }
  setAuthHeaders(token) {
    if (!token) {
      delete http.defaults.headers.common['Authorization'];
    }
    return (http.defaults.headers.common['Authorization'] = `Bearer ${token}`);
  }
  setDataForLogin(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('id', data.user.id);
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