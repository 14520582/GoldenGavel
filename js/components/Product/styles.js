
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
module.exports = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
  },
  whitebackground: {
    backgroundColor: "white",
    paddingBottom: 8
  },
  paymentCOD: {
    resizeMode: 'stretch',
    height: 30,
    width: 89,
    marginLeft: 8
  },
  nameproduct1: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
  titleCategories: {
    fontWeight: 'bold',
  },
  textinfobid: {
    fontStyle: 'italic'
  },
  rank: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowBidDetails: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  gavelIcon: {
    height: 25,
    width: 25,
  },
  place: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  placeIcon: {
    height: 36,
    width: 36,
  },
  thumnail: {
    marginLeft: deviceWidth/11,
    marginRight: deviceWidth/12,
  },
  rowBidHistory: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5
  },
  loading: {
    paddingTop: deviceHeight/2 - 150,
    alignItems:'center',
    justifyContent: 'center'
  },
  containernameproduct1: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 50,
    width: 200,
    justifyContent: 'center'
  },
  colortext: {
    color: '#FFA000'
  },
  nameProduct: {
    fontSize: 22,
    fontWeight:'bold',
    color: '#212121',
    //marginTop: 5,
    // marginLeft: deviceWidth*5/100,
    // marginRight: deviceWidth*5/100,
  },
  nameProductContainer: {
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  active: {
		color: 'white'
	},
	tabHeading: {
		backgroundColor: '#FFA000'
	},
	normal: {
		color: '#FFECB3'
	},
  footerButton: {
    backgroundColor: '#F4511E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  imagesViewParent:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagesView:{
    resizeMode: 'stretch',
    height: deviceWidth/4*3,
    width: deviceWidth/4*3,
    position: "relative",
    justifyContent: 'space-between'
  },
  besideImageView: {
    width: deviceWidth/4,
    height: deviceWidth/4*3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subImageViews:{
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection:'row',
    marginTop: 	deviceHeight*(4/11),
    width:(deviceWidth-deviceHeight*10/11)/7,

  },
  smallImage:{
    height: (deviceWidth/4*3)/4,
    width: (deviceWidth/4*3)/4,
  },
  imageUpDown:{
    height:30,
    width:30,
  },
  viewInfo: {
    marginTop: deviceWidth*5/100,
    marginLeft: deviceWidth*3/100,
    marginRight: deviceWidth*3/100,
    borderColor: '#607D8B',
    borderTopWidth: 1,
    borderBottomWidth:1,

  },
  up: {
    fontSize: 18,
    color: '#1565C0',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textBid:{
    fontSize: 22,
    color: '#f44336',
    fontWeight: 'bold',
  },
  addcircle:{
    color: '#9CCC65',
  },
  textInfo:{
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: deviceWidth*2/100,
  },
  date:{
    fontSize: 16,
    fontStyle: 'italic',
  },
  titleSection: {
    fontWeight: 'bold',
  },
  rowinfobid1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 5,
  },
  statusHeader : {
    backgroundColor: 'rgba(255,255,255,0.7)',
    height:30,
    paddingLeft:8,
    paddingRight:8
  },
  loadingCategory: {
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  imageBid: {
    resizeMode: 'stretch',
    height: 200,
    width: 200,
    justifyContent: 'space-between'
  },
  containerBid: {
    backgroundColor: '#FBFAFA',
    borderColor: '#CFD8DC',
  },
  section: {
    paddingLeft: deviceWidth*5/100,
    paddingRight: deviceWidth*5/100,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    backgroundColor: "white"
  },
  conditionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1565C0',
    marginLeft: deviceWidth*2/100,
    marginRight: deviceWidth*2/100,
    fontStyle: 'italic',
  },
  boxCondition:{
    borderWidth: 0.5,
    borderRadius: 3,
    marginLeft: 15,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    margin: 3,
  },
  remainTime:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336'
  },
  rowHeadDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  textTitle:{
    fontSize: 17,
    color: '#757575',
    fontStyle: 'italic',
    marginLeft: deviceWidth*2/100,
  },
  imagePayment:{
    resizeMode: 'stretch',
    height: 40,
    width: 40,
    marginLeft: 8
  },
  viewButton:{
    marginTop: deviceWidth*5/100,
    marginLeft: deviceWidth*5/100,
    marginRight: deviceWidth*5/100,
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lableModal:{
    fontSize:17,
    color: '#212121',
    paddingLeft:30,

  },
  textModal:{
    fontSize:17,
    paddingLeft:deviceWidth*5/100,
    fontWeight:'bold',
    width: deviceWidth*60/100
  },
});
