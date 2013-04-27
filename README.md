This app is intended to provide a simple JSON response as a request for an Android app test that I'm working on.

Currently, this is totally broken. Will update soon. =)

Query:
<pre>
curl -i http://dev.feigdev.com:58912/get_response
</pre>

Result:
<pre>
HTTP/1.1 200 OK
Content-Type: text/json
Connection: keep-alive
Transfer-Encoding: chunked

[{"id":1,"current":true,"version":"0.0.1","download_link":"http://files.feigdev.com/pind_beta.apk"}]
</pre>

Query:
<pre>
curl -i http://pind.feigdev.com:3000/check_email?email=test@test.com
</pre>

Result:
<pre>
HTTP/1.1 200 OK
Content-Type: text/json
Connection: keep-alive
Transfer-Encoding: chunked

{"id":0,"affected":1,"warning":0}
</pre>

