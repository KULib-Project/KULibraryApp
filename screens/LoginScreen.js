import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet,Styles, Text, View, Button,Alert } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen ({navigation}){ 
 
  const [gUser, setGUser] = useState('');
  const [reqError, setReqError] = useState('');
  const [isLoding,setIsLoding]=useState(false);
  const [gAT, setGAT] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '44328153699-64ovtsdos7gffuc2gnbtmqahrbeav3hj.apps.googleusercontent.com',
    iosClientId: '44328153699-sb96g02ro9a69pe4gbu4i9kag4eq6qoq.apps.googleusercontent.com',
    androidClientId: '44328153699-ogd9nkqs5fg9048r1o8uo0u8hut342m9.apps.googleusercontent.com',
    webClientId: '44328153699-dlqmkgbrdujcslh18r811ta2lemldmje.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });
  
 useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;

            getGoogleUser(authentication.accessToken)
            giveGoogleUser(authentication.accessToken)
            console.log(authentication.accessToken)
        }
    }, [response]);


  
    //구글 로그인 api에 정보 요청
    const getGoogleUser = async (accessToken) => {
        try{
            let gUserReq =await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            
            console.log(gUserReq.data);
            setGUser(gUserReq.data);
            setGAT(accessToken);
        }
        catch(error){
            console.log('GoogleUserReq error: ', error.response.data);
            setReqError(error.response.data);
        }
        
      }

//500아 너는 언제쯤 잡혀줄거니..?
const giveGoogleUser = async (accessToken) => {
        const giveUser = await axios.post('https://library-2022.herokuapp.com/auth/google/user', {
          "accessToken": `"${accessToken}"`,
          "userInfo": {
            "id": `"${JSON.stringify(gUser.id)}"`,
            "email": `"${JSON.stringify(gUser.email)}"`,
            "verified_email": `"${JSON.stringify(gUser.verified_email)}"`,
            "name": `"${JSON.stringify(gUser.name)}"`,
            "given_name":`"${JSON.stringify(gUser.given_name)}"`,
            "family_name": `"${JSON.stringify(gUser.family_name)}"`,
            "picture": `"${JSON.stringify(gUser.picture)}"`,
            "locale": `"${JSON.stringify(gUser.locale)}"`,
            "hd": `"${JSON.stringify(gUser.hd)}"`,
          }
        }).then(response=>{
              
              if(response.status==200){
                console.log('11111');
              console.log(response.status);

              storageData();
              navigation.navigate('Home');
              }
              ///데이터베이스에 있을 경우 ( 기존 회원 )
              else if(response.status==201){
                console.log('22222');
                console.log(response.status);
  
                storageData();
                navigation.navigate('Home');
              }
              
            } 
          )
        .catch(console.error)
        .finally(()=>setIsLoding(false));
    }

    storageData=async()=>{
      await AsyncStorage.setItem(
        'User',
        JSON.stringify({
          id: gUser.id,
          email: gUser.email,
          picture: gUser.picture,
        }),
        () => {
          console.log('유저정보 저장 완료');
          console.log(gUser.id);
        })
    }
const logout=async()=>{
  await AsyncStorage.clear()
  console.log("사용자 데이터가 삭제되었습니다.")
  console.log(AsyncStorage.getItem('User', (error, result) => {
    const UserInfo = JSON.parse(result);
    console.log(UserInfo)
    navigation.replace("Load");
  }))
  
}
const userLog=async()=>{
  console.log(AsyncStorage.getItem('User', (error, result) => {
    const UserInfo = JSON.parse(result);
    console.log(UserInfo)
  }))
}
    return (
        <View style={styles.container}>
           
            {/* 간단한 로그인 버튼 */}
            <Button color="#900124"
                disabled={!request}
                title="Login with Google"
                onPress={() => promptAsync()} 
            
            />
            <Button color="#900124"
                disabled={!request}
                title="Log Out"
                onPress={()=>logout()} 
            
            />
            <Button color="#900124"
                disabled={!request}
                title="데이터 출력"
                onPress={()=> userLog()} 
            
            />
            <StatusBar style="auto" />
        </View>
    );

}

const styles= StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    backgroundColor:'white',
    alignItems: "center",
  },
  })