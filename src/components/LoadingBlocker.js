import React from 'react'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import Color from '../Constant/Color';
const LoadingBlocker = (props) =>{
  const {disableTitle, title} = props
  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        style={{flex: 0}}
        size={'large'}
        color={Color.color_one_500}
      />
      {
        disableTitle &&
        <Text>
          {
            title
          }
        </Text>
      }
    </View>
  )
}
export default LoadingBlocker
