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
    const [id, setId] = useState(0);
    //유저 id 변수
    const [title, setTitle] = useState('');
    //post 제목
    const [text, setText] = useState(''); 
    //post 내용
    const [date, setDate] = useState('');
    //post 날짜
    useEffect(() => {
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
      }, []); //메모리 누수 잡기
      //휴대폰 저장소 동기화 아이템 가져오기
      AsyncStorage.getItem('User', (error, result) => {
        //로컬에서 유저 데이터 불러오는 부분 현재 작동 안함 수정 필요
        // console.log(result);
        const UserInfo = JSON.parse(result);
        setId(UserInfo);
      });
      const postUser = () => {
        //글 post해서 db에 데이터 넘겨주는 파트
        //현재 문제점, 데이터를 입력해도 null만 뜬다. 게시글 등록 완료라고는 뜨지만 등록이 안됨.
        axios.post('https://library-2022.herokuapp.com//notice/save', {
            author: id,
            title: title,
            text: text,
            date: date,
            //category: value,
          })
          .then(function (response) {
            console.log(id, title,text,date);
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
                <TextInput placeholder={'제목을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setTitle(text)}/>
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
