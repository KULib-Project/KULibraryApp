import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function ReadingRoom({ navigation }) {
  // dropdown 메뉴 라벨 목록
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // 도서관 선택
  const [items, setItems] = useState([
    { label: '도서관 선택 | 서울캠퍼스', value: 0 },
    { label: '도서관 선택 | 세종캠퍼스', value: 1 }
  ]);

  // API 쿼리 값 저장
  const [reading, setReading] = useState([]);

  // 임시로 mock 서버와 param 방식으로 연결
  // 서버에서 선택된 도서관의 열람실 정보를 불러옴
  const fetchReadingRoom = (value) => {
    return axios
      .get(
        `https://f9071a3a-7d0c-4ec1-adf2-c3cec616b3b9.mock.pstmn.io/readingroom?library_id=1`
      )
      .then((res) => {
        // Set Fetch Data
        console.log(res.data);
        setReading(res.data);
        return res.data;
      });
  };

  // 열람실 목록 출력
  const PrintReadingRoom = () => {
    // useQuery를 활용한 Data fetch
    const query = useQuery(['readingroom'], fetchReadingRoom);

    // Print Error
    if (query.isError) {
      console.log(query.error.message);
    }

    // Print Loading Screen
    if (query.isLoading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      // Complete loading
      // 일반적인 상황에서는 출력이 잘 되나, 다른 스크린으로 이동했다가 재진입하면 undefined 에러가 발생, why?
      return reading.readingRoom.map((room) => (
        <TouchableOpacity key={room.id} style={styles.group}>
          <View style={styles.roomBox}>
            <Text style={styles.roomRemain}>
              Total: {`${room.totalNum}`} / Available:
              {`${room.availableNum}`}
            </Text>
            <Text style={styles.roomName}>{`${room.readingRoom_name}`}</Text>
            <View style={styles.label}>
              <View style={styles.labelContainer}>
                <Text style={styles.roomState}>배정가능</Text>
              </View>
            </View>
            <Text style={styles.time}>00:00 ~ 24:00</Text>
          </View>
        </TouchableOpacity>
        //<TouchableOpacity key={room.id} style={styles.roomBox}>
        // <Text style={styles.roomTitle}>{`${room.readingRoom_name}`}</Text>
        //</TouchableOpacity>
      ));
    }
  };

  return (
    <View>
      <DropDownPicker
        style={styles.dropContainer}
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setItems={setItems}
        setValue={setValue}
        placeholder="도서관 선택 | "
        containerStyle={{ height: 40 }}
      />
      <ScrollView style={styles.roomContainer}>
        <QueryClientProvider client={queryClient}>
          <PrintReadingRoom />
        </QueryClientProvider>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20
  },
  roomContainer: {
    height: '80%',
    padding: 10,
    marginTop: 5
  },
  roomBox2: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 0.7,
    padding: 5,
    alignItems: 'stretch'
  },
  roomTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  group: {
    width: '100%',
    height: '30%'
  },
  roomBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  roomRemain: {
    margin: 1.19,
    width: 61,
    height: 7,
    color: 'rgba(0, 0, 0, 0.78)',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 0.59
  },
  roomName: {
    margin: 15,
    width: 30,
    height: 14,
    color: '#000000',
    fontSize: 15,
    lineHeight: 14
  },
  label: {
    margin: 36,
    width: 16,
    height: 5
  },
  labelContainer: {
    width: 16,
    height: 5,
    backgroundColor: '#00bfb4',
    borderRadius: 0.06
  },
  roomState: {
    margin: 0.13,
    width: 28,
    height: 7,
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 0.44,
    textAlign: 'center'
  },
  time: {
    margin: 19.5,
    width: 25,
    height: 8,
    color: '#000000',
    fontSize: 15,
    lineHeight: 0.44,
    textAlign: 'center'
  }
});
