import React, {useState} from "react";
import { useRouter } from "next/router";
import {deleteCookie} from "cookies-next"
import store from "@/store";
import { useDispatch, useSelector } from "react-redux";
import * as auth from '@/store/reducer/auth'

const Logout = () => {
  // const dispatch = useDispatch()
  const router = useRouter();
  // const store = useSelector((state) => state)
  useState(() => {
    setTimeout(() => {
      deleteCookie("isLogin");
      deleteCookie("profile");
      deleteCookie("token");
      // dispatch(auth.removeProfile(null));
      // dispatch(auth.removeToken(null));
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