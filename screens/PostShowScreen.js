import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import axios from 'axios';
import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";


const PostList =({navigation})=>{

    const [data,setData]=useState([]);
    const [isLoding,setIsLoding]=useState(false);

    useEffect(()=>{
        setIsLoding(true);
        axios.get('https://library-2022.herokuapp.com/community')
        .then(function(response){
            console.log(response);
            setData(response.data);
            console.log(data);
        })
        .catch(console.error)
        .finally(()=>setIsLoding(false));
    },[]);

    const renderBoard = ({ item, onPress }) => {
        //보여지는 하나의 list
        return (
          //아이템 리스트
          <TouchableOpacity
            ///onPress={() => navigation.replace("Detail", { itemData: item })}
            onPress={() => {
              navigation.navigate("PostDetail", { itemData: item});
            }}
          >
            <View style={styles.rowWrapper}>
              <View style={styles.cardImgWrapper}>
              <Text style={styles.cardTitle}>{`${item.given_name}`}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{`${item.title}`}</Text>
                <Text style={styles.fontSize}>{`${item.content}`}</Text>
                <Text style={styles.fontSize}>{`조회수 ${item.view_count}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <SafeAreaView>
         <Text>될까요?</Text>
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
    );
}
export default PostList;
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
  
