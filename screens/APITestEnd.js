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
      .get("https://library-2022.herokuapp.com/book/category?")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  // ================= 공지

  const noticeDetail = () => {
    axios
      .get("https://library-2022.herokuapp.com/notice/detail?id=18")
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

  const noticeSaveData = {
    email: '"qqww212@korea.ac.kr"',
    content: "테스트용 글입니다",
    title: "테스트용 글입니다",
  };
  const noticeSave = () => {
    axios
      .post("https://library-2022.herokuapp.com/notice/save", noticeSaveData)
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const noticeUpdateData = {
    email: '"qqww212@korea.ac.kr"',
    id: 24,
    title: "제목 수정",
    content: "내용 수정",
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

  const noticeDeleteData = {
    id: 22,
    email: '"qqww212@korea.ac.kr"',
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

  // ========================게시글

  const communitySaveData = {
    email: "mj@korea.ac.kr",
    content: "나 많은 일이 있었어 ",
    title: "개강 주겨줘",
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
    게시물 작성자가 아니라서 이메일을 잘 못 받은 거 같음
  */
  const communityDeleteData = {
    email: "zidh1@korea.ac.kr",
    id: 3,
  };


  const communityDelete = () => {
    axios
      .put(
        "http://library-2022.herokuapp.com/community/delete",
        {
          email: "zidh1@korea.ac.kr",
          id: 3,
        }
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

  const communityUpdateData = {
    "title": "수정 테스트1",
    "content": "내용 변화 테스트1",
    "email": "zidh1@korea.ac.kr",
    "id": 4,
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

  // =================== 댓글

  const commentsSave = async () => {
    const giveComment = await axios
      .post("https://library-2022.herokuapp.com/comments/save", {
        content: "대댓글 테스트1",
        email: "zidh1@korea.ac.kr",
        board_id: 1,
        cmt_id: 1,
      })
      .then((response) => {
        console.log(response.data);
        console.log("댓글 작성");
      })
      .catch(console.error);
  };

  const commentsDeleteData = {
    "email": "zidh1@korea.ac.kr",
    "id": 1,
    "cit_id" : 1
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

  const commentsUpdateData = {
    "content": "댓글 수정 테스트3",
    "email": "zidh1@korea.ac.kr",
    "cit_id": 1,
    "cmt_id": 1,
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

  const communityDetail = () => {
    axios
      .get("https://library-2022.herokuapp.com/community/detail?id=4")
      .then((res) => {
        console.log("==============================================");
        console.log(res.data);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++");
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  //일단 삭제됨
  const infoList = () => {
    axios
      .get("https://library-2022.herokuapp.com/infolist")
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
        title="공지 생성"
        onPress={() => noticeSave()}
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
