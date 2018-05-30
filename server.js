var express= require('express');
var morgan = require('morgan');
var path = require('path');
var crypto= require('crypto');
var bodyparser = require('body-parser');
var app = express();
var http = require('http');

app.use(morgan('combined'));
app.use(bodyparser.json());
			   
app.get('/',function(req,res) {
	res.sendFile(path.join(__dirname,'ui','login.html'));
});


var counter=0;
app.get('/counter',function(req,res) {
	counter=counter+1;
	res.send(counter.toString());
});

app.get('/user/:username', function(req,res) {
	var name=req.params.username;
	res.send(name.toString());
});

function hash(input,salt)
{
	var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return ["pbkdf2",salt,"10000",hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res) {
	var hashedValue=hash(req.params.input,'this~is~random~string');
	res.send(hashedValue);
});
app.post('/login', function(req,res) {
	var username='Sourav';
	var password='test';

	var inputuser=req.body.username;
	var inputpass=req.body.password;
	if(username===inputuser)
	{
		if(inputpass===password)
		{
			
			res.status(200).send("Successfully logged in!");
			alert('You are successfully logged in!');
			var request= new XMLHttpRequest();
			request.onreadystatechange = function () {
         		 if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
             		 if (request.status === 200) {
                    // clear the form & reload all the comments
                   		alert('Successful!'); 
              		  } 
			 else {
                    		alert('Failed!');
               		 }
                	
          }
        };
		
		request.open('GET','/index',true);
		request.setRequestHeader('Content-Type','text/html');
		request.send(null);
		}
		else
		{
			res.status(403).send('username/password invalid!');
			alert('Username/password invalid!');
		}
	}
	else
	{
		res.status(403).send('username/password invalid!');
		alert('username/password invalid');
	}
});

app.get('/check-login', function(req,res) {
	if(req.session && req.session.auth && req.session.auth.userId) 
   	{
   	    res.send('You are logged in:' +req.session.auth.userId.toString());
   	}
	else
   	{
       		res.send('You are not logged in!');
   	}
});

app.get('/index',function(req,res){
	res.sendFile(path.join(__dirname,'ui','index.html'));
});
	

var port=8080;
app.listen(port,function() {
	console.log(`My app is listening on port ${port}!`);
});
