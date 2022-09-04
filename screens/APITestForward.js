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
  const searchBooks = () => {
    axios
      .get('https://library-2022.herokuapp.com/book/search?keyword="스프링"')
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const bookData = {
    title:
      '스프링 부트와 AWS로 혼자 구현하는 웹 서비스: 인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지',
    thumbnail: 'http://image.yes24.com/goods/83849117/XL',
    type: '단행본',
    author: '이동욱',
    sign: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스: 인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지/이동욱 지음',
    publish: '부천: 프리렉, 2019',
    shape: '419P.: 천연색삽화;23cm'
  };

  const saveBooks = () => {
    axios
      .post('https://library-2022.herokuapp.com/books/save', bookData)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const bookInform = () => {
    axios
      .get('https://library-2022.herokuapp.com/book/detail', {
        params: {
          title:
            '스프링 부트와 AWS로 혼자 구현하는 웹 서비스: 인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지2'
        }
      })
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const collectData = {
    book: 24,
    collectLocation: 1,
    callNumber: '003.3.2022z3',
    enrollNum: '11111113',
    state: 1,
    returnDate: null,
    reserveState: null,
    loanDate: null,
    extensionCount: null,
    user: null
  };

  const collectInform = () => {
    axios
      .post('https://library-2022.herokuapp.com/collectinfo/save', collectData)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const loanInform = { seq: 2, user_id: 1 };
  const loanBook = () => {
    axios
      .put('https://library-2022.herokuapp.com/book/loan', loanInform)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const returnBook = () => {
    axios
      .put('https://library-2022.herokuapp.com/book/loan', loanInform)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  const loanState = () => {
    axios
      .get('https://library-2022.herokuapp.com/book/loan/status?user_id=1')
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  // seq : 1 => 지금 서버에 해당하는 user_id가 null로 설정되어 있어서 500 에러가 발생, seq 값을 2로 변경하면 일단 에러x
  // 이 부분은 추후 백엔드에서 확인 예정
  const reserveInform = { "seq": 2, "user_id": 1 };
  const reserve = () => {
    axios
      .put('https://library-2022.herokuapp.com/book/reserve', reserveInform)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  // 백엔드 측에서 메일 주소를 받을 때 메일주소 문구 양측에 큰 따옴표가 포함된 채로 전달이 되어야 500 error가 발생하지 않음 //
  const noticeData = {
    "email": "\"qqww212@korea.ac.kr\"",
    "content": '안녕하321요312321',
    "title": '테스트 게시물321312313'
  };

  const saveNotice = () => {
    axios
      .post('https://library-2022.herokuapp.com/notice/save', noticeData)
      .then((res) => {
        console.log('==============================================');
        console.log(res.data);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++');
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.apiButton}
        title="도서 검색"
        onPress={() => searchBooks()}
      />
      <Button
        style={styles.apiButton}
        title="책정보 저장"
        onPress={() => saveBooks()}
      />
      <Button
        style={styles.apiButton}
        title="책정보 조회"
        onPress={() => bookInform()}
      />
      <Button
        style={styles.apiButton}
        title="소장정보 저장"
        onPress={() => collectInform()}
      />
      <Button
        style={styles.apiButton}
        title="도서 대출"
        onPress={() => loanBook()}
      />
      <Button
        style={styles.apiButton}
        title="도서 반납"
        onPress={() => returnBook()}
      />
      <Button
        style={styles.apiButton}
        title="도서 대출 현황 조회"
        onPress={() => loanState()}
      />
      <Button
        style={styles.apiButton}
        title="도서 예약"
        onPress={() => reserve()}
      />
      <Button
        style={styles.apiButton}
        title="공지 글 등록"
        onPress={() => saveNotice()}
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
