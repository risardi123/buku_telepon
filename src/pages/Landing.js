import React,{useState, useEffect} from 'react'
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
import SecondaryHeader from '../components/SecondaryHeader';
import CellPhone from '../components/CellPhone';
import {useDispatch, useSelector} from 'react-redux';
import {refreshLandingOff} from '../redux/actions/refreshLanding';

const Landing = ({navigation}) => {
  HeaderConfig()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const refresh_landing = useSelector(state=>state.refresh_landing_reducers)
  const {isLoading, data, error, refetch} = useQuery("",()=>
    fetch(`${fetch_link}contact`,{
      method: 'GET',
    }).then((res)=>res.json())
  )
  if(isLoading || error) {
    return (
      <MainHeader title={"Kontak"}>
        <LoadingBlocker/>
      </MainHeader>
    )
  }
  useEffect(()=>{
    if(refresh_landing === true) {
      refetch().then(()=>{
        dispatch(refreshLandingOff())
      })
    }
  },[refresh_landing])
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
                                      onPress={()=>navigation.push("SearchContact", data.data || [])}>
                      <Foundation name={'magnifying-glass'} size={24} color={Color.color_0}/>
                    </TouchableOpacity>
                  </View>
                }>
      <FlatList renderItem={(value, index)=>{
                  const {item} = value || {}
                  const {firstName, lastName, photo, id} = item || {}
                  return(
                    <CellPhone index={index}
                               firstName={firstName}
                               lastName={lastName}
                               photo={photo}
                               id={id}/>
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
