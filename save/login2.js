import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet,Styles, Text, View, Button,Alert } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen ({navigation}) {

  const [gUser, setGUser] = useState('');
  const [reqError, setReqError] = useState('');
  const [isLoding,setIsLoding]=useState(false);

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
            
        }
        catch(error){
            console.log('GoogleUserReq error: ', error.response.data);
            setReqError(error.response.data);
        }
        
    }

   //https://library-2022.herokuapp.com/auth/google/user

const giveGoogleUser = async (accessToken) => {
        const giveUser = await axios.post('https://f7479681-8640-4929-b771-f41103825403.mock.pstmn.io/userData', {
            "accessToken": accessToken,
            "userInfo": gUser
        }).then(function(response){
            if (response.status == 201) {
              ///데이터베이스에 있을 경우 ( 기존 회원 )
              console.log('11111');
              AsyncStorage.setItem(
                'User',
                JSON.stringify({
                //   id: response.data.userInfo['id'],
                //   email: response.data.userInfo['email'],
                //   picture: response.data.userInfo['picture'],
                  id: gUser.id,
                  email: gUser.email,
                  picture: gUser.picture,
                }),
                () => {
                  console.log('유저정보 저장 완료');
                  console.log(gUser.id);
                },
              );
              navigation.replace('Home');
            } else { ///데이터베이스에 없을 경우 ( 신규 회원 )
              AsyncStorage.setItem(
                'user_id',
                JSON.stringify(gUser.userInfo['id']),
                () => {
                  console.log('유저정보 저장 완료');
                },
              );
              navigation.replace('Home');
            }
          })
        .catch(console.error)
        .finally(()=>setIsLoding(false));
    }

    return (
        <View style={styles.container}>
           
    
            <Button color="#900124"
                disabled={!request}
                title="Login with Google"
                onPress={() => promptAsync()} 
            
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