import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//책 정보를 보여주는 상자
//정보 가져오기
const DetailScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  // 데이터를 저장하기 위한 변수 선언
  const [isLoding, setIsLoding] = useState(false);

  let count = 0;
  // 추후 소장 정보의 숫자를 나타낼 변수

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
        <View style={styles.imageWrapper}>
          {/* 이미지랑 정보 수평 배열 bookBox */}
          <Image
            style={styles.imageStyle}
            source={{ uri: route.params.itemData.thumbnail }}
          />
          <View style={styles.detailWrapper}>
            {/* 정보 수직 배열 infoBox */}
            <Text style={styles.inform}>
              {"제목: " + `${route.params.itemData.title}`}
              {"\n\n" + "저자:  " + `${route.params.itemData.author}`}
            </Text>
          </View>
        </View>
        <View style={styles.informWrapper}>
          {/* 대출정보 상자 stateBox -> api호출 변경하고 세부 정보 가져오는 코드 재확인 작업 할 것 
              가장 상층에 있는 정보들은 호출이 정상적으로 되는데 그 밑에 있는 정보들이 null로 표기됨 */}
          <Text style={styles.cardTitle}>{"소장 정보"}</Text>
          <View style={styles.columnWrapper}>
            {/* 예약 정보 */}
            {route.params?.itemData.collectInfo.map((info) => {
              console.log(info.state);
              count++;
              let a = (
                // Map을 통해 생성되는 각 객체에 key를 부여해야 오류가 발생하지 않음
                // https://itprogramming119.tistory.com/entry/React-Warning-Each-child-in-a-list-should-have-a-unique-key-prop-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
                <View key={info.callNumber} style={styles.ownerInform}>
                  <Text style={styles.noTitle}>{"No. " + `${count}`}</Text>
                  <Text>{"청구기호:  " + `${info.callNumber}`}</Text>
                  <Text>{"도서상태: " + `${info.state}`}</Text>
                </View>
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
  backgroundWrapper: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#fff",
  },
  imageWrapper: {
    width: "100%",
    height: "60%",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: "45%",
    height: "95%",
  },
  detailWrapper: {
    width: "60%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inform: {
    alignItems: "flex-end",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  informWrapper: {
    flexDirection: "column",
  },
  columnWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  ownerInform: {
    borderColor: "#eee",
    borderBottomWidth: 0.5,
    paddingTop: 2,
    paddingBottom: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  noTitle: {
    fontWeight: "bold",
  },
});
