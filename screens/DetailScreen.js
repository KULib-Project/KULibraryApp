import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
//import axios from 'axios';
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";

//책 정보를 보여주는 상자
//정보 가져오기
const DetailScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  // 데이터를 저장하기 위한 변수 선언
  const [isLoding, setIsLoding] = useState(false);
  // api 호출 확인을 위한 변수 선언 부울 값으로 에러가 발생하는지 아니면 정상 호출 되었는지 확인
  // useEffect(()=>{
  //     setIsLoding(true);
  //     axios.get
  // api 호출을 통해 json 정보를 받아온다.
  // mock up site => https://526ec27a-63be-4d0b-b978-b23e62c4a5cb.mock.pstmn.io/bookA
  /*
    useEffect(()=>{
        setIsLoding(true);
        axios.get('https://526ec27a-63be-4d0b-b978-b23e62c4a5cb.mock.pstmn.io/bookA',{
            header:{
                token: '1234',
            },
        })
        .then(function(response){
            console.log(response);
            setData(response.data);
            //console.log(data); //undefined
            //console.log(data.collectInfo[1]);
        })
        .catch(console.error)
        .finally(()=>setIsLoding(false));
    },[]);
    */
  useEffect(() => {
    setIsLoding(true);
    setData(route.params);
    console.log(route.params);
    return () => setIsLoding(false); // cleanup function
  }, []);
  return (
    <SafeAreaView>
      <View>
        {/* 가장 큰 박스 */}
        <View style={styles.columnWrapper}>
          {/* 이미지랑 정보 수평 배열 bookBox */}
          <Image
            source={{ uri: data.thumbnail }}
            style={{ width: 150, height: 200 }}
          />
          <View style={styles.rowWrapper}>
            {/* 정보 수직 배열 infoBox */}
            <Text style={styles.cardInfo}>
              {"제목:" + `${data.title}`}
              {"\n" + "저자: " + `${data.author}`}
            </Text>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          {/* 대출정보 상자 stateBox -> api호출 변경하고 세부 정보 가져오는 코드 재확인 작업 할 것 
                    가장 상층에 있는 정보들은 호출이 정상적으로 되는데 그 밑에 있는 정보들이 null로 표기됨 */}
          <Text>대출 정보</Text>
          <View style={styles.columnWrapper}>
            {/* 예약 정보 */}
            <Text
              style={styles.cardInfo}
            >{`${data?.collectInfo?.["callNumber"]}`}</Text>
            <Text
              style={[{ color: "blue" }, styles.cardInfo]}
            >{`${data?.collectInfo?.["state"]}`}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DetailScreen;
const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: "row",
  },
  columnWrapper: {
    flexDirection: "column",
  },
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  searchBoxList: {
    left: 50,
    width: 300,
  },
});
