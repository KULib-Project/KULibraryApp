//****************
// 리팩토링 필요함
//****************
import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState([]);
  const [libs, setLibs] = useState([]);
  const [facility, setFacility] = useState([]);
  const [bookLoan, setBookLoan] = useState([]);

  var user_id; //다른 곳에서 받아와야 함!
  var notice_titles;
  var lib_names;
  var facil_lists;
  var data_lists;

  useEffect(() => {
    setIsLoading(true);

    //공지사항 제목 불러오기
    var id_num = 30; //등록돼있는 공지글의 개수
    // 추후 유동적으로 변할 수 있도록 수정해줘야 함
    for (var i = 0; i < id_num; i++) {
      axios
        .get(`https://library-2022.herokuapp.com/notice/detail?id=${i}`)
        .then(function (response) {
          if (response.data.noticeDetail.title === undefined) {
          } else {
            //setNotice(response.notice);
            notice_titles.append(response.data.noticeDetail.title);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }

    //도서관 리스트 조회
    axios
      .get("https://library-2022.herokuapp.com/book/category")
      .then(function (response) {
        setLibs(response.data);
        //도서관 이름들 추출해서 배열로 만들기
        lib_names = JSON.parse(JSON.stringify(response.data)).categoryList;
        console.log(lib_names);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));

    //시설 예약 내역 (시설 예약 조회)
    axios
      .get(
        `https://library-2022.herokuapp.com/facility/reserve/state?user_id=${user_id}`
      )
      .then(function (response) {
        setFacility(response.facility);
        facil_lists = JSON.parse(JSON.stringify(response.data));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));

    //자료 대출 내역 (대출현황 조회)
    axios
      .get(
        `https://library-2022.herokuapp.com/book/loan/state?user_id=${user_id}`
      )
      .then(function (response) {
        setBookLoan(response.bookLoan);
        data_lists = JSON.parse(JSON.stringify(response.data));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  //오늘 날짜 구하기
  const today = new Date();
  var year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  function getDay() {
    var week = new Array(
      "SUN (일)",
      "MON (월)",
      "TUE (화)",
      "WED (수)",
      "THU (목)",
      "FRI (금)",
      "SAT (토)"
    );
    var today = new Date().getDay();
    var todayLabel = week[today];
    return todayLabel;
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{"공지 1 "}</Text>
        {/* if(notice_titles[0]){<Text>{notice_title[0]}</Text>} */}
        <Text>{"공지 2 "}</Text>
        {/* if(notice_titles[1]){<Text>{notice_title[1]}</Text>} */}
      </View>

      <View>
        <Text> </Text>
      </View>

      <View>
        <View>
          <Text>
            {"개관시간 " +
              `${year}` +
              " /" +
              `${month}` +
              " /" +
              `${day}` +
              " " +
              `${getDay()}`}
          </Text>
        </View>
        <View>
          {/* <Text>{`${lib_names[1]}`}</Text>
          <Text>09:00 - 19:00</Text>
          <Text>{`${lib_names[2]}`}</Text>
          <Text>09:00 - 19:00</Text> */}
          {/* <Text>{`${lib_names.categoryList[3]}`}</Text>
          <Text>09:00 - 19:00</Text>
          <Text>{`${lib_names.categoryList[4]}`}</Text>
          <Text>09:00 - 19:00</Text>
          <Text>{`${lib_names.categoryList[5]}`}</Text>
          <Text>09:00 - 19:00</Text>
          <Text>{`${lib_names.categoryList[6]}`}</Text>
          <Text>09:00 - 19:00</Text> */}
        </View>
      </View>

      <View>
        {/* 나중에 페이지 연결해줘야 함 */}
        <Text>열람시 좌석배정 </Text>
        <Text>스터디룸 시설물예약</Text>
        <Text>자료검색</Text>
        <Text>자유게시판</Text>
      </View>
      <View>
        <View>
          <Text>시설 예약 내역</Text>
          {/* <Text>시설 예약 정보가 없습니다</Text> */}
          {/* <Text>{`${facil_lists}`}</Text> */}
        </View>
        <View>
          <Text>자료 대출 예내역</Text>
          {/* <Text>자료 대출 정보가 없습니다</Text> */}
          {/* <Text>{`${data_lists}`}</Text> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashScreen;

const styles = StyleSheet.create({});
// 추후 추가 예정
