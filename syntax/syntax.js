var name = 'k8805';
// String literals
var letter = 'Dear '+name+'\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '+name+' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa egoing qui officia deserunt mollit anim id est laborum. '+name;
 
// Template literals
var letter = `Dear ${name}
 
Lorem ipsum dolor sit amet, 
consectetur adipisicing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
 ${name} Ut enim ad minim veniam, 
 quis nostrud exercitation ullamco 
 laboris nisi ut aliquip ex ea commodo consequat.
 ${1+1} Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, 
  sunt in culpa egoing qui officia deserunt mollit anim id est laborum. 
  ${name}`;
 
console.log(letter);

// Boolean data type
var tf;
tf = true;
console.log(tf);
console.log(false);

// 비교 연산자
console.log(1==1); //true
console.log(1==2); //false
console.log(1>2); //false
console.log(1<2); //false
console.log(1===1); //true
console.log(1===2); //false

var args = process.argv;
console.log(args[2]);
console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');
