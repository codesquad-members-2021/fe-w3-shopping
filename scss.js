//?1. 상위선택자참조 ampercend
/*   -& : 상위 참조, (자기 자신)

   ex1) 부모선택자가 hover 된 경우
   .a{
   &.hover{
   color: red;
   }}

   ex2)
   .font-size{
   font-size:20px;

   &-small{
   font-size:14px;
   }
   }
*/
//?2 .a.b =>a이면서 b인 클래스
/*클래스가 연이어 붙어있는 경우: 일치선택자

//?3. $변수선언
   .a {
      $w: 100 px;
      .b {
         height: $w;
      }
   }


   $color-primary: #2342345
   $url-images: "/img/"
   .a{
      background: $color-primary url($url-images + "bg.jpg");
   }
*/
//?4. @at - root
//? 변수 유효범위 밖에서 재 선언하고 싶은 경우
//?- 최상위 루트로 올라가 정의되며 변수 범위 내에 선언되었기에 변수를 사용할 수 있다. <
/*<div class = "a" >
   <div class = "b" >
   .a {
      $w: 100 px;
   }
   .b {
      width: $w;
   } 
   => 변수적용안됨.

   .a {
      $w: 100 px;
      .b {
         width: $w
      }
   } 
   => 변수적용되지만 b의 소속이 변경됨.

   .a {
      $w: 100 px;
      @at - root.b {
         width: $w
      }
   }
   =>변수적용, b루트단 소속 오키!
  
//?5. 속성별 정의
/*
  .box {
      margin: {
         top: 10 px;
         left: 10 px;
      };
      font: {
         weight: 400;
         size: 20 px;
      }
   }
//?6.변수재할당
/*$red:#12345
color-primary: red;

//?플래그 !global 
.a{
   $color: #111 !global;
}
.b{
   color: $color;
}
=>a범위 밖에서도 사용가능, 전역사용가능.
.c{
   $color: #222;
}
=>최종적으로는 변수color의 색은 #222이다.


//?default 플래그
:할당되지 않은 변수의 초깃값 설정.
:만약 기존에 할당된 값이 있었다면,
지금 지정하는 값이 아닌 기존의 default값을 사용할 것이다.
부트스트랩과 같은 라이브러리를 사용하는 경우 유용하게 쓸 수 있다.
$white : #fff !default;


//? #{}문자 보간
$family: unquote("Droid+Sans"); ->unquote: 따옴표를 없애버리는.
@import url(" #{$family}");