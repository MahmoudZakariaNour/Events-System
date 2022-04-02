const logoutBtn = document.getElementById("LogoutBtn");
const studentsBtn = document.getElementById("getStudents");
const speakersBtn = document.getElementById("getSpeakers");
const table = document.getElementById("dataTable");


logoutBtn.addEventListener("click", () => {
    window.location.replace("/Front_End/index.html");

});

studentsBtn.addEventListener("click", () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8080/students/", false);;
    xmlHttp.setRequestHeader("token", sessionStorage.getItem("token"))
    xmlHttp.send();
    if (xmlHttp.status == 200) {
        // Data Retrevied
        let data = JSON.parse(xmlHttp.responseText).data;
        table.innerHTML = "";
        let rowIndex = table.insertRow();
        rowIndex.insertCell(0).innerText = "ID";
        rowIndex.insertCell(1).innerHTML = "Name";
        rowIndex.insertCell(2).innerHTML = "Email";
        for (let index = 0; index < data.length; index++) {
            let row = table.insertRow();
            row.insertCell(0).innerHTML = data[index]._id;
            row.insertCell(1).innerHTML = data[index].name;
            row.insertCell(2).innerHTML = data[index].email;
            row.insertCell(3).innerHTML = `<button onclick="deleteStudentWithId(${data[index]._id})">Delete</button>`;
        } console.log(data);

    } else {

        console.log(xmlHttp);
    }
});

speakersBtn.addEventListener("click", () => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8080/speakers/", false);;
    xmlHttp.setRequestHeader("token", sessionStorage.getItem("token"))
    xmlHttp.send();
    if (xmlHttp.status == 200) {
        // Data Retrevied
        let data = JSON.parse(xmlHttp.responseText).data;
        table.innerHTML = "";
        let rowIndex = table.insertRow();
        rowIndex.insertCell(0).innerText = "ID";
        rowIndex.insertCell(1).innerHTML = "Name";
        rowIndex.insertCell(2).innerHTML = "Email";
        rowIndex.insertCell(3).innerHTML = "Image";
        for (let index = 0; index < data.length; index++) {
            let row = table.insertRow();
            row.insertCell(0).innerHTML = data[index]._id;
            row.insertCell(1).innerHTML = data[index].name;
            row.insertCell(2).innerHTML = data[index].email;
            row.insertCell(3).innerHTML = data[index].image;
            row.insertCell(4).innerHTML = `<button onclick="deleteSpeakerWithId('${data[index]._id}')">Delete</button>`;
            // row.insertCell(4).innerHTML = `<button onclick="deleteSpeakerWithId(${data[index]._id})">Delete</button>`;
        }
        console.log(data);

    } else {

        console.log(xmlHttp);
    }
});

function deleteStudentWithId(id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("delete", "http://localhost:8080/students/", false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xmlHttp.setRequestHeader("token", sessionStorage.getItem("token"))
    xmlHttp.send(JSON.stringify({ "id": id }));
}


function deleteSpeakerWithId(id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("delete", "http://localhost:8080/speakers/", false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xmlHttp.setRequestHeader("token", sessionStorage.getItem("token"))
    xmlHttp.send(JSON.stringify({ "id": id }));
}