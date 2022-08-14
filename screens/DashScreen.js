import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";

const DashScreen = ({ navigation }) => {

  /* 
  useState 개수 줄이는 법. 사용할지 말지 고민하는 중
  https://velog.io/@unknown9732/useState-%EC%97%AC%EB%9F%AC%EA%B0%9C%EB%A5%BC-%EC%93%B0%EB%8A%94-%EA%B2%BD%EC%9A%B0
  */
  
  const [data,setData]=useState([]);
  const [facility,setFacility]=useState([]);
  const [bookLoan,setBookLoan]=useState([]);
  const [isLoding,setIsLoding]=useState(false);
  useEffect(()=>{
      setIsLoding(true);

/*
    postman code snippet으로 만든 코드
    이거 쉽게 사용할 수 있도록 연구해보는 것도 좋을 거 같음

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://library-2022.herokuapp.com//notice/detail?id=2", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
*/

      axios.get('https://3135cd4c-6f2c-47e4-9d07-cb34e2c8e785.mock.pstmn.io/notice/detail',{
          header:{
              id: '2',
          },
      })
      .then(function(response){
          console.log(response);
          setData(response.data);
          JSON.stringify(data)
      })
      .catch(console.error)
      .finally(()=>setIsLoding(false));

      //시설 예약 내역
      axios.get('https://3135cd4c-6f2c-47e4-9d07-cb34e2c8e785.mock.pstmn.io/facility/reserve/state',{
          header:{
            user_id: '1',
          },
      })
      .then(function(response){
          console.log(response);
          setFacility(response.facility);
          JSON.stringify(facility)
      })
      .catch(console.error)
      .finally(()=>setIsLoding(false));

      //자료 대출 내역
      axios.get('https://3135cd4c-6f2c-47e4-9d07-cb34e2c8e785.mock.pstmn.io/book/loan/state',{
    })
    .then(function(response){
        console.log(response);
        setBookLoan(response.bookLoan);
        JSON.stringify(bookLoan)
    })
    .catch(console.error)
    .finally(()=>setIsLoding(false));

  },[]);


  return (
    <SafeAreaView>

      <View>
          <Text>{"공지 1" + `${data.noticeDetail}`}</Text>
          <Text>{"공지 2" + `${data.noticeDetail}`}</Text>
      </View>

      <View>
        <Text>개관시간 오늘의 날짜  요일(요일)</Text>
      </View>

      <View>
        <Text>도서관 이름, 오픈 시간 </Text>
      </View>

      <View>
        { /* 일단은 home으로 이동하게 해둠. 추후 해당 페이지에 맞게 바꿔줘야 함. 그리고 버튼은 추후TouchableWithoutFeedback로 수정할 예정 */}
        <Button title="열람실 좌석배정" onPress={() => navigation.navigate("Home")} />
        <Button title="스터디룸 시설물 예약" onPress={() => navigation.navigate("Home")} />
        <Button title="자료 검색" onPress={() => navigation.navigate("Home")} />
        <Button title="자유게시판" onPress={() => navigation.navigate("Home")} />
      </View>

    
      {/*자료 대출 내역하고 시설 예약 내역은 같은 스타일이지만 둘이 다르기 때문에 View를 나눠서 만들어 줌*/}
      <View>
        <Text>시설 예약 내역</Text>
      </View>

      {/* 자료 대출 내역은 아직 백엔드에서 덜 만든 거 같음*/}
      <View>
        <Text>자료 대출 내역</Text>
      </View>
    </SafeAreaView>
  );
};

export default DashScreen;

const styles = StyleSheet.create({});



{/* */}