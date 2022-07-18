import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";

//import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//AsyncStroage는 추후 검색 기록 저장 기능 구현할 때 필요함

//테스트 데이터 나중에는 url-> db에서 가져와야 함
//import Information from '../../data/Info';
const SearchScreen = ({ navigation }) => {
  //데이터 가져오기
  const [data, setData] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
  }, []);

  //검색 단어 입력 넘겨 받는 변수
  const [keyword, keywordText] = useState("");
  // DropDownPicker를 위한 라벨 선언
  const [items, setItems] = useState([
    { label: "통합검색", value: 1 },
    { label: "학술지 검색", value: 2 },
    { label: "소장자료 검색", value: 3 },
    { label: "외부자료 검색", value: 4 },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const postUser = () => {

    const params = { "keyword": `${keyword}` };
    //const params = { "keyword": "스프링 부트` };
    console.log(params);
    axios
      .get("https://library-2022.herokuapp.com/book/search", {
        params
      })
      .then(function (response) {
        console.log(response);
        setData(response.data);
        //console.log(data);
      })
      .catch(function (error) {
        console.log("--------에러2");
        console.log(error);
      })
      .finally(() => setIsLoding(false));
  };

  //다중 데이터 리스트 출력
  const renderBoard = ({ item, onPress }) => {
    //보여지는 하나의 list
    return (
      //아이템 리스트
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { itemData: item });
        }}
      >
        <View style={styles.rowWrapper}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{ uri: "http://image.yes24.com/goods/83849117/XL" }}
              style={{ width: 100, height: 150 }}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{`${item.title}`}</Text>
            <Text style={styles.fontSize}>{`${item.author}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // 화면 출력 부분
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.searchList}
            onPress={() => Alert.alert("검색 리스트!")}
          >
            <Text style={styles.listText}>통합검색 ▾</Text>
          </TouchableOpacity>

          <KeyboardAvoidingView
            style={styles.keywordInput}
            behavior="padding"
            enabled
          >
            <TextInput
              placeholder={"제목을 입력하세요"}
              //텍스트 상자 안에 간단한 안내 사항 입력하는 부분
              style={styles.keywordSearch}
              autoComplete={"off"}
              autoCapitalize={"none"}
              onChangeText={(keyword) => keywordText(keyword)}
              value={keyword}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => postUser()}
          >
            <AntDesign name="search1" size={28} color="#900124" />
          </TouchableOpacity>
        </View>
        {isLoding ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={styles.searchBoxList}
            data={data}
            renderItem={renderBoard}
            numColumns={1}
            keyExtractor={(item) => item.id}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

//출력시 보여주는 스타일 설정 부분
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    right: 15,
    left: 10,
    backgroundColor: "#fff",
    padding: 4,
  },
  keywordInput: {
    left: 15,
    width: 230,
    backgroundColor: "#fff",
    padding: 5,
    margin: 0,
  },
  searchList: {
    left: 15,
    width: 120,
    backgroundColor: "#900124",
    padding: 5,
    margin: 0,
  },
  searchBoxList: {
    left: 50,
    width: 300,
  },
  listText: {
    color: "#fff",
    fontSize: 20,
    left: 15,
    alignContent: "center",
  },
  wrapper: {
    flexDirection: "row",
  },
  wrapperCol: {
    flexDirection: "column",
  },

  item: {
    backgroundColor: "#E6E5E6",
    padding: 20,
    borderColor: "#BFBFBF",
    borderWidth: 0.8,
  },
  mainPostView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  cardBottom1: {
    flex: 3,
    flexDirection: "row",
  },
  cardBottom2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  fontSize: {
    fontSize: 8,
    color: "#444",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    right: 15,
    left: 10,
    backgroundColor: "#fff",
    padding: 4,
  },
  contentSearch: {
    left: 15,
    width: 230,
    backgroundColor: "#fff",
    padding: 5,
    margin: 0,
  },
  searchList: {
    left: 15,
    width: 120,
    backgroundColor: "#900124",
    padding: 5,
    margin: 0,
  },
  searchBoxList: {
    left: 50,
    width: 300,
  },
  listText: {
    color: "#fff",
    fontSize: 20,
    left: 15,
    alignContent: "center",
  },
  wrapper: {
    flexDirection: "row",
  },
  wrapperCol: {
    flexDirection: "column",
  },

  item: {
    backgroundColor: "#E6E5E6",
    padding: 20,
    borderColor: "#BFBFBF",
    borderWidth: 0.8,
  },
  rowWrapper: {
    flexDirection: "row",
  },
});
