const postUser = () => {
    // 키워드 넘겨주기 위한 post 명령
    axios
      .post("https://webhook.site/4b254ab2-7a49-4d2b-9209-8619fb6e2ff7?", {
        title: keyword,
      })
      .then(function (response) {
        console.log("검색 정보 넘기기 완료");

        //데이터 리스트가 쭉 나오면 됨. post 명령어 쪽에 말고, get쪽에다가 넣어야 함

        //네비게이션을 검색한 정보 페이지로 넘어가도록 바꿔야한다.
        //navigation.replace('MainNavi');
        //검색 정보 포스트 가능
        //그러면 링크에서 get해오는 것도 가능하겠지.
      })
      .catch(function (error) {
        console.log(error);
      });
  };




