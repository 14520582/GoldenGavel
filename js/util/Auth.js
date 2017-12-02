import configureStore from '../config/configureStore'
const {persistor} = configureStore()
import firebase from 'react-native-firebase';
class Auth {
  static logout(navigation) {
    firebase.auth().signOut().then(() => {
     persistor.purge()
     navigation.navigate("Login")
    }).catch((error) => {
    });
  }
}
module.exports = Auth;
