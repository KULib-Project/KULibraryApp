import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet,Styles, Text, View, Button } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen () {

  const [gUser, setGUser] = useState('');
  const [reqError, setReqError] = useState('');
  

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
            let gUserReq = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            
            console.log(gUserReq.data);
            setGUser(gUserReq.data);
            
        }
        catch(error){
            console.log('GoogleUserReq error: ', error.response.data);
            setReqError(error.response.data);
        }
        
    }

    // const giveGoogleUser = async (accessToken) => {
    //     try{
    //         const giveUserReq = axios.post('https://cdd4-218-236-137-10.ngrok.io/auth/google/user',
            
    //         {
    //                 method:'POST',
    //                 mode: 'no-cors',
    //                 headers:{
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                     'Accept': 'application/json'
    //                   },
    //                 body:JSON.stringify({"accessToken":accessToken, "userInfo":gUser})
    //             }
    //         );
            
    //         console.log(giveUserReq.data);
            
            
    //     }
    //     catch(error){
    //         console.log('GiveUserReq error: ', error);
    //         setReqError(error);
    //     }
        
    // }
//   fetch('https://cdd4-218-236-137-10.ngrok.io/auth/google/user',{
//           method: 'POST',
//           body: JSON.stringify({"accessToken" : accessToken,"userInfo" : gUser}),
//           mode: 'no-cors',
//           headers:{
//             'Accept':'application/json',
//             'Content-Type': 'application/json',
//           },
//           credentials:'include'
          
//         })
        

    // const giveGoogleUser = async (accessToken) => {
    //     try{
    //       const giveUser = await axios.post('http://localhost:8080/auth/google/user',{
    //       method: 'post',
    //       mode: 'no-cors',
    //       headers:{
    //         'Accept':'application/json',
    //         'Content-type':'application/json'
    //       },
    //       // data: {
    //       //     accessToken : accessToken,
    //       //     userInfo : gUser
    //       // }
    //       body:JSON.stringify({"accessToken":accessToken, "userInfo":gUser})
  
    //       // body:{"accessToken" : accessToken,"userInfo" : gUser}
    //       //  null, "\t"를 하면..userInfo가 공란이 된다.
    //       //  null, "\t"를 하면..userInfo가 공란이 된다.
    //     } );   console.log(error);
       
    //     }
    //     catch(error){
    //         console.log('GoogleUserReq error: ', error);
    //         setReqError(error);
    //     }
    // } 
//     const giveGoogleUser = async (accessToken) => {
//       try{
//         const giveUser = await axios.post('https://cdd4-218-236-137-10.ngrok.io/auth/google/user',{
//         method: 'POST',
//         mode: 'no-cors',
//         headers:{
//           'Accept':'application/json',
//           'Content-type':'application/json'
//         },
//         // data: {
//         //     accessToken : accessToken,
//         //     userInfo : gUser
//         // }
//         body:JSON.stringify({"accessToken":accessToken, "userInfo":gUser})

//         // body:{"accessToken" : accessToken,"userInfo" : gUser}
//         //  null, "\t"를 하면..userInfo가 공란이 된다.
//         //  null, "\t"를 하면..userInfo가 공란이 된다.
//       } )
     
//       }
//       catch(error){
//           console.log('GoogleUserReq error: ', error.response.data);
//           setReqError(error.response.data);
//       }
//   }

const giveGoogleUser = async (accessToken) => {
    try {
        const giveUser = await axios.post('https://library-2022.herokuapp.com/auth/google/user', {
            "accessToken": accessToken,
            "userInfo": gUser
        })
    }
    catch (error) {
        console.log('GoogleUserReq error: ', error);
        setReqError(error);
    }
}
// onLoginGoogle=()=>{
//   GoogleSingnin
//   .signIn()
//   .then((data)=>{
    
//   })
// }
//const userInfo=JSON.stringify(gUser.given_name)
    return (
        <View style={styles.container}>
            {/* {
                reqError !== '' &&
                <View>
                    <Text>There was an error</Text>
                    <Text>{JSON.stringify(reqError, 'reqEr', 4)}</Text>
                </View>
            }

            {<Text style={{
                fontWeight: 'bold'
            }}>Signed user</Text> 
            }
            

            {
                gUser === null && 
                // <Text>No user</Text>
                <Text></Text>
            }

            {
                gUser !== null && 
                // <Text>{JSON.stringify(gUser, null, 4)}{console.log(gUser.given_name)}</Text>
                
                   <Text></Text>
            } */}
           
      
    
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