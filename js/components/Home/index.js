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
import LinearGradient from 'react-native-linear-gradient';
import ResponsiveImage from 'react-native-responsive-image';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const gradient = ['#FFA000','#FFCA28','#FFD54F','#FFE082']
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: null,
      categories: null,
      newitem: null,
      hotitem: null,
    };
  }
  componentWillMount(){
    // ToAPI.get4ItemByCategory("Fashion",(items) =>{
    //   alert(JSON.stringify(items))
    // })
    // ToAPI.getNewItem(8,(items) =>{
    //   alert(JSON.stringify(items))
    // })
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
    ToAPI.getNewItem(8,(newitem) =>{
      //alert(JSON.stringify(newitem[0]))
      this.setState({
        newitem: newitem
      })
    })
    ToAPI.getHotItem(8,(hotitem) =>{
      this.setState({
        hotitem: hotitem
      })
    })
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
            {
            <View style={styles.headerCategories}>
              <Text style={styles.titleCategories}>Categories</Text>
              <TouchableOpacity
               onPress = { () => this.props.navigation.navigate('Home')}
              >
                <Text style={styles.viewmore}>SEE ALL</Text>
              </TouchableOpacity>
            </View>//'#FFCA28','#FFD54F','#FFE082','#FFECB3'
            }
            {
            // <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            //   locations={[0,0.4,0.7,1]} colors={gradient} style={styles.headerCategories}>
            //   <Text style={styles.titleCategories}>Categories</Text>
            //   <TouchableOpacity
            //    onPress = { () => this.props.navigation.navigate('Home')}
            //   >
            //     <Text style={styles.viewmore}>VIEW MORE</Text>
            //   </TouchableOpacity>
            // </LinearGradient>
            }
            <View>
              {
                this.state.categories && <FlatList
                  data={this.state.categories}
                  removeClippedSubviews={true}
                  horizontal={true}
                  extraData= {this.state}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.category}
                  renderItem={this._renderCategory}
                />
              }
              {
                !this.state.categories && <View style={styles.loadingCategory}>
                  <ActivityIndicator/>
                </View>
              }
              <View style={styles.divideLine}>
              </View>
            </View>
            <View style={styles.headerCategories}>
              <Text style={styles.titleCategories}>New bid</Text>
              <View/>
            </View>
            {
              this.state.newitem && <View>
                <FlatList
                  data={this.state.newitem}
                  horizontal={true}
                  removeClippedSubviews={true}
                  extraData= {this.state}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  renderItem={this._renderItem}
                />
              </View>
            }
            {
              !this.state.newitem && <View style={styles.loadingCategory}>
                <ActivityIndicator/>
              </View>
            }
            <View style={styles.divideLine}>
            </View>
            <View style={styles.headerCategories}>
                <Text style={styles.titleCategories}>Hot bid</Text>
              <View/>
            </View>
            {
              this.state.hotitem && <View>
                <FlatList
                  data={this.state.hotitem}
                  horizontal={true}
                  removeClippedSubviews={true}
                  extraData= {this.state}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  renderItem={this._renderItem}
                />
              </View>
            }
            {
              !this.state.hotitem && <View style={styles.loadingCategory}>
                <ActivityIndicator/>
              </View>
            }
            <View style={styles.divideLine}>
            </View>
            <Category category='Fashion'/>
            <Category category='Jewelry'/>
            <Category category='Computer & Electronics'/>
            <Category category='Watches'/>
            <Category category='Travel'/>
            <Category category='Collectibles'/>
            <Category category='Sunglasses'/>
            <Category category='Discount Certificates'/>
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
  _renderItem = ({item}) => (
    <View style={styles.containerBid}>
      <Image style={styles.imageBid} source={{uri: item.image[0]}}>
        <View style={[styles.rowinfobid, styles.statusHeader]}>
          <Text>2 days 3 hrs</Text>
          <View style={styles.row}>
            <Icon name='md-arrow-dropup' style={[styles.colortext,{paddingRight: 4}]}/>
            <Text style={styles.colortext}>{item.numberofbid}</Text>
          </View>
        </View>
        <View style={styles.containernameproduct1}>
          <Text numberOfLines={2} style={styles.nameproduct1}>{item.name}</Text>
        </View>
      </Image>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Current Bid:</Text>
        <Text style={styles.titleCategories}>{item.currentbid + ' đ'}</Text>
      </View>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Bid Increment:</Text>
        <Text style={styles.titleCategories}>{item.bidincrement + ' đ'}</Text>
      </View>
      <View style={styles.rowinfobid}>
        <Text style={styles.textinfobid}>Starting Bid:</Text>
        <Text style={styles.titleCategories}>{item.startingbid + ' đ'}</Text>
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
