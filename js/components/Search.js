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
class Search extends Component {
  constructor(props) {
		super(props);
    this._BackHandler = this._BackHandler.bind(this)
    this.state = {
      searchtext: '',
      showclose: false,
      showresult: false,
    };
  }
  componentWillMount (){
  }
  _BackHandler = () => {
    this.props.navigation.goBack(null)
    return true;
  }
  componentDidMount (){
    BackHandler.addEventListener('hardwareBackPress', this._BackHandler)
  }
  componentWillUnMount (){
    BackHandler.removeEventListener('hardwareBackPress', this._BackHandler)
  }
  _renderItem = ({item}) => (
    <View removeClippedSubviews={true}>
      <TouchableOpacity onPress={() => {
          this.setState({searchtext: item, showresult: true, showclose: false})
          Keyboard.dismiss()
        }}>
        <View style={styles.row1}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => this.props.dispatchSearchDelete(item)}>
            <Icon style={{color: '#FFA000'}} name="md-close" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000', alignItems: 'center'}}>
          <Item>
            <Icon name="search" />
            <Input style={{height: 60, paddingTop: 13}}
              autoFocus={true}
              value={this.state.searchtext}
              returnKeyType='search'
              onSubmitEditing={() => {
                if(this.props.search.indexOf(this.state.searchtext) === -1 && this.state.searchtext.trim() !== '')
                this.props.dispatchSearchAdd(this.state.searchtext)
              }}
              onChangeText={(text) => {
                this.setState({searchtext: text})
              }}
              onEndEditing={() => {
                this.setState({showclose: false, showresult: true})
              }}
              onFocus={() => this.setState({showclose: true, showresult: false})}
              placeholder="Search" />
              {
                this.state.showclose && <TouchableOpacity onPress={() => this.setState({searchtext: ''})}>
                  <Icon name="md-close" />
                </TouchableOpacity>
              }
          </Item>
        </Header>
        {
          this.state.showresult && <FilterBar/>
        }
        {
          !this.state.showresult && <View style={styles.row1}>
            <Text style={{color: '#FF8F00'}}>Search history</Text>
            <TouchableOpacity onPress={() => this.props.dispatchSearchClearAll()}>
                <Text style={{color: '#FF8F00'}}>Clear all</Text>
            </TouchableOpacity>
          </View>
        }
        <Content keyboardShouldPersistTaps='always'>
        {
          !this.state.showresult && <View>
          <FlatList
            data={this.props.search}
            extraData= {this.state}
            keyboardShouldPersistTaps='always'
            removeClippedSubviews={true}
            keyExtractor={(item) => item}
            renderItem={this._renderItem}
          />
          </View>
        }
        {
          this.state.showresult && <ListProduct search={this.state.searchtext} navigation={this.props.navigation}/>
        }
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "white",
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row1: {
    flexDirection: 'row',
    padding: 10,
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
    search: state.search
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser)),
    dispatchSearchAdd: (search) => dispatch(searchAdd(search)),
    dispatchSearchDelete: (search) => dispatch(searchDelete(search)),
    dispatchSearchClearAll: () => dispatch(searchClearAll())
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (Search)
