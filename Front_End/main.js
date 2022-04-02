const MailTxt = document.getElementById("MailTxt");
const PassTxt = document.getElementById("PassTxt");

const LoginBtn = document.getElementById("LoginBtn");
const RegisStudentBtn = document.getElementById("RegisStdnBtn");
const RegisSpeakerBtn = document.getElementById("RegisSpkrBtn");

const OutputLbl = document.getElementById("OutPut");

LoginBtn.addEventListener("click", () => {
    console.log("try Login")
    if (MailTxt.value == "" ||PassTxt.value == "") {
        alert("Please Enter Your Email And Password");
        return;
    }
    try {
        let body = {
            "email": MailTxt.value,
            "password": PassTxt.value
        }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("PUT", "http://localhost:8080/login/", false);;
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xmlHttp.send(JSON.stringify(body));
        if (xmlHttp.status == 200) {
            //logged In
            let responseJson = JSON.parse(xmlHttp.responseText);
            sessionStorage.setItem("token", responseJson.token);
            let tokenJson = parseJwt(responseJson.token);

            alert(`Welcome ${tokenJson.role}`)
            if (tokenJson.role == "admin") {
                window.location.replace("/Front_End/AdminPanel/admin.html");
            }
            else if (tokenJson.role == "student") {
                window.location.replace("/Front_End/StudentPanel/student.html");

            }
            else if (tokenJson.role == "speaker") {
                window.location.replace("/Front_End/SpeakerPanel/speaker.html");

            }
            console.log(tokenJson);
            // console.log(responseJson)

        }else if(xmlHttp.status == 500){
            // OutputLbl.innerText = xmlHttp.response;
            alert(xmlHttp.response);

        }else{
            // console.log(xmlHttp.status)
        }
        // console.log(xmlHttp);

    }
    catch (err) {
        console.error(err);
    }
});


RegisStudentBtn.addEventListener("click", () => {
    window.location.replace("/Front_End/StudentPanel/register.html");
});
RegisSpeakerBtn.addEventListener("click", () => {
    window.location.replace("/Front_End/SpeakerPanel/register.html");
});

function tryLoggin() {

}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));


    return JSON.parse(jsonPayload);
}