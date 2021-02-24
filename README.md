# fe-w3-shopping

## 미션요구사항

1. Express 설치, 로컬서버환경 구현
2. SASS를 활용하여 style 적용
3. 콘탠츠를 Server로 부터 비동기 통신을 통해 가져온다
4. 슬라이딩 구현
   - CSS: 이미지 슬라이드 애니메이션 transition/transform 속성으로 구현
   - JS: 슬라이딩 UI를 ES Classes로 개발(fetch API활용해서 요청, then method 사용, catch method 에러처리), 좌우버튼은 이벤트위임방식으로 이벤트를 처리.

---

## 구현할 기능목록

1. 메인베너 이미지 슬라이드 구현 (슬라이딩 UI)
   - 좌우버튼을 누르거나, 하단에 점선모양의 네비게이션 클릭 시, 좌/우 이동, 끝에 다다르면 다시 처음내용(캐로셀 UX)
   - 최소 2개의 컨탠츠가 자동으로 돌아야 한다
2. 지금뜨는 테마 카테고리 (슬라이딩 UI)
   - 총 10개의 콘텐츠가 노출되어야 하고, 화면에는 5개만 노출된다.
   - 좌/우 버튼 누르면 한개씩 애니매이션과 함께이동
   - 마우스로 2초 동안 누르고 있으면, item이 두개씩 이동한다.
   - 캐로셀 UX로 무한스크롤 방식으로 계속 보여진다
3. 더보기 버튼 이벤트
   - 버튼 누르면 4개의 아이템 한줄에 추가되어 보여진다.
