
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
module.exports = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
	name : {
		paddingLeft: 5,
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold'
	},
	colortext: {
		color: '#FFA000'
	},
	bidincrement: {
		fontSize: 20,
		color: '#9CCC65',
		paddingRight: 5
	},
  containerBid: {
    backgroundColor: '#FBFAFA',
    borderColor: '#CFD8DC',
		borderWidth: 0.5,
  },
  imageBid: {
    resizeMode: 'stretch',
    height: 200,
    width: 200,
    justifyContent: 'space-between'
  },
  imageCatergories: {
    resizeMode: 'stretch',
    height: 100,
    width: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinfobid: {
    fontStyle: 'italic'
  },
  rowinfobid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
		paddingRight: 5,
		paddingTop: 10,
		paddingBottom: 10
  },
	rowinfobid1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
		paddingRight: 5,
		paddingLeft: 5,
  },
 slide: {
	 flex: 1,
	 justifyContent: 'center',
	 backgroundColor: 'transparent'
 	},
	containerByCategory: {
		height: deviceWidth/2 + 70,
		width: deviceWidth/2,
		borderWidth: 0.5,
		borderColor:'#CFD8DC'
	},
  headerhomescreen: {
    backgroundColor: '#FFA000'
  },
  containerCategories: {
    alignItems: 'center'
  },
  category: {
    backgroundColor: '#FBFAFA',
    borderColor: '#CFD8DC',
    height: 100,
    width: 100,
    borderRightWidth: 1
  },
  viewmore: {
    fontWeight: 'bold',
    color: '#FF6F00'
  },
  nameproduct1: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
  containernameproduct1: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 50,
    width: 200,
    justifyContent: 'center'
  },
  titleCategories: {
    fontWeight: 'bold',
  },
	containerCategory : {
		backgroundColor: 'rgba(0,0,0,0.2)',
		height: 100,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
  row :{
    flexDirection: 'row',
    alignItems: 'center'
  },
	divideLine :{
		backgroundColor: '#E0E0E0',
		height: 12,
	},
  headerCategories: {
    padding: 15,
  	backgroundColor: '#F5F5F5',
    flexDirection: 'row',
		borderColor: '#CFD8DC',
		borderTopWidth: 1,
		borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
	statusHeader : {
		backgroundColor: 'rgba(255,255,255,0.7)',
		height:30,
		paddingLeft:8,
		paddingRight:8
	},
	currentbid : {
		paddingLeft: 5,
		fontSize: 16,
		color: '#FFA000',
		fontWeight: 'bold'
	},
  wrapper: {
    height: deviceHeight/3.5,
		alignItems: 'center',
		justifyContent: 'center'
  },
	loadingCategory: {
		height: 100,
		alignSelf: 'center',
		justifyContent: 'center'
	},
  banner:{
    alignSelf: 'stretch',
    height: deviceHeight/3.5,
    width: null,
    position: 'relative'
  },
});
