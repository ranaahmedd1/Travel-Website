const logout = document.getElementById("logout");
const addtodestBTN = document.getElementById("addtoDestinationButton");

function displayLogout() {
  logout.style.display = "block";
}

displayLogout();


function switchICons(){
  

}
addtodestBTN.addEventListener("change", () => {
  if(addtodestIMG.src == "../static/images/alreadyadded.png")
  {
    addtodestIMG.src="../static/images/add.png"
    addtodestIMG.alt=" added to destination"
    // addtodestBTN.style.backgroundImage="../images/add.png"
  }
  else if(addtodestIMG.src == "../static/images/add.png")
  {
    addtodestIMG.src="../static/images/alreadyadded.png"
    addtodestIMG.alt=" add to destination"

  }
});
