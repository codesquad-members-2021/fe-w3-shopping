# 1일차 진행 상황

## 개발환경 구축

- express 설치
- dart sass 설치
  - 터미널에 `sass --watch sass:src/css` : sass 폴더의 파일 컴파일 -> src/css 폴더로 들어가도록 설정
  - `package.json > "scripts"에 "build:sass": "sass sass:src/css" 추가` : sass 폴더에서 변경사항이 생기면 src/css 폴더에 자동 반영되도록 설정.
  - `package.json`에 추가까지 했으면 간단히 `npm run build:sass` 명령어로 컴파일 할 수 있다.