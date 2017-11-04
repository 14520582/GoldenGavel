
import firebase from 'react-native-firebase'
//const firebaseApp = firebase.app('app')
class ToAPI {
  static setUserInfo(userinfo){
    firebase.database().ref().child(`User/${userinfo.uid}`).set(userinfo)
  }
  static getUserInfo(uid, callback){
    firebase.database().ref(`User/${uid}`).once('value', (userinfo) => {callback(userinfo)})
  }
  static pushProduct(productinfo, uid){
    productinfo['uid'] = uid
    firebase.database().ref().child('Product').push(productinfo)
  }
}
module.exports = ToAPI;
