# fe-w3-shopping

# README

## 의도
- 백엔드 npm 모듈과 프론트엔드 npm 모듈을 동시에 관리하여 package.json 스크립트의 분리를 막고자 시도하였습니다.  
- es6의 모듈방식을 최대한 지키기 위해 commonJS의 require()를 없애고자 노력하였습니다.  
- render()함수의 ```/* html */```은 vscode의 es6-string-html 익스텐션을 활용해 syntax highlighting을 하기 위함입니다.

## To-do
- 실행을 위해 package 설치가 필요하므로 ```npm install```을 통해 필요한 패키지 셋업을 진행해 주세요.  
- 백엔드앱과 프론트엔드앱의 동시 실행을 위해 ```concurrently```가 설치됩니다.  
- 백엔드의 경우 다음의 패키지가 설치됩니다.  
  - ```express.js```: 백엔드 구현을 위해
  - ```cors``` : 혹시 모르는 POST 액션을 위해

- 프론트엔드의 경우, 다음의 패키지가 설치됩니다.  
  - ```sass```: 구현 목적
  - ```webpack, webpack-cli```: 우아한 트랜스파일링 및 번들링을 위해
  - ```webpack-dev-server```: 개발시 번들링의 귀찮음을 아껴줘요~
  - loader류
    - ```css-loader, style-loader, sass-loader```
  - plugin류
    - ```html-webpack-plugin, clean-webpack-plugin```