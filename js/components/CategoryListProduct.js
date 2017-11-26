import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, FlatList, Keyboard, BackHandler} from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { searchAdd, searchDelete, searchClearAll } from '../actions/search'
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
import FilterBar from './FilterBar'
import ListProduct from './ListProduct'
import ToAPI from '../server/ToAPI'
class CategoryListProduct extends Component {
  constructor(props) {
		super(props);
    this._BackHandler = this._BackHandler.bind(this)
    this.state = {
    };
  }
  componentWillMount (){
  }
  _BackHandler = () => {
    this.props.navigation.goBack()
    return true;
  }
  componentDidMount (){
    BackHandler.addEventListener('hardwareBackPress', this._BackHandler)
  }
  componentWillUnMount (){
    BackHandler.removeEventListener('hardwareBackPress', this._BackHandler)
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000', alignItems: 'center'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Text style={{color: 'white', fontSize: 19, fontWeight: '600'}}>{this.props.navigation.state.params.category}</Text>
          <Right/>
        </Header>
        <Content keyboardShouldPersistTaps='always' stickyHeaderIndices={[0]}>
          <FilterBar/>
          <ListProduct category={this.props.navigation.state.params.category} navigation={this.props.navigation}/>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "white",
  },
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser)),
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (CategoryListProduct)
