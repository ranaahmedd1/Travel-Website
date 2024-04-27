const content = document.getElementsByClassName("content")[0];
const logout = document.getElementById("logout");
const newparagraph = document.createElement("p");
const div = document.getElementById("cityTable");





function displayLogout() {
  logout.style.display = "block";
}



function welcomeMessage() {
  if (localStorage.getItem("email") != null) {
    let  user = localStorage.getItem("email");
    newparagraph.innerText = "welcome, " + user;
    newparagraph.className = "newParagraph";
    content.appendChild(newparagraph);
  } 
}


function switchtoCity(idx) {
  localStorage.setItem("cityindex",idx)
  window.location.href = `http://127.0.0.1:5000/showcity/${idx}`;
}
displayLogout();
welcomeMessage();
