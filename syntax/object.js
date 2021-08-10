if(0) {
    var members = ['egoing', 'k8805', 'hoya'];
    console.log(members[1]); // k8805
    var i = 0;
    while(i < members.length){
    console.log('array loop', members[i]);
    i = i + 1;
    }
    
    var roles = {
    'programmer':'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
    }
    console.log(roles.designer); //k8805
    console.log(roles['designer']); //k8805
    
    for(var n in roles){
    console.log('object => ', n, 'value => ', roles[n]);
    }
}
else {
    // JavaScript - 객체 - 값으로서 함수
    var f = function(){
        console.log(1+1);
        console.log(1+2);
      }
      var a = [f];
      a[0]();
       
      var o = {
        func:f
      }
      o.func();

      // JavaScript - 객체 - 데이터와 값을 담는 그릇으로서 객체
      var q = {
        v1:'v1',
        v2:'v2',
        f1:function (){
          console.log(this.v1);
        },
        f2:function(){
          console.log(this.v2);
        }
      }
       
      q.f1();
      q.f2();

}
