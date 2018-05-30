var btn =document.getElementById('login_btn'); 
btn.onclick = function() {
 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200){
           console.log('User logged in!');
           alert('Login Success!');
        }
        else if(request.status===403)
        {
            alert('incorrect credentials!');
        }
        else if(request.status==500)
        {
            alert('Something went wrong! Try again!');
        }
 }
 
  };
  var user=document.getElementById('username').value;
  var pass=document.getElementById('password').value;
  console.log('Username and password received!');
  request.open('POST', 'http://localhost:8080/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username: user,password:pass}));
};

console.log('App running!');
