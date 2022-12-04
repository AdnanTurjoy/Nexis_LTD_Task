import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TokenAuth } from "../../App";
import "./attendance.css";
import Table from "react-bootstrap/Table";
function Attendance(props) {
  const [token, setToken] = useContext(TokenAuth);
  const [dateStatus, setDateStatus] = useState([]);
  const [attendanceSheet, setAttendanceSheet] = useState([]);

  //console.log(token.access_token);
  useEffect(() => {
    axios
      .get("https://test.nexisltd.com/test", {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      })
      .then((res) => {
        var allUsers = [];
        for (var key in res.data) {
          allUsers.push(res.data[key]);
          //console.log(res.data[key].attendance);
        }
        setAttendanceSheet(allUsers);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

  const getOnlyAttendance = (atten) => {
    let allAttendace = [];
    for (var key in atten) {
      const dateAndStatus = {
        date: key,
        status: atten[key].status,
      };
      allAttendace.push(dateAndStatus);
    }
    return allAttendace;
  };

  console.log(attendanceSheet);
  console.log(dateStatus);
  return (
    <div className="container">
      <div className="header">
        <div className="logo"></div>
      </div>
      <div className="heading">
        <p className="heading-text">Attendance information</p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="attendance-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          {attendanceSheet &&
            attendanceSheet.map((val, key) => {
              let allDateStatus = getOnlyAttendance(val.attendance);
              //console.log(allDateStatus);

              return (
                <>
                  {allDateStatus &&
                    allDateStatus.map((date) => {
                      return (
                        <tbody key={key}>
                          <td>{date.date}</td>
                          <td>{val.name}</td>
                          <td>{date.status}</td>
                        </tbody>
                      );
                    })}
                </>
              );
              <br />;
            })}
        </Table>
      </div>
    </div>
  );
}

export default Attendance;
