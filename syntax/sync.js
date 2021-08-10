var fs = require('fs');
 
/* 동기 함수
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/
 
/* 비동기 */
// callback 함수 등록 
console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');