import Api from './Api'
// import { post } from '../../../routes/players'

export default {
  getTeams () {
    return Api().get('api/teams')
  },
  post (team) {
    return Api().post('api/team', team)
  }
}
