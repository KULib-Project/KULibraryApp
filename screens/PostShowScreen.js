import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import axios from 'axios';
import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
const PostList =({navigation})=>{

    const [data,setData]=useState([]);
    const [isLoding,setIsLoding]=useState(false);

    useEffect(()=>{
        setIsLoding(true);
        axios.get('https://library-2022.herokuapp.com/notice')
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
            ///onPress={() => navigation.navigate("Detail", { itemData: item })}
            onPress={() => {
              console.log(item);
              navigation.navigate("Detail", { itemData: item });
            }}
          >
            <View style={styles.rowWrapper}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{`${item.title}`}</Text>
                <Text style={styles.contentFont}>{`${item.content}`}</Text>
                <View style={styles.rowWrapper}>
                <Text style={styles.fontSize}>{`작성자 ${item.given_name}`}</Text>
                <Text style={styles.fontSize}>{`조회수 ${item.view_count}`}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

    return (
        <SafeAreaView>
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
    searchBoxList: {
      width: chartWidth,
    },
    cardInfo: {
      flex: 1,
      padding: 10,
      borderColor: "#ccc",
      borderBottomWidth: 1,
      backgroundColor: "#fff",
    },
    cardTitle: {
      fontWeight: "bold",
    },
    contentFont: {
        fontSize: 12,
        color: "black",
      },
    fontSize: {
      fontSize: 8,
      color: "#444",
    },
    rowWrapper: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    colWrapper:{
        flexDirection: "column",
    }
  });
  