import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Color from '../Constant/Color';
import {useNavigation} from '@react-navigation/native'

const CellPhone = (props) => {
  const {index, photo, firstName, lastName, isReplace} = props
  const navigation = useNavigation()
  return(
    <View key={index}
          style={{flex: 1, margin: 8, padding: 8, borderBottomWidth: 1, borderColor: 'lightgray'}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 50, height: 50, borderRadius: 50, marginRight: 12, backgroundColor: 'lightgray'}}
               source={{uri: photo || ""}}/>
        <TouchableOpacity style={{flex: 1}}
                          onPress={()=>{
                            isReplace ?
                              navigation.replace("DetailContact", props)
                              :
                              navigation.push("DetailContact", props)

                          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {`${firstName} ${lastName}`}
          </Text>
          <Text>
            0812321321
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius: 50, marginLeft: 6, padding: 4}}>
          <Foundation name={'telephone'} size={26} color={Color.color_two_500}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default CellPhone
