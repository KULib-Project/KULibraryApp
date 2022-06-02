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

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const Post = ({navigation}) => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '중앙도서관', value: 1},
    {label: '의학도서관', value: 2},
    {label: '과학도서관', value: 3},
    {label: '세종학술정보원', value: 4},
    //도서관으로 변경
  ]);

    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        date + '/' + month + '/' + year 
        + ' ' + hours + ':' + min + ':' + sec
      );
    }, []);
  

  AsyncStorage.getItem('User', (error, result) => {
    console.log(result);
    const UserInfo = JSON.parse(result);
    setId(UserInfo);
  });

  const postUser = () => {
    axios.post('https://f7479681-8640-4929-b771-f41103825403.mock.pstmn.io/post', {
        author: id,
        title: title,
        text: text,
        date: currentDate,
        //category: value,
      })
      .then(function (response) {
        console.log('게시글 등록 완료');
        navigation.replace('Home');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.footer}>
        <View style={styles.action}>
          <TextInput placeholder={'제목을 입력하세요'} style={styles.textInput} autoComplete={'off'} autoCapitalize={'none'} onChangeText={text => setTitle(text)}/>
        </View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          disableBorderRadius={true}
          placeholder="카테고리를 선택해주세요"
          style={styles.border}
          textStyle={styles.textInput}
        />
        <View style={styles.action}>
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
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  border: {
    marginTop: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 5,
    fontSize: 18,
    height: 30,
    marginLeft: 12,
  },
});
