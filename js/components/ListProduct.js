import React, { Component } from "react";
import { Platform, StyleSheet,TouchableOpacity, FlatList, View, Dimensions, ActivityIndicator} from "react-native";
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
  Input,
  H3,
  Item as FormItem,
  Thumbnail
} from "native-base";
import FilterBar from './FilterBar'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import BriefProduct from './BriefProduct'
import ToAPI from '../server/ToAPI'
class ListProduct extends Component {
  constructor(props) {
		super(props);
    this.state = {
      showfilter: false,
      data: null
    };
  }
  componentWillMount (){
    if(this.props.category)
    {
      ToAPI.getItemByCategory(this.props.category,(items) =>{
          this.setState({
            data: items
          })
      })
    }
    else
    {
      //console.log(this.props.search)
      ToAPI.getProductByName(this.props.search,(items) =>{
          this.setState({
            data: items
          })
      })
    }
  }
  _renderItem = ({item}) => {
    return(
        <View>
          <BriefProduct item = {item} navigation={this.props.navigation}/>
        </View>
      )
  }
  render() {
    return (
      <View>
          {
            this.state.data && this.state.data.length > 0 && <View>
              <FlatList
                data = {this.state.data}
                extraData= {this.state}
                keyExtractor={(item) => item.key}
                renderItem = {this._renderItem}
              />
            </View>
          }
          {
            this.state.data && this.state.data.length === 0 && <View style={styles.container}>
              <Text style={{fontSize: 18}}>Sorry, we found no relevent results</Text>
              <View style={{paddingTop: 7}}>
              <Button
                style={{backgroundColor: '#FF8F00'}}
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="home" />
                <Text>Go back Home</Text>
              </Button>
              </View>
            </View>
          }
          {
            !this.state.data && <View style={styles.container}>
              <ActivityIndicator/>
            </View>
          }
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    paddingTop: deviceHeight/2 - 150,
    alignItems:'center',
    justifyContent: 'center'
  },
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
