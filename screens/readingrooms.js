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
  // TODO: 드롭다운 메뉴에서 선택한 도서관 번호로 쿼리를 전송할 수 있도록 변수화
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
      // TODO : 일반적인 상황에서는 출력이 잘 되나, 다른 스크린으로 이동했다가 재진입하면 undefined 에러가 발생하는 부분 원인 파악 필요
      return reading.readingRoom.map((room) => (
        <TouchableOpacity key={room.id} style={styles.group}>
          <View style={styles.roomBox}>
            <View style={styles.titleContainer}>
              <Text style={styles.roomName}>{`${room.readingRoom_name}`}</Text>

              <Text style={styles.time}>00:00 ~ 24:00</Text>
            </View>

           <View style={styles.stateContainer}>
              <Text style={styles.roomRemain}>
                Total: {`${room.totalNum}`} / Available: {`${room.availableNum}`}
              </Text>
              <View style={styles.label}>
                  <Text style={styles.roomState}>배정가능</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
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
    padding: 10
  },
  roomContainer: {
    height: '80%',
    padding: 10,
    marginTop: 5
  },
  group: {
    width: '100%',
    height: '40%',
    margin : 3
  },
  roomBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomName: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 5,
  },
  stateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    width: 45,
    height: 23,
    backgroundColor: '#36BC9B',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  roomState: {
    color: 'white'
  },
  time: {
    margin: 5,
    justifyContent: 'flex-end'
  },
  roomRemain: {
    margin: 5
  },
  
});