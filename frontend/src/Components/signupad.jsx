import Cookies from "js-cookie";
import React from "react";
import "../Pages/css/navi.css"
export default function Add() {
  const token = Cookies.get("login_token");
  console.log(token, "Token");
  return (
    <>
      {token ? (
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(246,0,203,1) 0%, rgba(0,212,255,1) 100%, rgba(0,234,247,1) 100%)",
            height: "85px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Player
        </div>
      ) : (
        <div style={{ padding: "5px", backgroundColor: "#2C2C2C" }}>
          <div
            style={{
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(246,0,203,1) 0%, rgba(0,212,255,1) 100%, rgba(0,234,247,1) 100%)",
              height: "85px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ fontWeight: "bolder" }}>PREVIEW OF SPOTIFY</h3>
              <h5 className="description">
                Sign up for unlimited songs and podcasts with occasional ads. no
                credit card needed
              </h5>
            </div>

            <button
              style={{
                width: "200px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "30px",
                marginLeft: "10px",
                marginRight: "25px",
                height: "50px",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Sign Up free
            </button>
          </div>
        </div>
      )}
    </>
  );
}
