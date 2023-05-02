// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";
var cv_cid = [];
var item1 = [];

var ToDoButton = document.querySelector(".todo");
var CompletedButton = document.querySelector(".completed");
var ToDoTable = document.getElementById("to-do-table");
var CompletedTable = document.getElementById("completed-table");

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

CompletedTable.setAttribute("hidden", "hidden");
CompletedTable.style.display = "none";
// TODO #3.1: Change group number
const getGroupNumber = () => {
  return 30;
};

// Example: Send Get user profile ("GET") request to backend server and show the response on the webpage
const getUserProfile = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
      document.getElementById(
        "eng-name-info"
      ).innerHTML = `${data.user.firstname_en} ${data.user.lastname_en}`;
      document.getElementById(
        "thai-name-info"
      ).innerHTML = `${data.user.firstname_th} ${data.user.lastname_th}`;
    })
    .catch((error) => console.error(error));
};

// TODO #3.3: Send Get Courses ("GET") request to backend server and filter the response to get Comp Eng Ess CV_cid
//            and display the result on the webpage
const getCompEngEssCid = async () => {
  const table_body = document.getElementById("to-do-table");
  const table_body2 = document.getElementById("completed-table");
  const options = {
    method: "GET",
    credentials: "include",
  };
  const cv_cid2 = [];
  await fetch(`http://${backendIPAddress}/courseville/get_courses`, options)
    .then((response) => response.json())
    .then((data) => data.data.student)
    .then((course) => {
      for (let i = 0; i < course.length; i++) {
        cv_cid.push(course[i].cv_cid);
      }

      // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //

      //  // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
    })
    .catch((error) => console.error(error));
  for (let i = 0; i < cv_cid.length; i++) {
    await fetch(
      `http://${backendIPAddress}/courseville/get_courses_info/${cv_cid[i]}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        cv_cid2.push(data.data.title);

        // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //

        //  // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
      })
      .catch((error) => console.error(error));
  }
  console.log(cv_cid2);
  table_body.innerHTML = "";
  table_body2.innerHTML = "";

  let item2 = [];
  const duedate = "";
  for (let i = 0; i < cv_cid.length; i++) {
    await fetch(
      `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid[i]}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        for (let j = 0; j < data.data.length; j++) {
          item1.push({
            course: cv_cid[i],
            item: data.data[j].itemid,
            subject: cv_cid2[i],
          });
        }
      })
      .catch((error) => console.error(error));
  }

  for (let i = 0; i < item1.length; i++) {
    await fetch(
      `http://${backendIPAddress}/courseville/get_assignment_detail/${item1[i].item}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data.duetime > Date.now() / 1000) {
          const d = new Date(data.data.duetime * 1000);
          console.log(d);
          const montha = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          item2.push({
            subject: item1[i].subject,
            id: data.data.itemid,
            title: data.data.title,
            due: data.data.duetime,
            timeMo: montha[d.getMonth()],
            timeD: d.getDate(),
            timeH: d.getHours(),
            timeM: d.getMinutes(),
            finished: 0,
          });
        }
      });
  }
  console.log(item2);
  item2.sort((a, b) => {
    return a.due - b.due;
  });
  item2.map((item) => {
    if (item.timeM < 10) {
      item.timeM = "0" + String(item.timeM);
    }
    if (item.finished == 0) {
      // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
      table_body.innerHTML += ` 
                <div class="block">
                    <button class="left" onclick = "moveRow(this)"><alt="Button"> 
                    </button>
                    <div class="center">
                        <div class="subject">
                        ${item.subject}
                        </div>
                        <br>
                        <div class="assignment">
                        ${item.title}
                        </div>
                    </div>
                    <div class="right">
                        <div class="date_box">
                            <div class="month">${item.timeMo}</div>
                            <div class="date">${item.timeD}</div>
                            <div class="hour">${item.timeH}:${item.timeM}</div>
                        </div>
                    </div>
                </div>
          </tr>
         `;
    }
  });
};

// TODO #3.5: Send Get Course Assignments ("GET") request with cv_cid to backend server
//            and create Comp Eng Ess assignments table based on the response (itemid, title)

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
function ToDo() {
  CompletedButton.style.backgroundColor = "rgb(83, 178, 212)";
  ToDoButton.style.backgroundColor = "rgb(217,217,217)";
  ToDoTable.removeAttribute("hidden");
  CompletedTable.setAttribute("hidden", "hidden");
  ToDoTable.style.display = "table";
  CompletedTable.style.display = "none";
}

function completed() {
  CompletedButton.style.backgroundColor = "rgb(217,217,217)";
  ToDoButton.style.backgroundColor = "rgb(83, 178, 212)";

  CompletedTable.removeAttribute("hidden");
  ToDoTable.setAttribute("hidden", "hidden");
  ToDoTable.style.display = "none";
  CompletedTable.style.display = "table";
}

function moveRow(button) {
  var row = button.closest(".block");
  //   var table = row.closest("div").id;
  var clone = row.cloneNode(true);
  row.style.animation = "fadeOut 0.5s";
  setTimeout(function () {
    row.remove();
  }, 500);
  clone.querySelector("button").setAttribute("onclick", "moveRow2(this)");
  clone.querySelector("button").classList.remove("left");
  clone.querySelector("button").classList.add("left2");
  document.getElementById("completed-table").appendChild(clone);

  row.remove();
}

function moveRow2(button) {
  var row = button.closest(".block");
  //   var table = row.closest("div").id;
  var clone = row.cloneNode(true);

  // row.style.opacity = "0";
  // setTimeout(function() {
  //   row.style.display = none;
  // },500);

  clone.querySelector("button").setAttribute("onclick", "moveRow(this)");
  clone.querySelector("button").classList.remove("left2");
  clone.querySelector("button").classList.add("left");
  document.getElementById("to-do-table").appendChild(clone);

  row.remove();
}

let popup = document.getElementById("popup");
function openPopup() {
  popup.classList.add("open-popup");
}

function cancle() {
  popup.classList.remove("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
  var sj = document.getElementById("subject");
  var nt = document.getElementById("notes");
  var d = document.getElementById("day").value;
  var mth = document.getElementById("month").value;
  var h = document.getElementById("hour").value;
  var mn = document.getElementById("minute").value;
  var newRow = ToDoTable.insertRow();
  newRow.innerHTML = ` 
  <div class="block">
      <button class="left" onclick = "moveRow(this)"><alt="Button"> 
      </button>
      <div class="center">
          <div class="subject">
          ${sj}
          </div>
          <br>
          <div class="assignment">
          ${nt}
          </div>
      </div>
      <div class="right">
          <div class="date_box">
              <div class="month">${mth}</div>
              <div class="date">${d}</div>
              <div class="hour">${h}:${mn}</div>
          </div>
      </div>
  </div>
</tr>
`;
  sj.value = "";
  nt.value = "";
  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("hour").value = "";
  document.getElementById("minute").value = "";
}
