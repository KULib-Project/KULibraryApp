// AsyncStorage값이 null이면 로그인 화면으로 아니라면 홈 화면으로 전환
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet,Styles, Text, View, Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogadingScreen ({navigation}) {
    const [isLoding,setIsLoding]=useState(false);
    const [gUser, setGUser] = useState('');
    const [isNull,setIsNull]=useState();
    const userLog=async()=>{
        console.log(AsyncStorage.getItem('User', (error, result) => {
          const UserInfo = JSON.parse(result);
          setGUser(UserInfo)
          if(gUser != ''){
            setIsNull(false);
          }else{
            setIsNull(true);
          }
        }))
      };
    useEffect(() => {
        setIsLoding(true);
        userLog();
        if (isNull === false) {
            
            setIsNull(true);
            navigation.replace('Home');
            
        }else{
            console.log("로그인을 해주십시오.")
            navigation.replace('Login');
        }
        return () => setIsLoding(false);
    }, []);
    return (
        <View style={styles.container}>
            <Text>로딩 중 ...</Text>
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