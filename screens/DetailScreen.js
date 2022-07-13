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
import { SafeAreaView } from "react-native-safe-area-context";

//책 정보를 보여주는 상자
//정보 가져오기
const DetailScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  // 데이터를 저장하기 위한 변수 선언
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    setData(route.params);
    console.log(route.params);
    return () => setIsLoding(false); // cleanup function
  }, []);

  // 현재 data.itemData로 불러오면 경우에 따라 return문에서 읽지 못하는 경우가 발생
  // 일단 route.params로 처리해두긴 했음
  // may be.. 비동기 처리 문제로 예상 더 알아볼 필요 있음

  return (
    <SafeAreaView>
      <View>
        {/* 가장 큰 박스 */}
        <View style={styles.columnWrapper}>
          {/* 이미지랑 정보 수평 배열 bookBox */}
          <Image
            source={{ uri: route.params.itemData.thumbnail }}
            style={{ width: 150, height: 200 }}
          />
          <View style={styles.rowWrapper}>
            {/* 정보 수직 배열 infoBox */}
            <Text style={styles.cardInfo}>
              {"제목: " + `${route.params.itemData.title}`}
              {"\n" + "저자:  " + `${route.params.itemData.author}`}
            </Text>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          {/* 대출정보 상자 stateBox -> api호출 변경하고 세부 정보 가져오는 코드 재확인 작업 할 것 
                    가장 상층에 있는 정보들은 호출이 정상적으로 되는데 그 밑에 있는 정보들이 null로 표기됨 */}
          <Text>대출 정보</Text>
          <View style={styles.columnWrapper}>
            {/* 예약 정보 */}
            {console.log("123123" + route.params?.itemData.collectInfo)}
            {route.params?.itemData.collectInfo.map((info) => {
              console.log(info.state);

              let a = (
                <>
                  <Text>{`${info.callNumber}`}</Text>
                  <Text> {`${info.state}`}</Text>
                </>
              );

              return a;
            })}
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
