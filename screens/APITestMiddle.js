import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
import axios from 'axios';
import async from 'async';

const Middle = ({ navigation }) => {
  const reservedBookArr = axios
    .put(
      `https://library-2022.herokuapp.com/book/reserve/arrive`,
      { seq: 13 },
      {
        headers: {
          'Content type': 'application/json'
        }
      }
    )
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  /**확인 필요 */
  const reservedBookState = axios.get(
    `https://library-2022.herokuapp.com/book/reserve/state?user_id=1`
  );
  const seatAssign = axios
    .put(
      `https://library-2022.herokuapp.com/seat/assignment`,
      {
        useT: '03:00:00.000',
        seat_id: 1,
        user_id: 1
      },
      {
        headers: {
          'Content type': 'application/json'
        }
      }
    )
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  /**확인 필요 이 부분 API 문서가 다른거랑 통일이 안되어있어 사용에 있어 다소 헷갈림 */
  const readingRoom = axios
    .get(`https://library-2022.herokuapp.com/readingroom?library_id=1`)
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  /**확인 필요 */
  const seatState = axios
    .get(`https://library-2022.herokuapp.com/seat/state?user_id=1`)
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  const facilityReserve = axios
    .put(
      `https://library-2022.herokuapp.com/facility/reserve`,
      {
        id: 1,
        user_id: 1,
        startDateTime: '2022-07-25 09:00:00.248',
        endDateTime: '2022-07-25 12:00:00.248'
      },
      {
        headers: {
          'Content type': 'application/json'
        }
      }
    )
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  /** 이 부분 확인 필요 */
  const facilityReserveState = axios
    .get(`https://library-2022.herokuapp.com/facility/reserve/state?user_id=1`)
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  const authGoogleUser = axios
    .post('https://library-2022.herokuapp.com/auth/google/user', {
      accessToken:
        'ya229.A0ARrdaM8JeLWvpCkDqJdEea738f7KvwqY3baSjfbTv9IL6PIOG2iO9xAKfW-6XnNdbp-1oYTszl3rwV7pS-cGYMQzF5GGG6R161REOGkNUFqEyU9QrdnMErBFrEKcplENWi4XDTMLiVngGZ4FNf0OOOF0NATBAA',
      userInfo: {
        id: '113809974315920978561',
        email: 'qqww212222@korea.ac.kr',
        verified_email: true,
        name: '\u200d전채원[ 학부재학 / 컴퓨터융합소프트웨어학과 ]',
        given_name: '전채원[ 학부재학 / 컴퓨터융합소프트웨어학과 ]',
        family_name: '\u200d',
        picture:
          'https://lh3.googleusercontent.com/a/AATXAJw0j-cbHEeVhwEGA9ODuKDeP9k0hh3bBmcYqcco=s96-c',
        locale: 'ko',
        hd: 'korea.ac.kr'
      }
    })
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  const allUser = axios
    .get(`https://library-2022.herokuapp.com/user`)
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });
  const userSearch = axios
    .get(
      `https://library-2022.herokuapp.com/user/search?email="qqww212@korea.ac.kr"`
    )
    .then((res) => {
      console.log('==============================================');
      console.log(res.data);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      return res.status;
    });

  return (
    <View style={styles.container}>
      <Button
        style={styles.apiButton}
        title="예약 도서 도착"
        onPress={() => reservedBookArr()}
      />
      <Button
        style={styles.apiButton}
        title="예약 도서 상태"
        onPress={() => reservedBookState()}
      />
      <Button
        style={styles.apiButton}
        title="자리 할당"
        onPress={() => seatAssign()}
      />
      <Button
        style={styles.apiButton}
        title="열람실"
        onPress={() => readingRoom()}
      />
      <Button
        style={styles.apiButton}
        title="좌석 현황"
        onPress={() => seatState()}
      />
      <Button
        style={styles.apiButton}
        title="시설 예약"
        onPress={() => facilityReserve()}
      />
      <Button
        style={styles.apiButton}
        title="시설 예약 현황"
        onPress={() => facilityReserveState()}
      />
      <Button
        style={styles.apiButton}
        title="구글 로그인 정보"
        onPress={() => authGoogleUser()}
      />
      <Button
        style={styles.apiButton}
        title="전체 유저 조회"
        onPress={() => allUser()}
      />
      <Button
        style={styles.apiButton}
        title="특정 유저 조회"
        onPress={() => userSearch()}
      />
    </View>
  );
};
export default Middle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16
  },
  apiButton: {
    color: '#7a0909'
  }
});
