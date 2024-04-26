const email=document.getElementById("email")
const passwrd=document.getElementById("passwrd")
const submitBtn=document.getElementById("inputbuttn")
// console.log(submitBtn)

submitBtn.addEventListener("click",()=>{
    localStorage.setItem("email",email.value)

})
