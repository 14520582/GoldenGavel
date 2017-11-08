import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity,Dimensions, FlatList } from "react-native";

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
const img1 = 'https://images.freecreatives.com/wp-content/uploads/2016/09/Multipurpose-Travel-Banner.jpg'
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <View style={styles.headerCategories}>
          <Text style={styles.titleCategories}>{this.props.category}</Text>
          <TouchableOpacity
           onPress = { () => this.props.navigation.navigate('Home')}
          >
            <Text style={styles.viewmore}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={this.props.data}
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
}
