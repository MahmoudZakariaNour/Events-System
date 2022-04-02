// const submitBtn = document.getElementById("submitBtn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pw = document.getElementById("pw");
const cpw = document.getElementById("cpw");
const lbl = document.getElementById("Output");
const login = document.getElementById("login");
const upFile = document.getElementById("upImg");

login.addEventListener("click", () => {
    window.location.href = ("/Front_End/index.html");

});

function onSub() {
    if (!(pw.value != "" && cpw.value != "" && pw.value == cpw.value)) {
        // alert("Check Your Passwords");
        lbl.innerText = "Check Your Passwords";
        return;
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8080/registerSpeaker/", false);
    // xmlHttp.setRequestHeader('Content-Type', 'multipart/form-data');
    // xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    var formData = new FormData();
    var upFile = document.forms['RegSpkForm']['upImg'].files[0];
    formData.append("image", upFile);
    formData.append("email", email.value);
    formData.append("password", pw.value);
    formData.append("name", (fname.value + " " + lname.value));
    formData.append("role",  "speaker");
    formData.append("imageUrl", upFile.originalname);
    
    lbl.innerText = xmlHttp.statusText;
    xmlHttp.send(formData);
    console.log(xmlHttp);

}
