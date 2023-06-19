import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { Getdata } from "./getdata";

export function Fetching({ data }) {
  let companyid = data.company_id;
  return (
    <div>
      {companyid ? <Details companyid={companyid} token={data.token} /> : ""}
    </div>
  );
}

export function Details({ companyid, token }) {
  const [userdata, setUserData] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);

  const getdetails = () => {
    fetch(
      `https://stage.api.sloovi.com/team?product=outreach&company_id=${companyid}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((data) => data.json())
      .then((usr) => {
        setUserData(usr.results.data);
      });
  };
  useEffect(() => getdetails(), []);

  
 
  let assignedusr = "Arun Karthik";
  let time_zne = time
    .split(":")
    .reduce((a, v) => (parseInt(a * 60) + parseInt(v)) * 60);
  for (let key in userdata) {
    if (userdata[key].name === name) {
      assignedusr = userdata[key].user_id;
    }
  }
  const addtask = (event) => {
    try {
      fetch(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assigned_user: assignedusr,
            task_date: date,
            task_time: time_zne ,
            is_completed: 0,
            time_zone: time_zne ,
            task_msg: description,
          }),
        }
      )
        .then((data) => data.json())
        .then((count) =>
        setCount(count+1));
        document.form.reset()
    } catch (err) {
      console.log(err);
    }
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="task-container">
       <div>
       <h1 className="heading">Add New Task</h1> 
        <div className="task">
          
          <form name="form" onSubmit={addtask}>
            <input
              className="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="date-time">
              <input
                className="date"
                type="date"
                DateTimeFormat=""
                placeholder="Description"
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                className="time"
                type="time"
                placeholder="Description"
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="name-dropdown">
              <select
                onChange={(e) => setName(e.target.value)}
                className="select-name"
              >
                {userdata
                  ? userdata.map((e, i) => (
                      <option value={e.name} key={i}>
                        {e.name}
                      </option>
                    ))
                  : ""}
              </select>
              <button className="button" type="submit">Save</button>
            </div>
          </form>
          
        </div>
       </div>
        <div>
            <Getdata userdata={userdata} count={count} companyid={companyid} token={token}/>
        </div>
        
      </div>
    </div>
  );
}
