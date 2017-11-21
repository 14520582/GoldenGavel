const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
module.exports = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
  end: {
    color: '#90A4AE',
    paddingRight: 10
  },
  ongoing: {
    color: '#4CAF50',
    paddingRight: 10
  },
  textHeader: {
    fontWeight: 'bold',
    color: '#37474F',
    fontSize: 17
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
