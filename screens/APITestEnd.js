import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Button } from "react-native";
import axios from "axios";

const End = ({ navigation }) => {
  /*
    도서관 리스트 조회: 
    "1": "백주년기념 학술정보관",
    로 출력됨. output하고 다른 거 같음
  */
  const bookCategory = () => {
    axios
      .get("https://library-2022.herokuapp.com/book/category?2")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const noticeDetail = () => {
    axios
      .get("https://library-2022.herokuapp.com/notice/detail?id=2")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const notice = () => {
    axios
      .get("https://library-2022.herokuapp.com/notice")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러
  */
  const noticeUpdateData = {
    email: "qqww212222@korea.ac.kr",
    id: 2,
    title: "수정 테스트113",
    content: "내용 수정 테스트131",
  };
  const noticeUpdate = () => {
    axios
      .put("https://library-2022.herokuapp.com/notice/update", noticeUpdateData)
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러
  */
  const noticeDeleteData = {
    id: 1,
    email: "qqww212222@korea.ac.kr",
  };
  const noticeDelete = () => {
    axios
      .put("https://library-2022.herokuapp.com/notice/delete", noticeDeleteData)
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    글 생성 번호가 return되는 거 같음
  */
  const communitySaveData = {
    email: "11@korea.ac.kr",
    content: "안녕하세3214124142141요312321",
    title: "테스트 게시물 4132141444443",
  };
  const communitySave = () => {
    axios
      .post(
        "https://library-2022.herokuapp.com/community/save",
        communitySaveData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러. 작성자가 아닌데 호출해서 에러 생긴 거 같음
  */
  const communityDeleteData = {
    email: "11@korea.ac.kr",
    id: 1,
  };
  const communityDelete = () => {
    axios
      .put(
        "https://library-2022.herokuapp.com/community/delete",
        communityDeleteData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러. 작성자가 아닌데 호출해서 에러 생긴 거 같음
  */
  const communityUpdateData = {
    title: "수정 테스트1",
    content: "내용 변화 테스트1",
    email: "1111@korea.ac.kr",
    id: 1,
  };
  const communityUpdate = () => {
    axios
      .put(
        "https://library-2022.herokuapp.com/community/update",
        communityUpdateData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러
    대댓글도 테스트해야함
    seq 반환?
  */
  const commentsSaveData = {
    content: "댓글 테스트1",
    email: "11@korea.ac.kr",
    id: 2,
  };
  const commentsSave = () => {
    axios
      .post(
        "https://library-2022.herokuapp.com/comments/save",
        commentsSaveData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러
  */
  const commentsDeleteData = {
    email: "11@korea.ac.kr",
    id: 2,
  };
  const commentsDelete = () => {
    axios
      .put(
        "https://library-2022.herokuapp.com/comments/delete",
        commentsDeleteData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
    500에러
  */
  const commentsUpdateData = {
    content: "댓글 수정 테스트3",
    email: "11@korea.ac.kr",
    cit_id: 2,
    cmt_id: 1,
  };
  const commentsUpdate = () => {
    axios
      .put(
        "https://library-2022.herokuapp.com/comments/update",
        commentsUpdateData
      )
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  //404에러
  const infoList = () => {
    axios
      .get("https://library-2022.herokuapp.com/InfoList")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  //404에러
  const communityDetail = () => {
    axios
      .get("https://library-2022.herokuapp.com/communityDetail?key=id")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.apiButton}
        title="도서관 리스트 조회"
        onPress={() => bookCategory()}
      />
      <Button
        style={styles.apiButton}
        title="공지 글 조회"
        onPress={() => noticeDetail()}
      />

      <Button
        style={styles.apiButton}
        title="공지 글 전체 조회"
        onPress={() => notice()}
      />

      <Button
        style={styles.apiButton}
        title="공지 수정"
        onPress={() => noticeUpdate()}
      />

      <Button
        style={styles.apiButton}
        title="공지 삭제"
        onPress={() => noticeDelete()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 글 생성"
        onPress={() => communitySave()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 글 삭제"
        onPress={() => communityDelete()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 글 수정"
        onPress={() => communityUpdate()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 댓글 생성"
        onPress={() => commentsSave()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 댓글 삭제"
        onPress={() => commentsDelete()}
      />

      <Button
        style={styles.apiButton}
        title="게시판 댓글 수정"
        onPress={() => commentsUpdate()}
      />

      <Button
        style={styles.apiButton}
        title="시설물 관련"
        onPress={() => infoList()}
      />
      <Button
        style={styles.apiButton}
        title="게시판 글 조회"
        onPress={() => communityDetail()}
      />
    </View>
  );
};
export default End;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  apiButton: {
    color: "#7a0909",
  },
});
