/* eslint-disable */
import Api from './Api'

export default {
  register(credentials) {
    return Api().post('api/register', credentials);
  },
  login (credentials) {
    return Api().post('api/login', credentials)
  }
}

// AuthenticationService.register({
//   email: "testing@gmail.com",
//   password: "123456"
// });
