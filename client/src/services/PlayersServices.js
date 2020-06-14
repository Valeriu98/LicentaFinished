import Api from './Api'
// import { post } from '../../../routes/players'

export default {
  index () {
    return Api().get('api/players')
  },
  post (player) {
    return Api().post('api/player', player)
  }
}
