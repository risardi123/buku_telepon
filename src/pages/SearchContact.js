import React, {useEffect, useState} from 'react'
import {
  View,
  TextInput,
  FlatList,
  Text
}from 'react-native'
import {HeaderConfig} from '../Constant/Constant';
import SecondaryHeader from '../components/SecondaryHeader';
import Color from '../Constant/Color';
import CellPhone from '../components/CellPhone';
const SearchContact = ({navigation, route}) => {
  HeaderConfig()
  const {params} = route
  const [search, setSearch] = useState("")
  const [searchResult, setResult] = useState([])
  useEffect(()=>{
    setResult(params)
  },[params])
  useEffect(()=>{
    if(search && params.length > 0) {

    } else {
      setResult(params)
    }
  },[search, params])
  return(
    <SecondaryHeader title={"Cari sebuah kontak"}
                     onPressLeft={()=>navigation.goBack()}>
      <View style={{flex: 1}}>
        <View style={{flex: 0, backgroundColor: Color.color_one_500, height: 50, paddingVertical: 6, paddingHorizontal: 12}}>
          <TextInput style={{backgroundColor: Color.color_0}}
                     placeholder={"masukan kata kunci"}
                     onChangeText={(value)=>setSearch(value)}/>
        </View>
        <FlatList data={searchResult}
                  style={{flex: 1}}
                  renderItem={(value, index)=>{
                    const {item} = value || {}
                    const {firstName, lastName, photo, id} = item || {}
                    return(
                      <CellPhone key={index}
                                 isReplace
                                 id={id}
                                 firstName={firstName}
                                 lastName={lastName}
                                 photo={photo}/>
                    )
                  }}/>
      </View>
    </SecondaryHeader>
  )
}
export default SearchContact
