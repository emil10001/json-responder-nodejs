var http = require('http');
var url = require('url');
var resp = '';

// set up database variable
// obviously, swap out the below with your db details
var sample_response = {
    hostname: 'localhost',
    user: 'user',
    auth_token: 'ajfowienfoani/nawogfina/1w3inoangoins',
    password: 'password',
    database: 'database'
};

// simple callback function, writes the response to the http request
function reply(text){
  console.log('reply: ' + JSON.stringify(text));
  resp.write(JSON.stringify(text));
  resp.end('\n');
}

// this is the http request function, figures out which method to call 
// based on the path
function onRequest (request,response){
    response.writeHead(200, {'Content-Type': 'text/json'});
    resp = response;
    var pathname = url.parse(request.url).pathname;
    console.log('recieved request to ' + pathname);
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    if ('/check_version' === pathname){
      console.log('checkVersion');
      checkVersion(reply);
    }
    else if ('/check_email' === pathname){
      console.log('checkEmail(' + query['version'] +')' );
      checkEmail(query['email'],reply);
    }
}

// is the JSON object empty?
function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

// grabs rows from the versions table marked as 'current'
// there should probably only be one of these
function checkVersion (callback){
  console.log('checkVersion');
  db.connect(function(error){
    if (error) {
      return console.log('CONNECTION error: ' + error);
    }
    this.query().select('*').from('versions').where('current=true').execute(function(error, rows) {
    if (error) {
      return console.log('ERROR: ' + error);
    }
    console.log(rows.length + ' ROWS');
    callback(rows);
  })
  });
}

// if there is an email in the database for the user, then update the count
// if there is not an email in the db, then add the email to the emails table
function checkEmail (email,callback){
  console.log('checkEmail');
  db.connect(function(error){
    if (error){
      return console.log('CONNECTION error: ' + error);
    }
    this.query().select('*').from('emails').where('email=?',[email])
     .execute(function(error, rows) {
      if (error) {
        return console.log('ERROR: ' + error);
      }
      console.log(rows.length + ' ROWS');
      if (isEmpty(rows)){
        insertEmail(email,callback);
      } else {
        updateCount(rows[0],callback);
      }
    })
  });
}

// if a user makes multiple requests, the count gets updated
// we want to know how many times our app gets used by each user
function updateCount (prevResult,callback){
  console.log('updateCount: ' + prevResult);
  db.connect(function(error){
    if (error){
      return console.log('CONNECTION error: ' + error);
    }
    this.query()
     .update('emails')
     .set({'count': [prevResult['count'] + 1]})
     .where('id=?',[prevResult['id']])
     .execute(function(error, result) {
       if (error) {
         return console.log('ERROR: ' + error);
       }
       console.log('GENERATED id: ' + result.id);
       callback(result);
     })
  });
}

// if the email isn't already in the database, insert it
function insertEmail (email,callback){
  console.log('insertEmail: ' + email);
  db.connect(function(error){
    if (error){
      return console.log('CONNECTION error: ' + error);
    }
    this.query().insert('emails', ['email'], [email] )
     .execute(function(error, result) {
       if (error) {
         return console.log('ERROR: ' + error);
       }
       console.log('GENERATED id: ' + result.id);
       callback(result);
     })
  });
}

http.createServer(onRequest).listen(3000);
console.log('Server running on port 3000');
