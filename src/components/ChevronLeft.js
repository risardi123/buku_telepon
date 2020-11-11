import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Color from '../Constant/Color'
import Text from './Text'
import {View, Platform} from 'react-native'
import React from 'react'

const ChevronLeft = (props) =>
{
  return(
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <MaterialCommunity name={'arrow-left'}
                         size={24}
                         color={Color.color_0}
                         iconStyle={props.iconStyle}/>

      {
        Platform.OS === 'ios' &&
        <View style={{marginLeft: 6}}>
          <Text size={17} color={Color.color_0}>
            {
              "Kembali"
            }
          </Text>
        </View>
      }
    </View>
  )
}
export default ChevronLeft
