
import firebase from 'react-native-firebase'
class ToAPI {
  //USER
  static setUserInfo(userinfo){
    firebase.database().ref().child(`User/${userinfo.uid}`).set(userinfo)
  }
  static setPhone(uid, phone){
    firebase.database().ref().child(`User/${uid}/phoneNumber`).set(phone)
  }
  static setFacebook(uid, fb){
    firebase.database().ref().child(`User/${uid}/facebook`).set(fb)
  }
  static setTwitter(uid, twitter){
    firebase.database().ref().child(`User/${uid}/twitter`).set(twitter)
  }
  static setAddress(uid, address){
    firebase.database().ref().child(`User/${uid}/address`).set(address)
  }
  static getUserInfo(uid, callback){
    firebase.database().ref(`User/${uid}`).on('value', (userinfo) => {
      if(userinfo.exists())
        callback(userinfo.val())
      else
        callback(false)
    })
  }
  static setProfilePicture(uid, path, callback){
    const metadata = {
      contentType: 'image/jpeg'
    }
    firebase.storage()
      .ref(`User/${uid}`)
      .putFile(path,metadata)
      .then(uploadedFile => {
        firebase.database().ref().child(`User/${uid}/photoURL`).set(uploadedFile.downloadURL, (result) => {
          if(!result)
            callback(true)
        })
      })
      .catch(err => {
        //alert(err)
      });
  }
  static getCurrentBid(productid, category, callback) {
    firebase.database().ref(`Product/${category}/${productid}/currentbid`).on('value', (bid) => {callback(bid.val())})
  }
  //PRODUCT
  static bid(uid,product,bid){
    ToAPI.getCurrentBid(product.key,product.category,(currentbid) => {
          if(bid > currentbid){
            firebase.database().ref().child(`Product/${product.category}/${product.key}/currentbid`).set(bid)
			firebase.database().ref().child(`Product/${product.category}/${product.key}/numberofbid`).set(numberofbid)
            let now = new Date()
            let details = {
              uid: uid,
              bid: bid,
              date: now.getTime()
            }
            firebase.database().ref().child(`BidDetail/${product.key}`).push(details)
            let contents = {
              sender: uid,
              date: now.getTime(),
              type: 'Bid',
              content: {
                nameitem: product.name,
                keyitem: product.key,
                category: product.category
              },
              status: 'New'
            }
            firebase.database().ref().child(`Notification/${product.owner}`).push(contents)
            let brief = {
              key: product.key,
              category: product.category
            }
            firebase.database().ref().child(`Bid/${uid}/${product.key}`).set(brief)
          }
    })
  }
  static getDetailsBid(productid,callback){
    firebase.database().ref().child(`BidDetail/${productid}`).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getNotification(uid,callback){
    firebase.database().ref().child(`Notification/${uid}`).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getNotificationOnce(uid,callback){
    firebase.database().ref().child(`Notification/${uid}`).once('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static sendMessage(uid, recipient, message, callback){
    let now = new Date()
    let contents = {
      sender: uid,
      date: now.getTime(),
      type: 'Message',
      content: {
        message: message,
      },
      status: 'New'
    }
    firebase.database().ref().child(`Message/${recipient}`).push(contents, (result) => {
        callback(result)
    })
  }
  static getMessage(uid,callback){
    firebase.database().ref().child(`Message/${uid}`).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getMessageOnce(uid,callback){
    firebase.database().ref().child(`Message/${uid}`).once('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        let item = child.val()
        item['key'] = child.key
        items.push(item);
      });
      callback(items.reverse())
    })
  }
  static seen(uid, notificationid, type){
    firebase.database().ref().child(`${type}/${uid}/${notificationid}/status`).set('Seen')
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
  static getMyProduct(uid, callback){
    this.getCategories((categories) => {
      let items = [];
      categories.forEach((i, index, array) => {
        firebase.database().ref(`Product/${i.category}`).orderByChild("owner").equalTo(uid).on('value', (snap) => {
            snap.forEach((child) => {
                  let item = child.val()
                  item['key'] = child.key
                  items.push(item);
            });
            if(index === array.length - 1)
            {
              //console.log(items.length)
              callback(items)
            }
          })
      });
    })
  }
  static getMyBriefBid(uid, callback) {
    firebase.database().ref(`Bid/${uid}`).on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
            let item = child.val()
            item['key'] = child.key
            items.push(item);
      });
      callback(items.reverse())
    })
  }
  static getMyBidDetails(uid, callback){
    this.getMyBriefBid(uid, (bids) => {
      let items = [];
      bids.forEach((i, index, array) => {
        this.getItem(i.key, i.category,(item) => {
          items.push(item)
          if(index === array.length - 1)
          {
            //console.log(items.length)
            callback(items)
          }
        })
      });
    })
  }
  static getProductByName(name, callback){
    this.getCategories((categories) => {
      let items = [];
      categories.forEach((i, index, array) => {
        firebase.database().ref(`Product/${i.category}`).orderByChild("name").startAt(name).endAt(name+'\uf8ff').on('value', (snap) => {
            snap.forEach((child) => {
                  let item = child.val()
                  item['key'] = child.key
                  items.push(item);
            });
            if(index === array.length - 1)
            {
              callback(items)
            }
          })
      });
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
  static getItemByCategory(category,callback){
    let now = new Date()
    firebase.database().ref(`Product/${category}`).orderByChild("endtime").startAt(now.getTime()).on('value', (snap) => {
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
    firebase.database().ref(`Product/${category}/${id}`).on('value', (item) => {
      let product = item.val()
      product['key'] = item.key
      callback(product)
    })
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
