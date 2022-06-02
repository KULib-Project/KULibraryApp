import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform, Button, TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import axios from 'axios';
import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from '@react-native-async-storage/async-storage';



const Auth = ({navigation}) =>{
    const [data,setData]=useState([]);
    const [isLoding,setIsLoding]=useState(false);
    const [getValue, setGetValue] = useState('');

    useEffect(()=>{
        setIsLoding(true);
        axios.get('https://702a81d1-ca4d-4ac5-9bbd-67f5353e46af.mock.pstmn.io/user',{ 
            header:{
                token: '1234',
            },
        })
        .then(function(response){
            if (response.status == 201) {
              ///데이터베이스에 있을 경우 ( 기존 회원 )
              console.log('11111');
              AsyncStorage.setItem(
                'User',
                JSON.stringify({
                  id: response.data.userInfo['id'],
                  email: response.data.userInfo['email'],
                  picture: response.data.userInfo['picture'],
                }),
                () => {
                  console.log('유저정보 저장 완료');
                  console.log(response);
                },
              );
              navigation.replace('Home');
            } else { ///데이터베이스에 없을 경우 ( 신규 회원 )
              AsyncStorage.setItem(
                'user_id',
                JSON.stringify(response.data.userInfo['id']),
                () => {
                  console.log('유저정보 저장 완료');
                },
              );
              navigation.replace('Home');
            }
          })
        .catch(console.error)
        .finally(()=>setIsLoding(false));
    },[]);

    // const storeData = async tasks => {
    //     try {
    //       // 'tasks' 라는 항목에 tasks 저장
    //       const accessTok = JSON.stringify(data.accessToken)
    //       const userEmail= JSON.stringify(data.userInfo.email)
    //       await AsyncStorage.setItem('accessToken', accessTok);
    //       await AsyncStorage.setItem('email', userEmail);
    //     } catch (e) {
    //       // saving error
    //       console.log("saveError")
    //     }
    //   }
       
      // 자료 불러오기
    //   const getMultiple = async () => {
    //     try {
    //       // 'tasks'항목에 저장된 자료 
    //       const loadedData = await AsyncStorage.getItem(['accessTok','userEmail']).then(
    //         (value) =>
    //           //AsyncStorage returns a promise so adding a callback to get the value
    //           setGetValue(value));
    //       // 자료가 없을 때 에러가 뜨지 않도록 빈객체를 반환하도록 한다
    //       //setTasks(JSON.parse(loadedData) || "{}");
    //     } catch(e) {
    //       // error reading value
    //       console.log("Error")
    //     }
    //     console.log(loadedData)
    //   }

    return (
        <View style={styles.container}>
        

            <Button color="#900124"
                title="Login with Google"
                onPress={() => Alert.alert()} 
            
            />
            {/* <Text>{JSON.stringify(getMultiple)}</Text> */}
            <StatusBar style="auto" />
        </View>
    );

}
export default Auth;
const styles= StyleSheet.create({
container: {

flex: 1,
backgroundColor: '#fff',
justifyContent: 'center',
backgroundColor:'white',
alignItems: "center",
},
})