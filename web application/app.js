// ===============================
// Student Management System JS
// ===============================


// Select Elements

const form = document.getElementById("studentForm");

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const emailInput = document.getElementById("email");

const table = document.getElementById("studentTable");

const searchInput = document.getElementById("search");

const themeBtn = document.getElementById("themeBtn");


// Dashboard Elements

const totalStudents =
document.getElementById("totalStudents");

const averageAge =
document.getElementById("averageAge");

const courseCount =
document.getElementById("courseCount");



// Store Students

let students = JSON.parse(
localStorage.getItem("students")
) || [];

let editIndex = null;



// Display Students

function displayStudents(data = students){

    table.innerHTML = "";


    data.forEach((student,index)=>{


        let row = `

        <tr>

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.course}</td>

        <td>${student.email}</td>


        <td>

        <button class="edit"
        onclick="editStudent(${index})">
        Edit
        </button>


        <button class="delete"
        onclick="deleteStudent(${index})">
        Delete
        </button>


        </td>


        </tr>

        `;


        table.innerHTML += row;


    });


    updateDashboard();

}



// Add / Update Student

form.addEventListener(
"submit",
function(e){


    e.preventDefault();


    let student = {


        name:nameInput.value,
        age:Number(ageInput.value),
        course:courseInput.value,
        email:emailInput.value


    };



    if(editIndex === null){


        students.push(student);


    }

    else{


        students[editIndex] = student;

        editIndex = null;


    }



    saveData();


    form.reset();


    displayStudents();



});




// Edit Student

function editStudent(index){


    let student = students[index];


    nameInput.value =
    student.name;


    ageInput.value =
    student.age;


    courseInput.value =
    student.course;


    emailInput.value =
    student.email;



    editIndex=index;



}



// Delete Student


function deleteStudent(index){


    let confirmDelete =
    confirm(
    "Delete this student?"
    );


    if(confirmDelete){


        students.splice(index,1);


        saveData();


        displayStudents();


    }


}



// Search Student


searchInput.addEventListener(
"keyup",
function(){


    let value =
    searchInput.value.toLowerCase();



    let filtered =
    students.filter(student=>


        student.name
        .toLowerCase()
        .includes(value)

        ||

        student.course
        .toLowerCase()
        .includes(value)


    );



    displayStudents(filtered);



});



// Save Data


function saveData(){


localStorage.setItem(
"students",
JSON.stringify(students)
);


}



// Dashboard Update


function updateDashboard(){


    totalStudents.innerText =
    students.length;



    if(students.length>0){


        let totalAge =
        students.reduce(
        (sum,student)=>
        sum+student.age,0
        );


        averageAge.innerText =
        Math.round(
        totalAge/students.length
        );


    }

    else{


        averageAge.innerText=0;


    }



    let courses =
    new Set(
    students.map(
    student=>student.course
    )
    );


    courseCount.innerText =
    courses.size;



}



// Dark Mode


themeBtn.addEventListener(
"click",
()=>{


document.body.classList.toggle(
"dark"
);


});



// Initial Load

displayStudents();