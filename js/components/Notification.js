import React, { Component } from "react";
import { Platform, StyleSheet, } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { updateNotificationNumber, updateMessageNumber } from '../actions/notification'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  FooterTab,
  Footer,
  Left,
  List,
  ListItem,
  Badge,
  Picker,
  Form,
  View,
  H3,
  Item as FormItem
} from "native-base";
import ToAPI from '../server/ToAPI'
import NotificationList from './NotificationList'
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  componentWillMount() {
    //alert(JSON.stringify(this.props.notification))
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Notification</Title>
          </Body>
          <Right />
        </Header>
        {
          this.state.index == 0 && <Content style={{backgroundColor: 'white'}}>
            <NotificationList type='Notification' navigation={this.props.navigation}/>
          </Content>
        }
        {
          this.state.index == 1 && <Content style={{backgroundColor: '#C5E1A5'}}>
          </Content>
        }
        <Footer>
          <FooterTab style={styles.footer}>
            <Button style={this.state.index == 0 ? styles.activebutton : {}} badge={this.props.notification.notification !== 0 ? true : false} vertical onPress={() => this.setState({index: 0})}>
              {
                this.props.notification.notification !== 0 && <Badge><Text>{this.props.notification.notification}</Text></Badge>
              }
              <Icon style={this.state.index == 0 ? styles.active : styles.normal} name="md-notifications" />
              <Text style={this.state.index == 0 ? styles.active : styles.normal}>Notifications</Text>
            </Button>
            <Button style={this.state.index == 1 ? styles.activebutton : {}} badge={this.props.notification.message !== 0 ? true : false} vertical onPress={() => this.setState({index: 1})}>
              {
                this.props.notification.message !== 0 && <Badge><Text>{this.props.notification.message}</Text></Badge>
              }
              <Icon style={this.state.index == 1 ? styles.active : styles.normal} active name="md-chatboxes" />
              <Text style={this.state.index == 1 ? styles.active : styles.normal}>Message</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
  activebutton: {
    backgroundColor: '#FFB300'
  },
  active: {
    color: 'white',
  },
  normal: {
    color: '#FFE082',
  },
  footer: {
    backgroundColor: "#FFA000"
  },
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
    notification: state.notification
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchUpdateNotificationNumber: (notification) => dispatch(updateNotificationNumber(notification)),
    dispatchUpdateMessageNumber: (message) => dispatch(updateMessageNumber(message))
	}
}
export default connect(
  mapStateToProps,
    mapDispatchToProps,
) (Notification)
