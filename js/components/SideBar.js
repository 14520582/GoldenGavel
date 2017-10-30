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
const drawerCover = require("../assets/drawer-cover.png");
const drawerImage = require("../assets/no-image.png");

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
		name: "Profile",
		route: "Profile",
		icon: "contact",
		bg: "#C5F442",
	},
	{
		name: "Setting",
		route: "Setting",
		icon: "settings",
		bg: "#C5F442",
	},
	{
		name: "Logout",
		route: "Login",
		icon: "log-out",
		bg: "#C5F442",
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
            <View style={styles.infoUser}>
						      <Image style={styles.drawerImage} source={drawerImage} />
                  <View style={{paddingLeft: 10}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Tran Ngoc Nghia</Text>
                    <Text style={{color: 'white'}}>tnnghia6482@gmail.com</Text>
                  </View>
            </View>
					</Image>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
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
    // resizeMode: 'cover',
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  infoUser:{
    flexDirection: 'row',
    alignItems: 'center',
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 14 : deviceWidth / 13,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 7 : deviceHeight / 6,
  },
  drawerImage: {
    //position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    //left: Platform.OS === "android" ? deviceWidth / 14 : deviceWidth / 13,
    // top: (Platform.OS === 'android') ? 45 : 55,
    //top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: Platform.OS === "android" ? 7 : 5
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
export default SideBar;
