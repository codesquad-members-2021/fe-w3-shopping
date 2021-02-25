function runAsync(time) {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve('서버에서 온 사람입니다');
      }, time);
   });
}


function runAsync2(time) {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve('3명입니다');
      }, time);
   });
}

const cb1 = result => {
   console.log('누구세요? :', result);
   return runAsync2(3000);
};

const cb2 = result2 => {
   console.log('몇명이에요? :', result2);
}

function main() {
   const asyncObj = runAsync(1000);
   asyncObj.then(cb1).then(cb2);
   console.log('함수는 종료');
}

main();