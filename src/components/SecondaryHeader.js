import {ActivityIndicator, Image, Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from "react-native-status-bar-height"
import Color from '../Constant/Color';
import {isIphoneX, ToolbarHeight} from '../Constant/Constant'
import ChevronLeft from './ChevronLeft'
import Text from './Text'
import React, {memo} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';

const HeaderSecondary = props =>
{
  const headerTitle = typeof props.title !== 'undefined' ? props.title : undefined

  return(
    <SafeAreaView style={{flex: 1, paddingTop: getStatusBarHeight(), backgroundColor: Platform.OS === 'ios' ? Color.color_0 : Color.color_one_500}}>
      <StatusBar translucent
                 backgroundColor="transparent"
                 barStyle={'light-content'}
                 animated/>
      {
        Platform.OS === 'ios' &&
        <View style={{height: 200, top: -150, backgroundColor: Color.color_one_500, position: 'absolute', right: 0, left: 0, flex: 1}}/>
      }
      <View style={[{flex: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.color_one_500,
        padding: 9, flexDirection: 'row', height: ToolbarHeight}]}>
        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                          onPress={typeof props.onPressLeft !== 'undefined' ? props.onPressLeft : undefined}>
          {
            typeof props.onPressLeft !== 'undefined' &&
            <ChevronLeft/>
          }
        </TouchableOpacity>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Text color={Color.color_0}
                bold
                size={17}
                style={{flex: 0, fontWeight: 'bold'}}>
            {
              headerTitle
            }
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {
            props.renderRight
          }
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: Color.color_100}}>
        {
          typeof props.renderStaticBody !== 'undefined' ?
            props.renderStaticBody
            :
            props.children
        }
        {
          Platform.OS === 'ios' &&
          <View style={{height: 50, bottom: -50, backgroundColor: props.bottomBlocker === true ? Color.color_0 : Color.color_100, position: 'absolute', right: 0, left: 0, flex: 1}}/>
        }
      </View>
    </SafeAreaView>
  )
}
export default memo(HeaderSecondary)
