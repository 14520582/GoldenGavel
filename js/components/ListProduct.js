import React, { Component } from "react";
import { Platform, StyleSheet,TouchableOpacity} from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
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
  Left,
  List,
  Item,
  ListItem,
  Picker,
  Form,
  View,
  Input,
  H3,
  Item as FormItem,
  Thumbnail
} from "native-base";
import Filter from './Filter'
import ToAPI from '../server/ToAPI'
class ListProduct extends Component {
  constructor(props) {
		super(props);
    this.state = {
      showfilter: false,
    };
  }
  componentWillMount (){
    
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000', alignItems: 'center'}}>
          <View>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon style={{color: 'white'}} name="arrow-back" />
            </Button>
          </View>
          <View style={{flex: 1, height: 40, backgroundColor: 'white', borderRadius: 4, alignItems: 'center'}}>
            <Item style={{height: 40, alignItems: 'center', paddingLeft: 10}}>
              <Icon name="search" />
              <Input style={{height: 60}} placeholder="Search" />
              <Button
                transparent
                onPress={() => this.setState({showfilter: !this.state.showfilter})}
              >
                <Icon style={{color : 'black'}} name="md-funnel" />
              </Button>
            </Item>
          </View>
        </Header>
        {
          this.state.showfilter && <Filter/>
        }
        <Content>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "grey"
  },
  header: {
    backgroundColor: "#FFA000",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  footer: {
    backgroundColor: "#FBFAFA",
    flex: 1.5
  },
  avatar: {
    margin: 10
  },
  listItem: {
    color: '#ff1744',
    fontSize: 12
  },
  listItemStyle: {
    flexDirection: 'column'
  }
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
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
) (ListProduct)
