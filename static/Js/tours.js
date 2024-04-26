const content = document.getElementsByClassName("content")[0];
const logout = document.getElementById("logout");
const newparagraph = document.createElement("p");
const div = document.getElementById("cityTable");

let oneCity = "";

// let allcities = [
//   {
//     name: "New York",
//     country: "USA",
//     population: 8175133,
//     attractions: ["Central Park", "Statue of Liberty", "Times Square"],
//     images: [
//       "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
//   },
//   {
//     name: "London",
//     country: "UK",
//     population: 8982000,
//     attractions: ["Buckingham Palace", "Big Ben", "British Museum"],
//     images: [
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
//   },
//   {
//     name: "Paris",
//     country: "France",
//     population: 2206488,
//     attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
//     images: [
//       "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg",
//       "https://images.pexels.com/photos/2704910/pexels-photo-2704910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg",
//       "https://images.pexels.com/photos/2704910/pexels-photo-2704910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg",
//       "https://images.pexels.com/photos/2704910/pexels-photo-2704910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

//     ],
//   },{
//     name: "New York",
//     country: "USA",
//     population: 8175133,
//     attractions: ["Central Park", "Statue of Liberty", "Times Square"],
//     images: [
//       "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
//   },
//   {
//     name: "London",
//     country: "UK",
//     population: 8982000,
//     attractions: ["Buckingham Palace", "Big Ben", "British Museum"],
//     images: [
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
//   },
//   {
//     name: "New York",
//     country: "USA",
//     population: 8175133,
//     attractions: ["Central Park", "Statue of Liberty", "Times Square"],
//     images: [
//       "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
//   },
//   {
//     name: "London",
//     country: "UK",
//     population: 8982000,
//     attractions: ["Buckingham Palace", "Big Ben", "British Museum"],
//     images: [
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       "https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     ],
  
//   }
// ];



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

// showAllCities();

// const readMoreBtn=document.getElementById("btn")
// readMoreBtn.addEventListener("click",(cityindex)=>{
  //   localStorage.setItem("cityindex",idx)
//   window.location.href = "http://127.0.0.1:5000/showcity";
// })



  // let cityindex=0
  // function showAllCities() {
  //   allcities.map((e, idx) => {
  //     // cityindex=idx
  //     oneCity += `
  //         <div class="city" >
  //         <img class="image" src="${e.images[1]}" />
  //         <h1>${e.name}</h1>
  //         <h2>${e.country}</h2>
  //         <p>${e.attractions}</p>
  //         <button  onclick="switchtoCity(${idx})" class="readMore">Read More</button>
  //         </div>`;
  //     // showOneCity(${idx}) 
  //     div.innerHTML = oneCity;
  //   });
  // }