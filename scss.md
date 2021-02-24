1. 상위선택자참조 ampercend
   -& : 상위 참조, (자기 자신)

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

2. .a.b =>a이면서 b인 클래스
   클래스가 연이어 붙어있는 경우: 일치선택자

3. $변수선언
   .a{
   $w: 100px;
   .b{
   height: $w;
   }
   }

4. @at-root -변수 유효범위 밖에서 재 선언하고 싶은 경우 -최상위 루트로 올라가 정의되며 변수 범위 내에 선언되었기에 변수를 사용할 수 있다.
<div class="a">
<div class="b">
.a{
   $w: 100px;
}
.b{
   width: $w; 
}=> 변수적용안됨.

.a{
$w: 100px;
.b{
width: $w
}
}=> 변수적용되지만 b의 소속이 변경됨.

.a{
$w: 100px;
@at-root .b{
width: $w
}
}
