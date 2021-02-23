# 1일차 진행 상황

## 개발환경 구축

- express 설치
- dart sass 설치
  - 터미널에 `sass --watch sass:src/css` : sass 폴더의 파일 컴파일 -> src/css 폴더로 들어가도록 설정
  - `package.json > "scripts"에 "build:sass": "sass sass:src/css" 추가` : sass 폴더에서 변경사항이 생기면 src/css 폴더에 자동 반영되도록 설정.
  - `package.json`에 추가까지 했으면 간단히 `npm run build:sass` 명령어로 컴파일 할 수 있다.

<br>

# 2일차 진행 상황

## 폴더 구조 변경

- css 파일을 적용시키기 위해 static 경로를 설정하는데 계속 작동을 안 해서 동료들의 도움을 받아 폴더 구조를 변경했다.
- public 폴더를 만들어 프론트 코드를 다 넣고, app.js(서버 코드)는 밖으로 뺐다.

## html 코드 조금 작성

- 전체적인 section만 나누고, 캐로셀이 들어 있는 배너 부분 위주로 스켈레톤 코드를 짰다.

