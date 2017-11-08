import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity,Dimensions, FlatList, ActivityIndicator } from "react-native";

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
	Item,
  Form,
	Input,
  Item as FormItem
} from "native-base";
import { connect } from 'react-redux'
import ToAPI from '../../server/ToAPI'
import Swiper from 'react-native-swiper';
import styles from './styles'
import Category from './Category'
import ResponsiveImage from 'react-native-responsive-image';
const banner1 = require("../../assets/banner1.jpg");
const banner2 = require("../../assets/banner2.jpg");
const banner3 = require("../../assets/banner3.jpg");
const banner4 = require("../../assets/banner4.jpg");
const banner5 = require("../../assets/banner5.jpg");
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const categories = [
  {
    title: 'Fashion',
    image: require("../../assets/fashion.jpg")
  },
  {
    title: 'Jewelry',
    image: require("../../assets/jewelry.jpg")
  },
  {
    title: 'Travel',
    image: require("../../assets/travel.jpg")
  },
  {
    title: 'Watches',
    image: require("../../assets/watches.jpg")
  },
  {
    title: 'Computer & Electronics',
    image: require("../../assets/computers.jpg")
  },
  {
    title: 'Sunglasses',
    image: require("../../assets/sunglasses.jpg")
  },
  {
    title: 'Collectibles',
    image: require("../../assets/collectibles.jpg")
  },
  {
    title: 'Discount Certificates',
    image: require("../../assets/discountcertificates.jpg")
  },
]
const fashion = [
  {
    name: 'Gucci Bow-detailed ribbed knit-trimmed pleated stretch-crepe mini dress',
    cover: require("../../assets/dress.jpg"),
    currentbid: 2500000,
    bidincrement: 25000
  },
  {
    name: 'Gucci embroidered cropped track pants',
    cover: require("../../assets/pants.jpg"),
    currentbid: 2500000,
    bidincrement: 25000
  },
  {
    name: 'Silk bomber jacket with embroideries',
    cover: require("../../assets/jacket.jpg"),
    currentbid: 2500000,
    bidincrement: 25000
  },
  {
    name: 'Gucci Logo T-Shirt',
    cover: require("../../assets/t-shirt.jpg"),
    currentbid: 2500000,
    bidincrement: 25000
  },
]
const img = 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/883031/580/290/m1/fpnw/wm1/travel-banner1-.jpg?1451975070&s=35e1691da6cd8415dd5c08a83e7f2d86'
const img1 = 'https://images.freecreatives.com/wp-content/uploads/2016/09/Multipurpose-Travel-Banner.jpg'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: null,
      categories: null,
    };
  }
  componentWillMount(){
  }
  componentDidMount(){
    ToAPI.getBanner((banner) =>{
      this.setState({
        banner: banner
      })
    })
    ToAPI.getCategories((categories) =>{
      this.setState({
        categories: categories
      })
    })
  }
  _renderCategories(type, data){
    return(
      <View>
      <View style={styles.headerCategories}>
        <Text style={styles.titleCategories}>{type}</Text>
        <TouchableOpacity
         onPress = { () => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.viewmore}>VIEW MORE</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={data}
          contentContainerStyle={styles.containerCategories}
          extraData= {this.state}
          removeClippedSubviews={true}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={this._renderByCategory}
        />
      </View>
      </View>
    );
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded androidStatusBarColor='#FF8F00' style={styles.headerhomescreen}>
				<Left style={styles.row}>
  				<Button
  					transparent
  					onPress={() => this.props.navigation.navigate("DrawerOpen")}
  				>
  					<Icon name="menu" />
  				</Button>
          <Title style={{paddingLeft: 10}}>Home</Title>
				</Left>
				<Item>
					<Icon name="search" />
					<Input style={{height: 60}} placeholder="Search" />
				</Item>
        </Header>
        <Content>
            {
              this.state.banner && <Swiper style={styles.wrapper} autoplay={true}>
                <Image source ={{uri: this.state.banner[0].image}} style={styles.banner}/>
                <Image source ={{uri: this.state.banner[1].image}} style={styles.banner}/>
                <Image source ={{uri: this.state.banner[2].image}} style={styles.banner}/>
                <Image source ={{uri: this.state.banner[3].image}} style={styles.banner}/>
                <Image source ={{uri: this.state.banner[4].image}} style={styles.banner}/>
              </Swiper>
            }
            {
              !this.state.banner && <View style={styles.wrapper}>
                <ActivityIndicator/>
              </View>
            }
            <View style={styles.headerCategories}>
              <Text style={styles.titleCategories}>Categories</Text>
              <TouchableOpacity
               onPress = { () => this.props.navigation.navigate('Home')}
              >
                <Text style={styles.viewmore}>VIEW MORE</Text>
              </TouchableOpacity>
            </View>
            <View>
              {
                this.state.categories && <FlatList
                  data={this.state.categories}
                  removeClippedSubviews={true}
                  horizontal={true}
                  extraData= {this.state}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.title}
                  renderItem={this._renderCategory}
                />
              }
              {
                !this.state.categories && <View style={styles.loadingCategory}>
                  <ActivityIndicator/>
                </View>
              }
            </View>
            <View style={styles.headerCategories}>
              <Text style={styles.titleCategories}>New bid</Text>
              <View/>
            </View>
            <View>
              <FlatList
                data={categories}
                horizontal={true}
                removeClippedSubviews={true}
                extraData= {this.state}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.title}
                renderItem={this._renderItem}
              />
            </View>
            <View style={styles.headerCategories}>
              <Text style={styles.titleCategories}>Hot bid</Text>
              <View/>
            </View>
            <View>
              <FlatList
                data={categories}
                horizontal={true}
                removeClippedSubviews={true}
                extraData= {this.state}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.title}
                renderItem={this._renderItem}
              />
            </View>
            {this._renderCategories('Computer & Electronics',fashion)}
            {this._renderCategories('Jewelry',fashion)}
            {this._renderCategories('Fashion',fashion)}
            {this._renderCategories('Watches',fashion)}
            {this._renderCategories('Travel',fashion)}
            {this._renderCategories('Collectibles',fashion)}
            {this._renderCategories('Sunglasses',fashion)}
            {this._renderCategories('Discount Certificates',fashion)}
        </Content>
      </Container>
    );
  }
  _renderCategory = ({item}) => (
    <View style={styles.category}>
      <Image style={styles.imageCatergories} source={{uri: item.image}}>
        <View style={styles.containerCategory}>
          <Text style={styles.nameproduct1}>{item.category}</Text>
        </View>
      </Image>
    </View>
  );
  _renderByCategory = ({item}) => (
    <View removeClippedSubviews={true} style={styles.containerByCategory}>
      {
        <View style={{height: deviceWidth/2, width: deviceWidth/2}}>
          <ResponsiveImage style={{alignSelf: 'center'}} initWidth={deviceWidth/2} initHeight={deviceWidth/2} source={{uri: img1}}>
          </ResponsiveImage>
          <View style={[styles.rowinfobid, styles.statusHeader, {position: 'absolute',width: deviceWidth/2}]}>
            <Text>2 days 3 hrs</Text>
            <View style={styles.row}>
              <Icon name='md-arrow-dropup' style={styles.colortext}/>
              <Text style={styles.colortext}>124</Text>
            </View>
          </View>
        </View>
      }
      <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
      <View style={styles.rowinfobid}>
        <Text style={styles.currentbid}>{item.currentbid +' đ'}</Text>
        <View style={styles.row}>
          <Icon name='md-add-circle' style={styles.bidincrement}/>
          <Text>{item.bidincrement}</Text>
        </View>
      </View>
    </View>
  );
  _renderItem = ({item}) => (
    <View style={styles.containerBid}>
      <Image style={styles.imageBid} source={{uri: img1}}>
        <View style={[styles.rowinfobid, styles.statusHeader]}>
          <Text>2 days 3 hrs</Text>
          <View style={styles.row}>
            <Icon name='md-arrow-dropup' style={styles.colortext}/>
            <Text style={styles.colortext}>124</Text>
          </View>
        </View>
        <View style={styles.containernameproduct1}>
          <Text numberOfLines={2} style={styles.nameproduct1}>TWO SMALL PIECES OF FRAMED ARTWORK </Text>
        </View>
      </Image>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Current Bid:</Text>
        <Text style={styles.titleCategories}>2,001,000 đ</Text>
      </View>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Bid Increment:</Text>
        <Text style={styles.titleCategories}>5,000 đ</Text>
      </View>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Starting Bid:</Text>
        <Text style={styles.titleCategories}>1,000,000 đ</Text>
      </View>
    </View>
  );
}
function mapStateToProps (state) {
	return {
		infouser: state.infouser
	}
}
export default connect(
  mapStateToProps,
)(Home)
