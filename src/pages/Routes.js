import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Landing from './Landing';
import DetailContact from './DetailContact';
import CreateUpdateContact from './CreateUpdateContact';

const Stack = createStackNavigator()
const Root = () =>{
  return(
    <Stack.Navigator initialRouteName={"Landing"}
                     screenOptions={{
                       headerShown: false
                     }}>
      <Stack.Screen name={"Landing"} component={Landing}/>
      <Stack.Screen name={"DetailContact"} component={DetailContact}/>
      <Stack.Screen name={"CreateUpdateContact"} component={CreateUpdateContact}/>
    </Stack.Navigator>
  )
}

const Route = () => {
  return(
    <NavigationContainer>
      <Root/>
    </NavigationContainer>
  )
}
export default Route
