import React, { useState } from "react";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import store from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import * as profileReducer from "@/stores/reducer/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useState(() => {
    setTimeout(() => {
      dispatch(profileReducer.setProfile(null));
      dispatch(profileReducer.setToken(null));
      dispatch(profileReducer.setIsLogin(false));

      deleteCookie("profile");
      deleteCookie("token");
      router.replace("/");
    }, 1500);
  }, []);

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Please wait...
      </h1>
    </div>
  );
};

export default Logout;
