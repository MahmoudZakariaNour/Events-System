// const submitBtn = document.getElementById("submitBtn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pw = document.getElementById("pw");
const cpw = document.getElementById("cpw");
const lbl = document.getElementById("Output");
const login = document.getElementById("login");

login.addEventListener("click", () => {
    window.location.href = ("/Front_End/index.html");

});

function onSub() {
    if (!(pw.value != "" && cpw.value != "" && pw.value == cpw.value)) {
        // alert("Check Your Passwords");
        lbl.innerText = "Check Your Passwords";
        return;
    }
    let body = {
        "email": email.value,
        "password": pw.value,
        "name": (fname.value + " " + lname.value)

    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8080/registerStudent/", false);;
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xmlHttp.send(JSON.stringify(body));
    lbl.innerText = xmlHttp.statusText;
    console.log(xmlHttp);
}
