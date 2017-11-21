
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
  static async getMyProduct(uid, callback){
    // firebase.database().ref('Categories').once('value',(categories) => {
    //   let items = [];
    //   categories.forEach((category) => {
    //     firebase.database().ref(`Product/${category.key}`).orderByChild("owner").equalTo(uid).on('value', (snap) => {
    //       snap.forEach((child) => {
    //         let item = child.val()
    //         item['key'] = child.key
    //         items.push(item);
    //       });
    //     })
    //     //if(index === array.length -1) callback(items)
    //   });
    // })
    this.getCategories((categories) => {
      let items = [];
      for(let i=0; i < categories.length; i++ ) {
        firebase.database().ref(`Product/${categories[i].category}`).orderByChild("owner").equalTo(uid).on('value', (snap) => {
          snap.forEach((child) => {
              let item = child.val()
              item['key'] = child.key
              items.push(item);
              if(i == (categories.length - 1))
              {
                callback(items)
              }
        });
        })
      }
    })
  }
  static upLoadPhoto(url,category,name,index){
    const metadata = {
      contentType: 'image/jpeg'
    }
    let now = new Date()
    return firebase.storage()
      .ref(`Product/${category}/${name + '_' + now.getTime() + '_' + index}`)
      .putFile(url,metadata)
      .then(uploadedFile => uploadedFile)
      .catch(err => {
        //alert(err)
      });
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
    let now = new Date()
    firebase.database().ref(`Product/${category}`).orderByChild("endtime").startAt(now.getTime()).limitToLast(4).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getItem (id,category,callback) {
    firebase.database().ref(`Product/${category}/${id}`).on('value', (item) => {callback(item.val())})
  }
  static getNewItem (limit,callback) {
    firebase.database().ref('Product/NewItem').on('value', (snap) => {
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
    firebase.database().ref('Product/HotItem').on('value', (snap) => {
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
    firebase.database().ref().child(`Product/${productinfo.category}`).push(productinfo)
  }
}
module.exports = ToAPI;
