
import firebase from 'react-native-firebase'
//const firebaseApp = firebase.app('app')
class ToAPI {
  static setUserInfo(userinfo){
    firebase.database().ref().child(`User/${userinfo.uid}`).set(userinfo)
  }
  static getUserInfo(uid, callback){
    firebase.database().ref(`User/${uid}`).once('value', (userinfo) => {callback(userinfo.val())})
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
  static get4ItemByCategory(category,callback){
    firebase.database().ref('Product').orderByChild("category").equalTo(category).limitToLast(4).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getItem (id,callback) {
    firebase.database().ref(`Product/${id}`).on('value', (item) => {callback(item.val())})
  }
  static getNewItem (limit,callback) {
    firebase.database().ref('Product').limitToLast(limit).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getHotItem (limit,callback) {
    firebase.database().ref('Product').limitToFirst(limit).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
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
