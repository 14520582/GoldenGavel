import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity,Dimensions, FlatList,ActivityIndicator } from "react-native";

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

import styles from './styles'
import ResponsiveImage from 'react-native-responsive-image';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import ToAPI from '../../server/ToAPI'
import DateTime from '../../util/DateTime'
const gradient = ['#FFA000','#FFCA28','#FFD54F','#FFE082']
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount(){
    ToAPI.get4ItemByCategory(this.props.category,(data) =>{
      this.setState({
        data: data
      })
    })
  }
  render() {
    return (
      <View>
        <View style={styles.headerCategories}>
          <Text style={styles.titleCategories}>{this.props.category}</Text>
          <TouchableOpacity
           activeOpacity={0.5} onPress={() => this.props.navigation.navigate("CategoryListProduct", {category: this.props.category})}
          >
            <Text style={styles.viewmore}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>
        {
        this.state.data && <View>
          <FlatList
            data={this.state.data}
            contentContainerStyle={styles.containerCategories}
            extraData= {this.state}
            removeClippedSubviews={true}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={this._renderByCategory}
          />
        </View>
        }
        {
          !this.state.data && <View style={styles.loadingCategory}>
            <ActivityIndicator/>
          </View>
        }
        <View style={styles.divideLine}>
        </View>
      </View>
    );
  }
  _renderByCategory = ({item}) => (
    <View removeClippedSubviews={true} style={styles.containerByCategory}>
    <TouchableOpacity
     activeOpacity={0.5} onPress={() => this.props.navigation.navigate("Product", {product: item})}
    >
      {
        <View style={{height: deviceWidth/2, width: deviceWidth/2}}>
          <ResponsiveImage style={{alignSelf: 'center'}} initWidth={deviceWidth/2} initHeight={deviceWidth/2} source={{uri: item.image[0]}}>
          </ResponsiveImage>
          <View style={[styles.rowinfobid, styles.statusHeader, {position: 'absolute',width: deviceWidth/2}]}>
            <Text>{DateTime.convertToStringTime(item.endtime)}</Text>
            <View style={styles.row}>
              <Icon name='md-arrow-dropup' style={[styles.colortext,{paddingRight: 4}]}/>
              <Text style={styles.colortext}>{item.numberofbid}</Text>
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
    </TouchableOpacity>
    </View>
  );
}
export default Category;
