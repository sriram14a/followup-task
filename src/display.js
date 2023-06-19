import { useEffect, useState } from "react";
import "./App.css";
import { Fetching } from "./getdetails";


export function Display() {
  const [data, setData] = useState([]);

  const getdata = () => {
    fetch("https://stage.api.sloovi.com/login?product=outreach", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "smithwills1989@gmail.com",
        password: "12345678",
      }),
    })
      .then((data) => data.json())
      .then((st) => setData(st.results));
  }
  useEffect(() => getdata(),[]);

  return (
    <div>
      <h1 className="main-heading">Dashboard</h1>
      <Fetching data={data}/>
    </div>
  );
}


