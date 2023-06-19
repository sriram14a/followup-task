import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export function Getdata({ count, companyid, token, userdata }) {
  const [task, setTask] = useState([]);
  const [singledata, setSingledata] = useState("");

  const getdetails = () => {
    try {
      fetch(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((data) => data.json())
        .then((usr) => {
          setTask(usr.results);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => getdetails(), [count]);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");

  const  handleEdit = (id)=> {
    try {
      fetch(
        ` https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${id}?company_id=${companyid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((data) => data.json())
        .then((usr) => {
          setName(usr.results.name);
          setDescription(usr.results.task_msg);
          setDate(usr.results.task_date);
          setTime(usr.results.task_time);
          setSingledata(usr.results.id);
        });
    } catch (err) {
      console.log(err);
    }
  }
  let time_zne = time;
  if (typeof time === "string") {
    time_zne = time
      .split(":")
      .reduce((a, v) => (parseInt(a * 60) + parseInt(v)) * 60);
  }
  if (name === undefined) {
    setName("Arun Karthik");
  }

  const handleupdate = (e) => {
    e.preventDefault();
    try { 
      fetch(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${singledata}?company_id=${companyid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assigned_user: name,
            task_date: date,
            task_time: time_zne,
            is_completed: 0,
            time_zone: time_zne,
            task_msg: description,
          }),
        }
      )
        .then((data) => data.json())
        .then(() => {
          getdetails();
          setSingledata(1);
        });
    } catch (err) {
      console.log(err);
    }
   
  }
 
  return (
    <div>
      <h1 className="heading">Tasks</h1>
      <div className="data-field">
        {" "}
        {task.length === 0 ? (
          <>"No tasks Available"</>
        ) : (
          <div>
            {task.map((item) =>
              item.id === singledata ? (
                <form onSubmit={handleupdate} key={item.id}>
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <div className="date-time">
                    <input
                      className="date"
                      type="date"
                      DateTimeFormat=""
                      placeholder="Description"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                    <input
                      className="time"
                      type="time"
                      placeholder="Description"
                      onChange={(e) => setTime(e.target.value)}
                      value={time}
                    />
                  </div>
                  <div className="name-dropdown">
                    <select
                      onChange={(e) => setName(e.target.value)}
                      className="select-name"
                    >
                      {userdata
                        ? userdata.map((e, i) => (
                            <option key={i}>{e.name}</option>
                          ))
                        : ""}
                    </select>
                    <button
                      type="submit"
                      className="button"
                    >
                      Update
                    </button>
                  </div>
                </form>
              ) : (
                <div key={item.id} className="tasks">
                  <div className="times">
                    <span>time: {item.time_zone}</span>
                    <span>time: {item.task_time}</span>
                    <span>date: {item.task_date}</span>
                  </div>
                  {/* <span>user_id{item.assigned_user}</span> */}
                  <div className="icon-display">
                    <div>
                      <span>description: {item.task_msg}</span>
                    </div>{" "}
                    <div>
                      <IconButton
                        onClick={() => {
                          try {
                            fetch(
                              `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${item.id}?company_id=${companyid}`,
                              {
                                method: "DELETE",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                              .then((data) => data.json())
                              .then(() => {
                                getdetails();
                              });
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        <DeleteOutlineIcon
                          sx={{ color: "rgb(220,20,60)" }}
                        ></DeleteOutlineIcon>
                      </IconButton>
                      <IconButton onClick={()=>handleEdit(item.id)}
                          sx={{ color: "blue" }}>
                        <EditIcon
                          
                        ></EditIcon>
                      </IconButton>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
