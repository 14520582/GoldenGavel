import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  View
} from "react-native";
import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const drawerCover = require("../assets/newdracover.png");
//const drawerImage = require("../assets/no-image.png");
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import configureStore from '../config/configureStore'
const {persistor} = configureStore()
const datas = [
	{
		name: "Home",
		route: "Home",
		icon: "home",
		bg: "#C5F442",
	},
  {
		name: "My business",
		route: "MyStore",
		icon: "cart",
		bg: "#C5F442",
	},
  {
    name: "Notification",
    route: "Notification",
    icon: "md-notifications",
    bg: "#C5F442",
  },
  {
		name: "Profile",
		route: "Profile",
		icon: "contact",
		bg: "#C5F442",
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
      visiable: true,
		};
	}
  signOut() {
     firebase.auth().signOut().then(() => {
      persistor.purge()
      this.props.navigation.navigate("Login")
     }).catch((error) => {
	   });
  }
	render() {
		return (
      <Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
            <View style={styles.infoUser}>
						      <Image style={styles.drawerImage} source={{uri: this.props.infouser.photoURL}} />
                  <View style={{paddingLeft: 10}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.infouser.displayName}</Text>
                    <Text style={{color: 'white'}}>{this.props.infouser.email}</Text>
                  </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                style={{borderRadius: 8,backgroundColor: '#9E9E9E'}}
      					onPress={() => this.signOut()}
      				>
      					<Icon style={{color: 'white'}} name="log-out" />
      				</Button>
            </View>
					</Image>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => {
                this.props.navigation.navigate(data.route,{user: 'f'})}}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#fff"
  },
  drawerCover: {
    alignSelf: "stretch",
    //resizeMode: 'contain',
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
  },
  infoUser:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 10,
  },
  drawerImage: {
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  buttonContainer: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 247,
    top: Platform.OS === "android" ? deviceHeight / 5 : deviceHeight / 4,
  },
  sidebarIcon: {
    fontSize: 21,
    color: "#fff",
    lineHeight: Platform.OS === "android" ? 21 : 25,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
    firebase: state.fibase
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser))
	}
}
export default connect(
  mapStateToProps,
	mapDispatchToProps,
)(SideBar)
