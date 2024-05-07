const logout = document.getElementById("logout");

// console.log(addtodestIMG)
function displayLogout() {
  logout.style.display = "block";
}

displayLogout();


const addtodestBTN = document.getElementById("addtoDestinationButton");
const addtodestIMG = document.getElementById("addtoDestination");
fyn
function switchFav(i) {
  
  if (addtodestIMG.src === 'http://127.0.0.1:5000/static/images/alreadyadded.png') {
    addtodestIMG.src = '../static/images/add.png';
    addtodestIMG.alt = "added to destination";
    let i=localStorage.getItem("cityindex");
    window.location.href = `http://127.0.0.1:5000/addtoFav/${i}`;
  }
  //  else if (addtodestIMG.src === 'http://127.0.0.1:5000/static/images/add.png') {
  //   addtodestIMG.src = '../static/images/alreadyadded.png';
  //   addtodestIMG.alt = " add to destination";
  //   addtodestBTN.onclick=removeFavCity();

  // }

};

function switchvisited(i) {
  
  if (addtodestIMG.src === 'http://127.0.0.1:5000/static/images/alreadyadded.png') {
    addtodestIMG.src = '../static/images/add.png';
    addtodestIMG.alt = "added to destination";
    let i=localStorage.getItem("cityindex");
    window.location.href = `http://127.0.0.1:5000/addtovisited/${i}`;
  }
  //  else if (addtodestIMG.src === 'http://127.0.0.1:5000/static/images/add.png') {
  //   addtodestIMG.src = '../static/images/alreadyadded.png';
  //   addtodestIMG.alt = " add to destination";
  //   addtodestBTN.onclick=removeFavCity();

  // }

};
