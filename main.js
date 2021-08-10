// 최초 nodejs를 이용한 web server 코드

var http = require('http');  // http 모듈을 가져온다.
var fs = require('fs');
var url = require('url'); // 'url' module 사용할 것이다.
var qs = require('querystring');
var template = require('./lib/template.js'); // 정리후 분리된 자체 모듈
var path = require('path');
var sanitizeHtml = require('sanitize-html');  // npm으로 설치: 사용자 입력정보가 script나 기타 오염된 정보라면 소독한다.
//npm install -S sanitize-html 으로 현재 프로젝트에서 사용할 용도의 모듈로 설치한다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    // query string에 따라 다른 정보를 출력하는 web app. 만들기
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);

    if(pathname ==='/') {
        if(queryData.id === undefined) {  // home일때

            fs.readdir('./data', function(error, filelist) {  // data 폴더내에 현재 web page에 표시할 파일리스트를 가져와서
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                console.log('current filelist: ', filelist);

                var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
                );
                
                response.writeHead(200);
                response.end(html);
            })
        }
        else {
            // https://opentutorials.org/module/3549/21123  App - 글목록 출력하기
            // 임의로 추가된 data 파일이 있으면 읽어와서 web page상에 자동으로 적용되어 보이게 된다...
            fs.readdir('./data', function(error, filelist) {
                // 입력정보에 대한 보안: 보안관련 접근을 차단해야한다.
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    // user 입력에서 script tag등을 쳐내버린다...
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, {allowedTags:['h1']});  // h1 tag는 허용해준다.
                    var list = template.list(filelist);
                    var html = template.HTML(sanitizedTitle, list,
                        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                        ` <a href="/create">create</a>
                          <a href="/update?id=${sanitizedTitle}">update</a>
                          <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                          </form>`
                    );

                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } 
    else if(pathname === '/create') {
        fs.readdir('./data', function(error, filelist) {
          var title = 'WEB - create';
          var list = template.list(filelist);
          var html = template.HTML(title, list, `
            <form action="http://localhost:3000/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
          `,``);
          response.writeHead(200);
          response.end(html);
        });
    }
    else if(pathname === '/create_process') {
        var body = '';
        request.on('data', function(data){  // 대용량일경우 수신할때마다 조각조각 붙여넣는다.
            body = body + data;

            if(body.length > 1e6) {  // data가 너무크면 접속을 끊어버린다. (option)
                //request.connection.destroy();
            }
        });
        request.on('end', function(){  // 정보 수신이 끝났다.
            var post = qs.parse(body);
            //console.log(post);
            var title = post.title;
            var description = post.description;

            // file 저장
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});  // 302: page를 다른데로 redirection 해라.
                response.end();
              });
        });
    }
    else if(pathname === '/update') {
        fs.readdir('./data', function(error, filelist){
            // 입력정보에 대한 보안: 
            var filteredId = path.parse(queryData.id).base;

            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
              var title = queryData.id;
              var list = template.list(filelist);
              var html = template.HTML(title, list,
                `
                <form action="/update_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                  <p>
                    <textarea name="description" placeholder="description">${description}</textarea>
                  </p>
                  <p>
                    <input type="submit">
                  </p>
                </form>
                `,
                `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
              );
              response.writeHead(200);
              response.end(html);     
            });
        });   
    }
    else if(pathname === '/update_process') {
        var body = '';
        request.on('data', function(data){  // 대용량일경우 수신할때마다 조각조각 붙여넣는다.
            body = body + data;

            if(body.length > 1e6) {  // data가 너무크면 접속을 끊어버린다. (option)
                //request.connection.destroy();
            }
        });
        request.on('end', function(){  // 정보 수신이 끝났다.
            var post = qs.parse(body);
            //console.log(post);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            //console.log(post);

            // 파일이름을 새로운 id로 rename
            fs.rename(`data/${id}`, `data/${title}`, function(error) {
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});  // 302: page를 다른데로 redirection 해라.
                    response.end();
                  })
            });
            /*
            // file 저장
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});  // 302: page를 다른데로 redirection 해라.
                response.end();
              });
              */
        });
    }
    else if(pathname === '/delete_process') {
        var body = '';
        request.on('data', function(data){  // 대용량일경우 수신할때마다 조각조각 붙여넣는다.
            body = body + data;
        });
        request.on('end', function(){  // 정보 수신이 끝났다.
            var post = qs.parse(body);
            //console.log(post);
            var id = post.id;
            // 입력정보에 대한 보안: 사용자가 접근하는 정보를 그대로 가져다 쓰면 안된다.
            var filteredId = path.parse(id).base;
            // asynchronously remove file
            fs.unlink(`data/${filteredId}`, function(error){
                response.writeHead(302, {Location: `/`});
                response.end();
              })
        });
    }    
    else {  // pathname '/' 이외 루트에서 접속했다면 에러 표시
        response.writeHead(404); // 404: 파일을 찾을 수 없다.
        response.end('Not found');
    }
});

app.listen(3000);