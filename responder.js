var http = require('http');
var url = require('url');
var resp = '';

// set up database variable
// obviously, swap out the below with your db details
var sample_response = {
    hostname: 'remote host feigdev',
    user: 'user',
    auth_token: 'ajfowienfoani/nawogfina/1w3inoangoins',
    password: 'password',
    database: 'database'
};

// this is the http request function, figures out which method to call 
// based on the path
function onRequest (request,response){

    resp = response;
    var pathname = url.parse(request.url).pathname;
    console.log('recieved request to ' + pathname);
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    if ('/get_response' === pathname){
      console.log('get_response');
      response.writeHead(200, {'Content-Type': 'text/json'});
      response.write(JSON.stringify(sample_response));
      response.end('\n');
    }
    else{
      console.log('wrong url' );
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write("nothing to see here, move along");
      response.end('\n');
    }
}

http.createServer(onRequest).listen(58912);
console.log('Server running on port 58912');

