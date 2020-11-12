import React, {useState} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {DeviceWidth, fetch_link, HeaderConfig} from '../Constant/Constant';
import SecondaryHeader from '../components/SecondaryHeader';
import Color from '../Constant/Color';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useQuery} from 'react-query';
import LoadingBlocker from '../components/LoadingBlocker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import {delete_contact} from '../fetcher/delete_contact';
const calculateWidth = DeviceWidth * 0.3
const LocalImage = (props) => {
  const {photo} = props
  return(
    <View style={{flex: 1, height: calculateWidth, width: calculateWidth, borderRadius: DeviceWidth * 0.3, backgroundColor: 'lightgray'}}>
      <Image source={{uri: photo || ""}}
             style={{flex: 1, borderRadius: calculateWidth, height: calculateWidth, width: calculateWidth,}}/>
    </View>
  )
}
const DetailContact = ({navigation, route}) => {
  const [loading, setLoading] = useState(false)
  HeaderConfig()
  const {params} = route || {}
  const {id} = params || {}
  const {isLoading, data, error} = useQuery("asd",()=>
    fetch(`${fetch_link}contact/${id}`,{
      method: 'GET',
    }).then((res)=>res.json())
  )
  if(isLoading || error) {
    return (
      <SecondaryHeader title={"Detail Kontak"}
                       onPressLeft={()=>navigation.goBack()}>
        {
          !error ? <LoadingBlocker/> : <Text>Something went wrong</Text>
        }
      </SecondaryHeader>
    )
  }
  const onSubmit = () =>{
    setLoading(true)
    delete_contact({
      id: id
    }).then((v)=>{
      setLoading(false)
      if(v.error) {
        Alert.alert(v.error, v.message)
      } else {
        Alert.alert("Berhasil", "Kontak Terhapus", [{
          text: 'Kembali',
          onPress:()=>navigation.popToTop()
        }])
      }
    }).catch((e)=>{
      setLoading(false)
      Alert.alert("catch",JSON.stringify(e))
    })
  }
  const {photo, firstName, lastName} = data.data || {}
  return(
    <SecondaryHeader title={"Detail Kontak"}
                     renderRight={
                       <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                         {
                           !loading ?
                             <>
                               <TouchableOpacity onPress={()=>navigation.push("CreateUpdateContact", data.data)}
                                                 style={{paddingRight: 12}}>
                                 <MaterialIcons name={'edit'}
                                                size={24}
                                                color={Color.color_0}/>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={()=>Alert.alert("Konfirmasi", "Apakah anda yakin untuk menghapus?",[
                                 {
                                   text: "Ya",
                                   onPress:()=>onSubmit()
                                 },
                                 {
                                   text: "Tidak"
                                 }
                               ])}>
                                 <MaterialCommunity name={'trash-can'}
                                                    size={24}
                                                    color={Color.color_0}/>
                               </TouchableOpacity>
                             </>
                             :
                             <ActivityIndicator
                               style={{flex: 0}}
                               size={'large'}
                               color={Color.color_0}
                             />
                         }
                       </View>
                     }
                     onPressLeft={()=>navigation.goBack()}>
      <ScrollView>
        <View style={{paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
          <View style={{flex: 1, paddingVertical: 16, justifyContent: 'center', alignItems: 'center'}}>
            <LocalImage photo={photo}/>
          </View>
          <View style={{paddingHorizontal: 12,flex: 1, alignItems: 'center', marginBottom: 8}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{`${firstName} ${lastName}`}</Text>
          </View>
          <View style={{paddingHorizontal: 12, flex: 1, alignItems: 'center', marginBottom: 12}}>
            <Text style={{fontSize: 16}}>000812321321</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: DeviceWidth * 0.25}}>
            <TouchableOpacity>
              <Foundation name={'video'}
                          size={24}
                          color={Color.color_two_500}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Foundation name={'telephone'}
                          size={24}
                          color={Color.color_two_500}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={'chatbox'}
                        size={24}
                        color={Color.color_one_500}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: 12, paddingBottom: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 8}}>Profile</Text>
          <Text style={{fontSize: 14}}>
            Logged in users can view full social security numbers and can save their fake names to use later.
          </Text>
        </View>
      </ScrollView>
    </SecondaryHeader>
  )
}
export default DetailContact
