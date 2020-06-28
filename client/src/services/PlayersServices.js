import Api from './Api'
// import { post } from '../../../routes/players'

export default {
  index () {
    return Api().get('api/players')
  },
  post (player) {
    return Api().post('api/player', player)
  }
  // delete (player) {
  //   return Api().delete('api/player/{id}')
  // }
  // put (player) {
  //   return Api().put(`api/player/${player.Id_player}`, player)
  // }
}
