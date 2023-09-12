import React from "react";
import "../Style/doctor.css";

import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProfileDoc = () => {
  const docName = JSON.parse(localStorage.getItem("key"))||"Liam Wilson"
  console.log(docName)
  const [data, setData] = useState([]);
  const [clientdata, setClientData] = useState([]);

  useEffect(() => {
    fetch("https://pet-veterinary.onrender.com/doctor/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch("https://pet-veterinary.onrender.com/users/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        setClientData(res.msg);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>hello</p>
      <p>jkf</p>
      <p>jkf</p>
      <Navbar/>
      <div id="profile-container">
        <div id="docProfile">
          <h2 className="title">Doctor's Profile</h2>
          {data.map((e) => {
            if (e.name === docName) {
              return (
                <div key={e._id}>
                  <div className="doc-card">
                    <img id="avatar" src={e.img} alt="error" />
                    <h2 className="title">
                      {e.name} ({e.specialist})
                    </h2>
                    <p>Experience:-{e.experience}</p>
                    <p>{e.bio}</p>
                    <p>Email:- {e.email}</p>
                    <p>Rating:- {e.rating}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div id="client-card">
          <h2 className="title">Clients Booking Details</h2>
          {clientdata.map((e) => {
            if (e.DoctorId === docName) {
              return (
                <div id="client-details" key={e._id}>
                  <h2 className="title">Client Name:- {e.client_name}</h2>
                  <h4>Contact No:- {e.contact}</h4>
                  <h4>Address:- {e.address}</h4>
                  <h4>Email:- {e.email}</h4>
                  <h4>Pet :- {e.pet_category}</h4>
                  <h4>Disease :- {e.disease_suffering}</h4>
                  <h4 className="title">
                    Appointment Data:-{" "}
                    {moment(e.veterinary_appointment).format("DD-MM-YYYY")}
                  </h4>
                  <button
                    id="removeBtn"
                    onClick={() => {                      
                      fetch(
                        `https://pet-veterinary.onrender.com/users/delete/${e._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            "Content-type": "application/json",
                          },
                        }
                        )
                        .then((req) => req.json())
                        .then(() => {
                          alert("Delete Successfully");
                          window.location.reload();
                        });
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProfileDoc;
