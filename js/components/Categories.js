import React, { Component } from "react";
import { Platform, StyleSheet, View, Dimensions,Image, FlatList, BackHandler, TouchableOpacity } from "react-native";
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
  ListItem,
  Picker,
  Form,
  H3,
  Item as FormItem
} from "native-base";
const deviceWidth = Dimensions.get('window').width;
import ToAPI from '../server/ToAPI'
class Categories extends Component {
  constructor(props) {
    super(props);
    this._BackHandler = this._BackHandler.bind(this)
    this.state = {
      categories: this.props.navigation.state.params.categories
    };
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
  _renderItem = ({item}) => (
    <View removeClippedSubviews={true} style={styles.category}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate("CategoryListProduct", {category: item.category})}>
        <Image style={styles.imageCatergories} source={{uri: item.image}}>
          <View style={styles.containerText}>
            <Text style={styles.nameproduct}>{item.category}</Text>
          </View>
        </Image>
      </TouchableOpacity>
    </View>
  );
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
          <Body>
            <Title>Category</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <FlatList
            data={this.state.categories}
            contentContainerStyle={styles.containerCategory}
            extraData= {this.state}
            removeClippedSubviews={true}
            numColumns={2}
            keyExtractor={(item) => item.category}
            renderItem={this._renderItem}
          />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: 'white'
  },
  category: {
    backgroundColor: '#FBFAFA',
    borderColor: '#CFD8DC',
    height: deviceWidth/2,
    width: deviceWidth/2,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  nameproduct: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  },
  imageCatergories: {
    resizeMode: 'stretch',
    height: deviceWidth/2,
    width: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText : {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 7,
    paddingTop: 7,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: deviceWidth/2,
  },
  containerCategory : {
    alignItems: 'center',
    justifyContent: 'center'
  },
});
export default Categories;
