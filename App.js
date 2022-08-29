//네비게이션 라이브러리 import
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

//스크린 페이지 import
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import LoginScreen from './screens/LoginScreen';
import PostDetail from './screens/PostDetail';
import Auth from './functions/auth';
import Post from './screens/PostScreen';
import Show from './screens/PostShowScreen';
import Load from './screens/LoadingScreen';
import Forward from './screens/APITestForward';
import Middle from './screens/APITestMiddle';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* 네비게이션 설정 */}
      <Stack.Navigator initialRouteName="Home">
        {/*  <Stack.Navigator initialRouteName="Home"> 초기 페이지 설정 */}
        {/* <Stack.Screen name="Home" -> 스크린 닉네임 이걸로 다른 페이지로 넘어가는 코드 짤 때 사용 component={HomeScreen}/> */}
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Show" component={Show} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="Forward" component={Forward} />
        <Stack.Screen name="Middle" component={Middle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
