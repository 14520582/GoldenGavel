
import firebase from 'react-native-firebase'
//const firebaseApp = firebase.app('app')
class ToAPI {
  static setUserInfo(userinfo){
    firebase.database().ref().child(`User/${userinfo.uid}`).set(userinfo)
  }
  static getUserInfo(uid, callback){
    firebase.database().ref(`User/${uid}`).once('value', (userinfo) => {callback(userinfo)})
  }
  static getBanner(callback){
    firebase.database().ref('Banner').once('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          image: child.val(),
        });
      });
      callback(items)
    })
  }
  static getCategories(callback){
    firebase.database().ref('Categories').once('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          category: child.key,
          image: child.val(),
        });
      });
      callback(items.reverse())
    })
  }
  static pushProduct(productinfo, uid){
    productinfo['owner'] = uid
    firebase.database().ref().child('Product').push(productinfo)
  }
}
module.exports = ToAPI;
