This app is intended to provide a simple JSON response as a request for an Android app test that I'm working on.

Query:
<pre>
curl -i http://dev.feigdev.com:58912/get_response 
</pre>

Result:
<pre>
HTTP/1.1 200 OK
Content-Type: text/json
Date: Sat, 27 Apr 2013 22:18:17 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{"hostname":"remote host feigdev","user":"user","auth_token":"ajfowienfoani/nawogfina/1w3inoangoins","password":"password","database":"database"}
</pre>

