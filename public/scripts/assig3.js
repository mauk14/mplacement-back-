  function checkPassword(form) {
    var password = form.password.value;
    var lowerLet = "qwertyuiopasdfghjklzxcvbnm"; 
    var upperLet = "QWERTYUIOPLKJHGFDSAZXCVBNM"; 
    var digits = "0123456789"; 
    var specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; 
    var lowerCheck = false;
    var upperCheck = false;
    var digitCheck = false; 
    var specialCheck = false;
    for (var i = 0; i < password.length; i++) {
      if (!lowerCheck && lowerLet.indexOf(password[i]) != -1) lowerCheck = true;
      else if (!upperCheck && upperLet.indexOf(password[i]) != -1) upperCheck = true;
      else if (!digitCheck && digits.indexOf(password[i]) != -1) digitCheck = true;
      else if (!specialCheck && specials.indexOf(password[i]) != -1) specialCheck = true;
    }
   
    if(password.length >= 8 && lowerCheck == true && upperCheck == true && digitCheck == true && specialCheck == true){
    	text = "Password is correct!";
    }
    else{text = "Password is incorrect! Your password must consist of 8 characters. Your password must have uppercase and lowercase letters. Your password must have at least one digit and one letter."}
    alert(text);
  }

  function myMove(){
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, id);
  function frame(){
    if(pos == 1920){
      clearInterval(id);
    } else{
      pos++;
      elem.style.left = pos + 'px';
    }
  }
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var audioPlay1 = document.getElementById("clickAudio"); 
btn.onclick = function() {
  modal.style.display = "block";
  audioPlay1.play(); 

}
span.onclick = function() {
  modal.style.display = "none";
}


var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var span2 = document.getElementsByClassName("close2")[0];
var audioPlay2 = document.getElementById("clickAudio"); 
btn2.onclick = function() {
  modal2.style.display = "block";
  audioPlay2.play(); 

}

span2.onclick = function() {
  modal2.style.display = "none";
}


var modal3 = document.getElementById("myModal3");
var btn3 = document.getElementById("myBtn3");
var span3 = document.getElementsByClassName("close3")[0];
var audioPlay3 = document.getElementById("clickAudio"); 
btn3.onclick = function() {
  modal3.style.display = "block";
  audioPlay3.play(); 

}
span3.onclick = function() {
  modal3.style.display = "none";
}


