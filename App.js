
//스택형식으로 @react-navigation/native, @react-navigation/stack 두개 install해서 진행시킴
import * as React from 'react';
<<<<<<< HEAD
=======
import { Text, View, Button, StyleSheet} from 'react-native';
>>>>>>> 65791ad (fixed:모듈화정리)
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, createContext } from 'react';

import { UserContext, IPContext } from './contexts';
import MyAllergy from './screens/MyAllergy';
import AddAllergy from './screens/AddAllergy';
import Record from './screens/Record';
import Result from './screens/Result';
import Camera from './screens/Camera';
import Jnformation from './screens/Jnformation';
import Login from './screens/Login';
import BeforeMain from './screens/BeforeMain';
import SignUp from './screens/SignUp'
import MainPage from './screens/MainPage'
<<<<<<< HEAD
=======
import Search from './screens/Search'
>>>>>>> 65791ad (fixed:모듈화정리)

const Stack = createStackNavigator();

export default function App() {
  const [userId, settingId] = useState(null)
<<<<<<< HEAD
  const [IP, settingIP] = useState("10.150.150.105:3000");
=======
  const [IP, settingIP] = useState("192.168.123.110:3000");
>>>>>>> 65791ad (fixed:모듈화정리)
  console.log(userId)
  return ( //기본은 home으로 지정후, 새로생기는 파일마다 이동가능하게 컴포넌트설정.
    <UserContext.Provider value={{ userId, settingId }}>
    <IPContext.Provider value={{IP, settingIP}}>
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="BeforeMain">
=======
      <Stack.Navigator initialRouteName="MainPage">
>>>>>>> 65791ad (fixed:모듈화정리)
      <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BeforeMain'
          component={BeforeMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
<<<<<<< HEAD
=======
          name='Search'
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
>>>>>>> 65791ad (fixed:모듈화정리)
          name="MyAllergy"
          component={MyAllergy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAllergy"
          component={AddAllergy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Record'
          component={Record}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Result'
          component={Result}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Camera'
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Jnformation'
          component={Jnformation}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </IPContext.Provider>
    </UserContext.Provider>
  );
}