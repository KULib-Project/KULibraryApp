import React, { useEffect, useRef, useState } from "react";
import {
	Text,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	View,
	Image,
	Button,
	TextInput
} from "react-native";
import {
	ImageHeaderScrollView,
	TriggeringView,
} from "react-native-image-header-scroll-view";
import axios from "axios";
import async from "async";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	useQuery,
	QueryClient,
	QueryClientProvider,
	useQueryClient
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function PostDetail({ navigation, route }){
	// API 쿼리 값 저장
	const [comments, setComments] = useState([]);
	/** 댓글 입력 값 저장 */
	const [ccontent, setcontent] = useState(""); 
	const [isLoding, setIsLoding] = useState(false);

	const getDetail = () => {
    
		//const id=route.params.itemData.id;
		return axios.get("https://ea6717d8-601b-42a2-b0e6-1c5f0ea9f1a1.mock.pstmn.io/id=1")
			.then((response) => {
				setComments(response.data);
				console.log("==========================");
				console.log(comments.comment.CComent.CcomentsList.map((c)=>(c.content)));
				console.log("++++++++++++++++++++++++++");

      
			});};
	const PrintComment = () => {
	  // useQuery를 활용한 Data fetch
	  const query = useQuery(['allcomment'], getDetail);
  
	  // Print Error
	  if (query.isError) {
	    console.log(query.error.message);
	  }
  
	  // Print Loading Screen
	  if (query.isLoading) {
	    return (
	      <View>
	        <Text>Loading...</Text>
	      </View>
	    );
	  } else {
	    // Complete loading
	   
	    return comments.comment.CComent.content.map((com) => (
	        // com.commentsList.map((c)=>(
	        //   <View>
	        //     <Text>ㅇ</Text>
	        //   </View>
  
	        // ))
	        <View>
	          <Text>{`${com}`}</Text>
	        </View>
	    ));
	  }
	};

	return(
		<View>
			<QueryClientProvider client={queryClient}>
          <PrintComment />
        </QueryClientProvider>
			{getDetail()}
			<Text>전성기..^^</Text>
		</View>
	);
  
    
}
