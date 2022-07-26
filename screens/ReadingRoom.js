import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ReadingRoom({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // dropdown 메뉴 라벨 목록
  const [items, setItems] = useState([
    { label: '도서관 선택 | 서울캠퍼스', value: 0 },
    { label: '도서관 선택 | 세종캠퍼스', value: 1 }
  ]);
  const [isLoding, setIsLoding] = useState(false);
  const [reading, setReading] = useState([]);

  // dropdown 메뉴에서 도서관을 선택하면 서버에서 해당 도서관의 열람실 목록을 get 해오는 코드
  useEffect(() => {
    setIsLoding(true);
    // 도서관이 선택되었을 때만 get
    if (value !== null) {
      let obj = {
        "library_id": value
      }

      console.log(JSON.stringify(obj))
      axios
        .get('https://library-2022.herokuapp.com/readingroom', JSON.stringify(obj), {
          headers: {
            "Content-Type": `application/json`

          },
        })
        .then(function (response) {
          console.log(response);
          setReading(response.data);
          console.log(reading);
        })
        .catch(console.error)
        .finally(() => setIsLoding(false));
    }
    return () => setIsLoding(false); // cleanup function
  }, [value]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setItems={setItems}
        setValue={setValue}
        placeholder="도서관 선택 | "
        //{...console.log(value)}
        containerStyle={{ height: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10
  }
});
