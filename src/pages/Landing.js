import React,{useState} from 'react'
import {
  FlatList,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native'
import MainHeader from '../components/header/MainHeader';
import {fetch_link, HeaderConfig} from '../Constant/Constant';
import {useQuery} from 'react-query';
import Color from '../Constant/Color';
import Foundation from 'react-native-vector-icons/Foundation';
import LoadingBlocker from '../components/LoadingBlocker';

const Landing = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  HeaderConfig()
  const {isLoading, data, refetch} = useQuery("",()=>
    fetch(`${fetch_link}contact`,{
      method: 'GET',
    }).then((res)=>res.json())
  )
  
  return(
    <MainHeader title={"Kontak"}
                renderStaticBody={isLoading ? <LoadingBlocker/> : undefined}
                renderRight={()=>
                  <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                    <TouchableOpacity style={{borderRadius: 50, marginRight: 6, padding: 4}}
                                      onPress={()=>navigation.push("CreateUpdateContact")}>
                      <Foundation name={'plus'} size={24} color={Color.color_0}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 50, marginLeft: 6, padding: 4}}
                                      onPress={()=>navigation.push("SearchContact")}>
                      <Foundation name={'magnifying-glass'} size={24} color={Color.color_0}/>
                    </TouchableOpacity>
                  </View>
                }>
      <FlatList renderItem={(value, index)=>{
                  const {item} = value || {}
                  const {firstName, lastName, photo} = item || {}
                  return(
                    <View key={index}
                          style={{flex: 1, margin: 8, padding: 8, borderBottomWidth: 1, borderColor: 'lightgray'}}>
                      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 50, height: 50, borderRadius: 50, marginRight: 12, backgroundColor: 'lightgray'}}
                               source={{uri: photo || ""}}/>
                        <TouchableOpacity style={{flex: 1}}
                                          onPress={()=>navigation.push("DetailContact",value)}>
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
                }}
                data={data && data.data}
                refreshing={loading}
                progressViewOffset={150}
                onRefresh={()=>{
                  setLoading(true)
                  refetch().then(()=>setLoading(false)).catch((e)=>Alert.alert("Error", e))
                }}/>
    </MainHeader>
  )
}
export default Landing
