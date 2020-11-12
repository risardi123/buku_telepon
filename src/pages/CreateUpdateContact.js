import React, {useState, useEffect} from 'react'
import {
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import Color from '../Constant/Color';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import SecondaryHeader from '../components/SecondaryHeader';
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from 'react-hook-form';
import ControlledFloatingLabel from '../components/ControlledFloatingLabel';
import {update_contact} from '../fetcher/update_contact';
import {create_contact} from '../fetcher/create_contact';
import {useDispatch} from 'react-redux';
import {refreshLandingOn} from '../redux/actions/refreshLanding';

const CreateUpdateContact = ({navigation, route}) => {
  const {params} = route
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const defaultValue = {
    ref_first: "",
    ref_last: "",
    ref_age: "",
    ref_photo_link: ""
  }
  const validationForm = yup.object().shape({
    ref_first: yup.string().required("Nama depan diperlukan"),
    ref_last: yup.string().required("Nama belakang diperlukan"),
    ref_age: yup.number().required("Umur diperlukan").typeError("Umur diperlukan").max(100, "Maksimal umur 100")
  })
  const {register, handleSubmit, errors, control, setValue} = useForm({
    defaultValues: defaultValue,
    reValidateMode: "onChange",
    resolver: yupResolver(validationForm)
  })
  useEffect(()=>{
    if(params) {
      const {firstName, lastName, age, photo} = params
      setValue("ref_first", firstName)
      setValue("ref_last", lastName)
      setValue("ref_age", age.toString())
      setValue("ref_photo_link",photo)
    }
  },[params])
  const onSubmit = (value) =>{
    setLoading(true)
    const {ref_first, ref_last, ref_age, ref_photo_link} = value
    const body = {
      "firstName": ref_first.trim(),
      "lastName": ref_last.trim(),
      "age": parseInt(ref_age),
      "photo": ref_photo_link.trim()
    }
    if(params) {
      update_contact({
        id: params.id,
        body: body
      }).then((v)=>{
        setLoading(false)
        if(v.error) {
          Alert.alert(v.error, v.message)
        } else {
          Alert.alert("Berhasil", "Memperbarui Kontak anda", [{
            text: 'ya',
            onPress:()=>dispatch(refreshLandingOn())
          }])
        }
      }).catch((e)=>{
        setLoading(false)
        Alert.alert("catch",JSON.stringify(e))
      })
    } else {
      create_contact({
        body: body
      }).then((v)=>{
        setLoading(false)
        if(v.error) {
          Alert.alert(v.error, v.message)
        } else {
          Alert.alert("Berhasil","Membuat kontak baru",[{
            text: "ya",
            onPress:()=>dispatch(refreshLandingOn())
          }])
        }
      }).catch((e)=>{
        setLoading(false)
        Alert.alert("catch",JSON.stringify(e))
      })
    }
  }
  return(
    <SecondaryHeader title={`${params ? "Perbarui" : "Buat"} Kontak`}
                     renderRight={
                       <TouchableOpacity onPress={handleSubmit(onSubmit)}
                                         disabled={loading}>
                         {
                           !loading ?
                             <MaterialCommunity name={'content-save'}
                                                size={24}
                                                color={Color.color_0}/>
                                                :
                             <ActivityIndicator
                               style={{flex: 0}}
                               size={'large'}
                               color={Color.color_0}
                             />
                         }
                       </TouchableOpacity>}
                     onPressLeft={()=>navigation.goBack()}>
      <ScrollView>
        <ControlledFloatingLabel control={control}
                                 editable={!loading}
                                 register={register}
                                 name={"ref_first"}
                                 error={errors.ref_first}
                                 placeholder={"Nama Depan"}/>
        <ControlledFloatingLabel control={control}
                                 editable={!loading}
                                 register={register}
                                 name={"ref_last"}
                                 error={errors.ref_last}
                                 placeholder={"Nama Belakang"}/>
        <ControlledFloatingLabel control={control}
                                 editable={!loading}
                                 register={register}
                                 name={"ref_age"}
                                 error={errors.ref_age}
                                 keyboardType={'number-pad'}
                                 placeholder={"Umur"}/>
        <ControlledFloatingLabel control={control}
                                 editable={!loading}
                                 register={register}
                                 name={"ref_photo_link"}
                                 error={errors.ref_photo_link}
                                 placeholder={"Foto Link"}/>
      </ScrollView>
    </SecondaryHeader>
  )
}
export default CreateUpdateContact
