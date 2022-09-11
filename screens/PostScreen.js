import React, {useState,useEffect,} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  placeholder
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Post = ({navigation}) => {
    const [isLoding, setIsLoding] = useState(false);
    const [id, setId] = useState(0);
    const [email, setEmail] = useState(0);
    //유저 id 변수
    const [title, setTitle] = useState('');
    //post 제목
    const [text, setText] = useState(''); 
    //post 내용
    const [date, setDate] = useState('');
    //post 날짜
    useEffect(() => {
        setIsLoding(true);
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setDate(
          date + '/' + month + '/' + year 
          + ' ' + hours + ':' + min + ':' + sec
        );
        return () => setIsLoding(false); // cleanup function
      }, []); 
      AsyncStorage.getItem('User', (error, result) => {
        const UserInfo = JSON.parse(result);
        setId(UserInfo.id);
        setEmail(UserInfo.email);
      });
      const postUser = () => {
        //글 post해서 db에 데이터 넘겨주는 파트
        //현재 문제점, 데이터를 입력해도 null만 뜬다. 게시글 등록 완료라고는 뜨지만 등록이 안됨.
        axios.post('https://library-2022.herokuapp.com/community/save', {
          "email" : `"${email}"`,
          "content" : text,
          "title" : title

          })
          .then(function (response) {
            console.log(email, title,text,id);
            console.log('게시글 등록 완료');
            navigation.replace('Home');

          })
          .catch(function (error) {
            console.log(error);
          });
      };

    return(
        <View style={styles.boxOne}>
            <View style={styles.action}>
                <TextInput placeholder={'제목을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={title => setTitle(title)}/>
            </View>
            <View style={[styles.action, {marginTop: 10}]}>
                <TextInput placeholder={'본문 내용을 입력하세요'} style={[styles.textInput, {height:180}]} autoComplete={'off'} autoCapitalize={'none'} multiline={true} onChangeText={text => setText(text)}/>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={[
                    styles.signIn,
                    { backgroundColor: '#FF8000',
                        }]}
                    onPress={() => postUser()}>
                    <Text style={[styles.textSign, {
                    color:'#fff' }]}>등록하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Post;

const styles = StyleSheet.create({
boxOne:{
    flex: 1,
    backgroundColor: '#fff',
},
rowWrapper:{
    flexDirection: 'row',
},
columnWrapper:{
    flexDirection: 'column',
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
});
