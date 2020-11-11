import React from 'react'
import AnimatedHeader from './AnimatedHeader/AnimatedHeader'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {View, Platform, TouchableOpacity, Text, StatusBar} from 'react-native';
import Color from '../../Constant/Color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaView} from 'react-native-safe-area-context';

const renderLeft = (navigation) =>
{
  return(
    <TouchableOpacity style={{flex: 0}}
                      onPress={()=>{
                        navigation.goBack()
                      }}>
      <Icon
        name={'arrow-left'}
        size={24}
        color={Color.color_0}
        iconStyle={props.iconStyle}/>
    </TouchableOpacity>
  )
}

const MainHeader = (props) =>
{
  const title = props.title || ""
  const marginBottomTitle = props.marginBottomTitle || 8
  const marginLeftTitle = props.marginLeftTitle || 16
  const headerMaxHeight = props.headerMaxHeight || 120

  const navigation = props.navigation ||  undefined

  return(
    <SafeAreaView style={{flex: 1, paddingTop: getStatusBarHeight(), backgroundColor: Color.color_one_500}}>
      {
        Platform.OS === 'ios' ?
          <View style={{height: 200, top: -getStatusBarHeight(), backgroundColor: Color.color_one_500, position: 'absolute', right: 0, left: 0, flex: 1}}/>
          :
          <View style={{height: StatusBar.currentHeight, top: 0 , backgroundColor: Color.color_one_500, position: 'absolute', right: 0, left: 0, flex: 1, zIndex: 1}}/>
      }
      <AnimatedHeader
        style={{flex: 1}}
        backText="true"
        title={title}
        renderLeft={()=>navigation}
        renderRight={props.renderRight}
        fontSizeTitle={props.fontSizeTitle}
        titleColor={props.titleColor}
        imageSource={props.imageSource}
        renderStaticBody={props.renderStaticBody}
        staticBodyStyle={props.staticBodyStyle}
        titleStyle={{ fontSize: 22, left: marginLeftTitle, bottom: marginBottomTitle, color: Color.color_1}}
        headerMaxHeight={headerMaxHeight}>
        {
          props.children
        }
      </AnimatedHeader>
    </SafeAreaView>
  )
}

export default MainHeader
