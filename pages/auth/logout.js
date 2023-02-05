import React, {useState} from "react";
import { useRouter } from "next/router";
import {deleteCookie} from "cookies-next"

const Logout = () => {
  const router = useRouter();
  useState(() => {
    setTimeout(() => {
      deleteCookie("isLogin");
      deleteCookie("profile");
      deleteCookie("token");
      router.replace("/");
    }, 1500)
  }, [])

  return (
    <div >
      <div style={{display: "flex", justifyContent: "center", marginTop: "40vh"}}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <h1 style={{display: "flex", justifyContent: "center"}}>Please wait...</h1>
    </div>
  )
}

export default Logout;